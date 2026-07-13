# Harmonía - Servidor Local PWA
# Ejecuta este script para iniciar un servidor web local

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$port = 8082
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
}

try {
    $listener.Start()
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Red
    Write-Host "  Harmonía - Servidor Local" -ForegroundColor White
    Write-Host "=============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "  La aplicación está disponible en:" -ForegroundColor Gray
    Write-Host "  http://localhost:$port" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Para instalarla como app:" -ForegroundColor Gray
    Write-Host "  - Chrome/Edge: icono de instalar en la barra de direcciones" -ForegroundColor Yellow
    Write-Host "  - Móvil: menú del navegador > 'Añadir a pantalla de inicio'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Pulsa Ctrl+C para detener el servidor" -ForegroundColor DarkGray
    Write-Host "=============================================" -ForegroundColor Red
    Write-Host ""

    # Abrir automáticamente en el navegador
    Start-Process "http://localhost:$port"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/log-error") {
            $reader = New-Object System.IO.StreamReader($request.InputStream)
            $body = $reader.ReadToEnd()
            [System.IO.File]::AppendAllText((Join-Path $root "browser_errors.txt"), "$body`r`n")
            $response.StatusCode = 200
            $msg = [System.Text.Encoding]::UTF8.GetBytes("OK")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.OutputStream.Close()
            continue
        }
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        }

        $filePath = Join-Path $root ($urlPath.TrimStart("/").Replace("/", "\"))

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }

            $response.ContentType = $contentType
            $response.StatusCode = 200

            # Headers para PWA y caché
            $response.Headers.Add("Cache-Control", "no-cache")
            $response.Headers.Add("Access-Control-Allow-Origin", "*")

            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $fileBytes.Length
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - No encontrado")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        $response.OutputStream.Close()
        
        $status = $response.StatusCode
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] $status $($request.HttpMethod) $($request.Url.LocalPath)" -ForegroundColor $(if ($status -eq 200) { "DarkGray" } else { "Red" })
    }
} catch {
    if ($_.Exception.Message -match "acceso|access|denied") {
        Write-Host "Error: El puerto $port está en uso. Cierra otras aplicaciones o cambia el puerto." -ForegroundColor Red
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
    Write-Host "Servidor detenido." -ForegroundColor Yellow
}
