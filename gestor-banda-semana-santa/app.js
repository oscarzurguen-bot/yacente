/**
 * Yacente - Gestor de asistencia
 * Lógica de la aplicación y manejo de estado.
 * Versión 1.2.0: Con soporte para agrupación por voces en Plantilla y orden oficial definitivo.
 */

// ==========================================================================
// CONSTANTES Y DATOS DE PRUEBA (DEMO)
// ==========================================================================
const SECCIONES_ORDEN = [
    "Dirección",
    "Trompetas 1ª",
    "Fliscornos",
    "Trompetas 2ª",
    "Trompetas 3ª",
    "Trompas",
    "Trombones",
    "Bombardinos",
    "Tubas",
    "Cornetas",
    "Tambores",
    "Bombos",
    "Platos"
];

const DEFAULT_MUSICIANS = [
    { id: "mus-1", name: "Carlos Ruiz Serna", instrument: "Dirección", role: "Director Musical", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true, badgeRaicesProfundas: true, badgeLeyendaViva: true },
    { id: "mus-2", name: "Daniel Benítez Caro", instrument: "Trompetas 1ª", role: "Voz Principal", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true },
    { id: "mus-3", name: "Francisco Beltrán Gil", instrument: "Trompetas 1ª", role: "Voz Fila", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-4", name: "Patricia Ramos Luna", instrument: "Fliscornos", role: "Fliscorno 1º", badgeSangreNueva: true },
    { id: "mus-5", name: "Antonio Guerrero Soler", instrument: "Fliscornos", role: "Fliscorno 2º", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true, badgeRaicesProfundas: true },
    { id: "mus-6", name: "Alejandro Salgado", instrument: "Trompetas 2ª", role: "Voz 2ª Principal", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-7", name: "Jorge Delgado Martín", instrument: "Trompetas 2ª", role: "Voz Fila", badgeSangreNueva: true },
    { id: "mus-8", name: "María del Carmen Marín", instrument: "Trompetas 3ª", role: "Voz 3ª Principal", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true },
    { id: "mus-9", name: "Adrián López Torres", instrument: "Trompetas 3ª", role: "Voz Fila", badgeSangreNueva: true },
    { id: "mus-10", name: "Elena Martínez Reyes", instrument: "Trompas", role: "Trompa 1ª", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-11", name: "Jose Manuel Castro", instrument: "Trombones", role: "Trombón 1º", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true },
    { id: "mus-12", name: "Rafael Romero Nieto", instrument: "Trombones", role: "Trombón 2º", badgeSangreNueva: true },
    { id: "mus-13", name: "Miguel Ángel Ruiz", instrument: "Bombardinos", role: "Bombardino", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-14", name: "David Ortiz Giráldez", instrument: "Tubas", role: "Tuba Principal", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true },
    { id: "mus-15", name: "Juan Pedro Gil Rivas", instrument: "Tubas", role: "Tuba", badgeSangreNueva: true },
    { id: "mus-16", name: "Francisco Javier Torres", instrument: "Cornetas", role: "Voz Principal", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true, badgeRaicesProfundas: true },
    { id: "mus-17", name: "Manuel Jesús Ruíz", instrument: "Cornetas", role: "Primera Voz", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-18", name: "Antonio Domínguez Cara", instrument: "Cornetas", role: "Segunda Voz", badgeSangreNueva: true },
    { id: "mus-19", name: "Manuel Bernal Ortiz", instrument: "Tambores", role: "Líder Percusión", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true, badgeRaicesProfundas: true },
    { id: "mus-20", name: "Javier Delgado Pozo", instrument: "Tambores", role: "Tambor", badgeSangreNueva: true },
    { id: "mus-21", name: "Rocío Muñoz Soto", instrument: "Tambores", role: "Tambor", badgeSangreNueva: true },
    { id: "mus-22", name: "Jesús Guerra Moreno", instrument: "Bombos", role: "Bombo", badgeSangreNueva: true, badgeFielAtril: true },
    { id: "mus-23", name: "Sebastián Moreno Sanz", instrument: "Platos", role: "Platos", badgeSangreNueva: true, badgeFielAtril: true, badgeCorazonYacente: true, badgeRaicesProfundas: true, badgeLeyendaViva: true }
];

const getDemoAttendanceHistory = () => {
    const history = {};
    const dates = [
        "2026-06-15", "2026-06-18", "2026-06-22", "2026-06-25", "2026-06-29"
    ];
    const motivos = ["Trabajo", "Salud", "Estudios", "Viaje"];
    
    dates.forEach((date) => {
        history[date] = {};
        DEFAULT_MUSICIANS.forEach(m => {
            if (m.instrument === "Dirección") {
                history[date][m.id] = { status: "present", justified: false, reason: "" };
                return;
            }
            
            const rand = Math.random();
            let status = "present";
            let justified = false;
            let reason = "";
            
            let presenceThreshold = 0.84;
            if (m.id === "mus-8" || m.id === "mus-15") {
                presenceThreshold = 0.50; // Músicos con más faltas para disparar alertas
            }
            
            if (rand > presenceThreshold) {
                status = "absent";
                justified = Math.random() > 0.4;
                if (justified) {
                    reason = motivos[Math.floor(Math.random() * motivos.length)];
                } else {
                    reason = Math.random() > 0.6 ? "Sin aviso" : "";
                }
            }
            
            history[date][m.id] = { status, justified, reason };
        });
    });
    
    return history;
};

const getDemoSessionTypes = () => {
    const types = {};
    const dates = [
        "2026-06-15", "2026-06-18", "2026-06-22", "2026-06-25", "2026-06-29"
    ];
    dates.forEach(date => {
        types[date] = { type: "ensayo", name: "" };
    });
    return types;
};

// ==========================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ==========================================================================
let state = {
    musicians: [],
    attendance: {},
    sessionTypes: {},
    currentDate: "",
    marchas: [],
    playedMarchas: {},
    marchasViewMode: "list",
    calendarGoals: {},
    weeklyGoals: {},
    formacionConcierto: [],
    formacionDesfile: [],
    directorConcierto: null,
    currentPreavisoDate: "",
    compCalendarYear: undefined,
    compCalendarMonth: undefined,
    statsOvMode: "years",
    statsOvSelectedSeason: (() => {
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth() + 1;
        return m >= 9 ? `${y}-${y+1}` : `${y-1}-${y}`;
    })()
};

let preavisoSelectedStatus = null;

const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * 21; // ~131.95

function getAuthToken() {
    return sessionStorage.getItem("yacente_authenticated") === "true" || localStorage.getItem("yacente_authenticated") === "true";
}
function getAuthRole() {
    return sessionStorage.getItem("yacente_role") || localStorage.getItem("yacente_role");
}
function getAuthMusicianId() {
    return sessionStorage.getItem("yacente_musician_id") || localStorage.getItem("yacente_musician_id");
}

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
    setupSimulator();
});

function parseConciertoFormacion(stored) {
    if (!stored) return Array.from({ length: 4 }, () => []);
    let parsed = null;
    if (typeof stored === "string") {
        try {
            parsed = JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing storedConcierto", e);
            return Array.from({ length: 4 }, () => []);
        }
    } else {
        parsed = stored;
    }
    if (parsed && !Array.isArray(parsed) && typeof parsed === "object") {
        const arr = Array.from({ length: 4 }, () => []);
        let count = 0;
        Object.entries(parsed).forEach(([seatId, musicianId]) => {
            if (musicianId) {
                const targetRow = count % 4;
                arr[targetRow].push(musicianId);
                count++;
            }
        });
        return arr;
    } else if (Array.isArray(parsed)) {
        if (parsed.length === 0 || !Array.isArray(parsed[0])) {
            return Array.from({ length: 4 }, () => []);
        }
        return parsed;
    }
    return Array.from({ length: 4 }, () => []);
}

function parseDesfileFormacion(stored) {
    if (!stored) return Array.from({ length: 8 }, () => []);
    let parsed = null;
    if (typeof stored === "string") {
        try {
            parsed = JSON.parse(stored);
        } catch (e) {
            console.error("Error parsing storedDesfile", e);
            return Array.from({ length: 8 }, () => []);
        }
    } else {
        parsed = stored;
    }
    if (Array.isArray(parsed)) {
        if (parsed.length === 0 || !Array.isArray(parsed[0])) {
            return Array.from({ length: 8 }, () => []);
        }
        return parsed;
    }
    return Array.from({ length: 8 }, () => []);
}

function initApp() {
    console.log("Yacente v8 inicializada correctamente");
    const storedMusicians = localStorage.getItem("harmonia_musicians");
    const storedAttendance = localStorage.getItem("harmonia_attendance");
    const storedTheme = localStorage.getItem("harmonia_theme");
    const storedSessionTypes = localStorage.getItem("harmonia_session_types");
    const storedMarchas = localStorage.getItem("harmonia_marchas");
    const storedPlayedMarchas = localStorage.getItem("harmonia_played_marchas");

    const storedCalendarGoals = localStorage.getItem("harmonia_calendar_goals");
    state.calendarGoals = storedCalendarGoals ? JSON.parse(storedCalendarGoals) : {};

    const storedWeeklyGoals = localStorage.getItem("harmonia_weekly_goals");
    state.weeklyGoals = storedWeeklyGoals ? JSON.parse(storedWeeklyGoals) : {};

    // Cargar formaciones del simulador
    const storedConcierto = localStorage.getItem("yacente_formacion_concierto");
    const storedDesfile = localStorage.getItem("yacente_formacion_desfile");
    state.formacionConcierto = parseConciertoFormacion(storedConcierto);
    state.formacionDesfile = parseDesfileFormacion(storedDesfile);
    state.directorConcierto = localStorage.getItem("yacente_director_concierto") || null;

    // Cargar credenciales de Firebase
    const storedFbConfig = localStorage.getItem("yacente_firebase_config");
    const storedFbHash = localStorage.getItem("yacente_firebase_hash");
    state.firebaseConfig = storedFbConfig ? JSON.parse(storedFbConfig) : null;
    state.firebasePasswordHash = storedFbHash || "";

    if (storedMusicians && storedAttendance) {
        state.musicians = JSON.parse(storedMusicians);
        state.attendance = JSON.parse(storedAttendance);
        state.sessionTypes = storedSessionTypes ? JSON.parse(storedSessionTypes) : {};
        state.marchas = storedMarchas ? JSON.parse(storedMarchas) : [];
        state.playedMarchas = storedPlayedMarchas ? JSON.parse(storedPlayedMarchas) : {};
        // Migrar datos antiguos: etiquetar sesiones sin tipo como ensayos
        Object.keys(state.attendance).forEach(date => {
            if (!state.sessionTypes[date]) {
                state.sessionTypes[date] = { type: "ensayo", name: "" };
            }
        });
    } else {
        state.musicians = [...DEFAULT_MUSICIANS];
        state.attendance = getDemoAttendanceHistory();
        state.sessionTypes = getDemoSessionTypes();
        state.marchas = getDemoRepertoire();
        state.playedMarchas = {};
        saveStateToLocalStorage();
    }

    // Aplicar tema (Modo oscuro activo por defecto)
    const isDark = storedTheme === null ? true : storedTheme === "dark";
    document.getElementById("theme-switch").checked = isDark;
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");

    state.mobileSimplified = true;
    document.body.classList.add("mobile-simplified-active");

    // Establecer fecha inicial (Hoy)
    const today = new Date().toISOString().split("T")[0];
    state.currentDate = today;
    document.getElementById("attendance-date").value = today;

    // Inicializar asistencia
    initializeAttendanceForDate(today);

    // Renderizar interfaz inicial
    const isAuthenticated = getAuthToken();
    const activeRole = getAuthRole();
    if (isAuthenticated) {
        hideLockScreen();
        if (activeRole === "component") {
            document.body.classList.add("component-portal");
            const mobNav = document.getElementById("component-mobile-nav");
            if (mobNav) mobNav.classList.remove("hidden");
            renderActiveSection("section-componente-ficha");
            
            // Auto-request notifications on load
            if ("Notification" in window && Notification.permission === "default") {
                Notification.requestPermission().then(() => {
                    renderComponentFicha();
                });
            }
        } else {
            document.body.classList.remove("component-portal");
            renderActiveSection("section-pasar-lista");
        }
    } else {
        showLockScreen();
    }
    populateLoginMusicians();
    renderAttendance();
    renderPlantillaTable();
    renderEnsayosList();
    renderActuacionesList();
    renderStatistics();
    renderMarchasList();
    renderRehearsalMarchasWidget();
    
    // Conectar a Firebase si está configurado
    initFirebase();
}

function initializeAttendanceForDate(date, convocatedVoices = []) {
    if (!state.attendance[date]) {
        state.attendance[date] = {};
    }
    
    const isSpecialRehearsal = convocatedVoices && convocatedVoices.length > 0;
    
    state.musicians.forEach(musician => {
        // Si el ensayo es por voces y el músico no está convocado, omitimos
        if (isSpecialRehearsal && !convocatedVoices.includes(musician.instrument)) {
            return;
        }
        if (!state.attendance[date][musician.id]) {
            state.attendance[date][musician.id] = {
                status: "absent",
                justified: false,
                reason: ""
            };
        }
    });
}

function updateSessionBadge() {
    const badge = document.getElementById("attendance-session-badge");
    if (!badge) return;
    
    // Actualizar el selector de sesiones en la cabecera
    updateAttendanceSessionSelector();
    
    const date = state.currentDate;
    const sessionInfo = state.sessionTypes[date];
    
    if (!sessionInfo) {
        badge.innerText = "🎺 Ensayo General (Autocreado)";
        badge.style.borderColor = "rgba(212, 175, 55, 0.35)";
        badge.style.backgroundColor = "rgba(212, 175, 55, 0.05)";
        badge.style.color = "var(--color-gold)";
        return;
    }
    
    if (sessionInfo.type === "actuacion") {
        badge.innerText = `⭐ Actuación: ${sessionInfo.name || 'Sin nombre'}`;
        badge.style.borderColor = "rgba(46, 204, 113, 0.4)";
        badge.style.backgroundColor = "rgba(46, 204, 113, 0.05)";
        badge.style.color = "var(--color-present)";
    } else if (sessionInfo.type === "ensayo") {
        const sub = sessionInfo.subtype;
        let badgeText = "🎺 Ensayo General";
        let isSection = false;

        if (sub === "trompetas1") {
            badgeText = "👥 Ensayo Trompetas 1ª";
            isSection = true;
        } else if (sub === "bajos") {
            badgeText = "👥 Ensayo Bajos";
            isSection = true;
        } else if (sub === "trompetas2y3") {
            badgeText = "👥 Ensayo Trompetas 2ª y 3ª";
            isSection = true;
        } else if (sub === "cornetas") {
            badgeText = "👥 Ensayo Cornetas";
            isSection = true;
        } else if (sub === "percusion") {
            badgeText = "👥 Ensayo Percusión";
            isSection = true;
        } else if (sub === "voces") {
            const count = sessionInfo.convocatedVoices ? sessionInfo.convocatedVoices.length : 0;
            badgeText = `👥 Ensayo Voces (${count})`;
            isSection = true;
        } else if (sub === "primeras") {
            badgeText = "👥 Ensayo Primeras";
            isSection = true;
        }

        badge.innerText = badgeText;

        if (isSection) {
            badge.style.borderColor = "rgba(155, 89, 182, 0.4)";
            badge.style.backgroundColor = "rgba(155, 89, 182, 0.05)";
            badge.style.color = "#9b59b6";
        } else {
            badge.style.borderColor = "rgba(212, 175, 55, 0.4)";
            badge.style.backgroundColor = "rgba(212, 175, 55, 0.05)";
            badge.style.color = "var(--color-gold)";
        }
    }
}

function updateAttendanceSessionSelector() {
    const select = document.getElementById("attendance-session-select");
    if (!select) return;
    
    // Obtener la fecha base sin sufijos
    const rawDate = state.currentDate.split("_")[0];
    
    // Encontrar todas las sesiones creadas para esta fecha
    const sessionKeys = Object.keys(state.sessionTypes).filter(key => key.startsWith(rawDate));
    
    if (sessionKeys.length <= 1) {
        select.classList.add("hidden");
        return;
    }
    
    select.innerHTML = "";
    sessionKeys.forEach(key => {
        const sessionInfo = state.sessionTypes[key];
        const option = document.createElement("option");
        option.value = key;
        
        let label = "General";
        if (sessionInfo) {
            if (sessionInfo.type === "actuacion") {
                label = `⭐ Act: ${sessionInfo.name || 'Sin nombre'}`;
            } else if (sessionInfo.type === "ensayo") {
                const sub = sessionInfo.subtype;
                if (sub === "trompetas1") label = "👥 Trompetas 1ª";
                else if (sub === "bajos") label = "👥 Bajos";
                else if (sub === "trompetas2y3") label = "👥 Trompetas 2ª y 3ª";
                else if (sub === "cornetas") label = "👥 Cornetas";
                else if (sub === "percusion") label = "👥 Percusión";
                else if (sub === "voces") label = `👥 Voces (${sessionInfo.convocatedVoices.length})`;
                else if (sub === "primeras") label = "👥 Primeras";
            }
        }
        
        option.innerText = label;
        if (key === state.currentDate) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    
    select.classList.remove("hidden");
}

function isSectionRehearsal(sessionInfo) {
    if (!sessionInfo || sessionInfo.type !== "ensayo") return false;
    const sub = sessionInfo.subtype;
    return sub === "voces" || sub === "trompetas1" || sub === "bajos" || sub === "trompetas2y3" || sub === "cornetas" || sub === "percusion" || sub === "primeras";
}

function saveStateToLocalStorage() {
    localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
    localStorage.setItem("harmonia_attendance", JSON.stringify(state.attendance));
    localStorage.setItem("harmonia_session_types", JSON.stringify(state.sessionTypes));
    localStorage.setItem("harmonia_marchas", JSON.stringify(state.marchas || []));
    localStorage.setItem("harmonia_played_marchas", JSON.stringify(state.playedMarchas || {}));
    localStorage.setItem("harmonia_calendar_goals", JSON.stringify(state.calendarGoals || {}));
    localStorage.setItem("harmonia_weekly_goals", JSON.stringify(state.weeklyGoals || {}));
    
    if (state.firebaseConfig) {
        localStorage.setItem("yacente_firebase_config", JSON.stringify(state.firebaseConfig));
        localStorage.setItem("yacente_firebase_hash", state.firebasePasswordHash);
    } else {
        localStorage.removeItem("yacente_firebase_config");
        localStorage.removeItem("yacente_firebase_hash");
    }
}

// Hashing simple para la contraseña de directiva
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Comprobación de estado de la nube
function isCloudActive() {
    return state.firebaseConfig !== null;
}

let unsubMusicians = null;
let unsubAttendance = null;
let unsubSessionTypes = null;
let unsubMarchas = null;
let unsubPlayedMarchas = null;
let unsubWeeklyGoals = null;
let unsubMusicianMarchaStatuses = null;
let unsubFormacionConcierto = null;
let unsubFormacionDesfile = null;

// Inicializa Firebase
function initFirebase() {
    if (!isCloudActive()) {
        updateFirebaseStatusUI(false);
        if (!getAuthToken()) {
            showLockScreen();
        }
        return;
    }
    try {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(state.firebaseConfig);
            // Habilitar persistencia offline
            firebase.firestore().enablePersistence().catch(err => {
                console.warn("Firebase persistence error:", err.code);
            });
        }
        
        // Guardar configuración en la caché para el Service Worker (FCM)
        if (window.caches && state.firebaseConfig) {
            caches.open('fcm-config').then(cache => {
                cache.put('/config.json', new Response(JSON.stringify(state.firebaseConfig)));
            }).catch(e => console.error("Error cacheando Firebase config:", e));
        }
        
        updateFirebaseStatusUI(true);
        
        // Si no estamos autenticados en esta sesión, bloquear pantalla
        if (!getAuthToken()) {
            showLockScreen();
            
            // Jalar músicos en segundo plano para poblar el dropdown de login con la base de datos real
            const db = firebase.firestore();
            db.collection("musicians").get()
                .then(snapshot => {
                    const musicians = [];
                    snapshot.forEach(doc => {
                        musicians.push(doc.data());
                    });
                    if (musicians.length > 0) {
                        state.musicians = musicians;
                        localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
                        populateLoginMusicians();
                    }
                })
                .catch(err => {
                    console.error("Error al jalar músicos para el login:", err);
                });
        } else {
            startCloudSync();
        }
    } catch (e) {
        console.error("Error al iniciar Firebase:", e);
        showToast("Error al conectar con la base de datos de Firebase", "error");
        updateFirebaseStatusUI(false);
    }
}

// Actualiza los badges de estado online/offline
function updateFirebaseStatusUI(isConnected) {
    const dot = document.getElementById("firebase-status-dot");
    const text = document.getElementById("firebase-status-text");
    const buttonsContainer = document.getElementById("firebase-settings-buttons");
    
    if (!dot || !text || !buttonsContainer) return;
    
    if (isConnected) {
        dot.style.backgroundColor = "var(--color-present)"; // verde
        text.innerText = "Conectado a la Nube (Google Firebase)";
        text.style.color = "var(--color-present)";
        buttonsContainer.innerHTML = `
            <button id="btn-sync-local-to-cloud" class="btn btn-secondary" style="margin-right: 8px;">
                Subir Datos Locales
            </button>
            <button id="btn-disconnect-firebase" class="btn btn-danger">
                Desconectar Nube
            </button>
        `;
        
        // Re-añadir listeners para estos botones generados dinámicamente
        document.getElementById("btn-sync-local-to-cloud").addEventListener("click", syncLocalToCloud);
        document.getElementById("btn-disconnect-firebase").addEventListener("click", disconnectFirebase);
    } else {
        dot.style.backgroundColor = "var(--color-absent)"; // rojo
        text.innerText = "Nube Desactivada (Modo Local)";
        text.style.color = "var(--text-muted)";
        buttonsContainer.innerHTML = `
            <button id="btn-configure-firebase" class="btn btn-primary">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
                Activar Nube
            </button>
        `;
        document.getElementById("btn-configure-firebase").addEventListener("click", () => {
            document.getElementById("modal-firebase-config").classList.add("active");
        });
    }
}

// Muestra la pantalla de bloqueo
function showLockScreen() {
    const lock = document.getElementById("lock-screen");
    if (lock) {
        lock.classList.remove("hidden");
        document.getElementById("lock-password-input").value = "";
        document.getElementById("lock-error-msg").classList.add("hidden");
    }
}

// Oculta la pantalla de bloqueo
function hideLockScreen() {
    const lock = document.getElementById("lock-screen");
    if (lock) lock.classList.add("hidden");
}

// Escucha en tiempo real de Firestore
function startCloudSync() {
    if (!isCloudActive()) return;
    const db = firebase.firestore();
    
    // Detener escuchas previas si existen
    stopCloudSync();
    
    // Registrar token de dispositivo si es un músico
    const authRole = getAuthRole();
    const musicianId = getAuthMusicianId();
    if (authRole === "component" && musicianId) {
        registerDeviceToken(musicianId);
    }
    
    // Escucha de músicos
    unsubMusicians = db.collection("musicians").onSnapshot(snapshot => {
        const musicians = [];
        snapshot.forEach(doc => {
            musicians.push(doc.data());
        });
        // Si hay datos en la nube, sobreescribimos state
        if (snapshot.size > 0) {
            state.musicians = musicians;
            localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
            renderPlantillaTable();
            populateLoginMusicians();
            if (document.getElementById("section-pasar-lista").classList.contains("active")) {
                renderAttendance();
            }
            if (document.getElementById("section-estadisticas").classList.contains("active")) {
                renderStatistics();
            }
            if (document.getElementById("section-componente-ficha").classList.contains("active")) {
                renderComponentFicha();
            }
            if (document.getElementById("section-componente-historial").classList.contains("active")) {
                renderComponentHistorial();
            }
        }
    }, err => {
        console.error("Error sync músicos:", err);
    });

    // Escucha de asistencias
    unsubAttendance = db.collection("attendance").onSnapshot(snapshot => {
        state.attendance = {}; // Limpiar caché local para evitar datos huérfanos/demo
        snapshot.forEach(doc => {
            state.attendance[doc.id] = doc.data();
        });
        localStorage.setItem("harmonia_attendance", JSON.stringify(state.attendance));
        if (document.getElementById("section-pasar-lista").classList.contains("active")) {
            renderAttendance();
        }
        if (document.getElementById("section-ensayos").classList.contains("active")) {
            renderEnsayosList();
        }
        if (document.getElementById("section-actuaciones").classList.contains("active")) {
            renderActuacionesList();
        }
        if (document.getElementById("section-estadisticas").classList.contains("active")) {
            renderStatistics();
        }
        if (document.getElementById("section-componente-ficha").classList.contains("active")) {
            renderComponentFicha();
        }
        if (document.getElementById("section-componente-historial").classList.contains("active")) {
            renderComponentHistorial();
        }
    }, err => {
        console.error("Error sync asistencias:", err);
    });

    // Escucha de metadatos de sesión
    let isInitialSessionTypesLoad = true;
    unsubSessionTypes = db.collection("sessionTypes").onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        
        state.sessionTypes = {}; // Limpiar caché local para evitar datos huérfanos/demo
        snapshot.forEach(doc => {
            state.sessionTypes[doc.id] = doc.data();
        });
        localStorage.setItem("harmonia_session_types", JSON.stringify(state.sessionTypes));
        
        // Dispatch notifications if this is not the initial load and role is component
        if (!isInitialSessionTypesLoad && getAuthRole() === "component") {
            const musicianId = getAuthMusicianId();
            if (musicianId) {
                changes.forEach(change => {
                    if (change.type === "added") {
                        const sessionData = change.doc.data();
                        const sessionDate = change.doc.id;
                        
                        if (isMusicianConvocated(musicianId, sessionData)) {
                            const title = sessionData.type === "actuacion" ? "Nueva Actuación Creada" : "Nuevo Ensayo Creado";
                            const formattedDate = formatDateShortSpanish(sessionDate);
                            let body = "";
                            if (sessionData.type === "ensayo") {
                                const subtypeText = getRehearsalSubtypeText(sessionData.subtype);
                                const locationVal = sessionData.location || "Parking";
                                body = `${subtypeText} - ${formattedDate} (${locationVal})`;
                            } else {
                                body = `${sessionData.name || "Actuación"} - ${formattedDate}`;
                            }
                            
                            // Save to local storage notifications list
                            const notifId = `${sessionDate}-${sessionData.type}`;
                            const notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
                            if (!notifs.some(n => n.id === notifId)) {
                                notifs.unshift({
                                    id: notifId,
                                    title: title,
                                    body: body,
                                    date: new Date().toISOString(),
                                    seen: false
                                });
                                localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));
                                updateNotificationsBadge();
                                sendBrowserNotification(title, body);
                            }
                        }
                    }
                });
            }
        }
        
        isInitialSessionTypesLoad = false;
        
        if (document.getElementById("section-ensayos").classList.contains("active")) {
            renderEnsayosList();
        }
        if (document.getElementById("section-actuaciones").classList.contains("active")) {
            renderActuacionesList();
        }
        if (document.getElementById("section-pasar-lista").classList.contains("active")) {
            renderAttendance();
        }
        if (document.getElementById("section-estadisticas").classList.contains("active")) {
            renderStatistics();
        }
        if (document.getElementById("section-componente-ficha").classList.contains("active")) {
            renderComponentFicha();
        }
        if (document.getElementById("section-componente-historial").classList.contains("active")) {
            renderComponentHistorial();
        }
    }, err => {
        console.error("Error sync tipos de sesión:", err);
    });

    // Escucha de marchas
    unsubMarchas = db.collection("marchas").onSnapshot(snapshot => {
        const marchas = [];
        snapshot.forEach(doc => {
            marchas.push(doc.data());
        });
        state.marchas = marchas;
        localStorage.setItem("harmonia_marchas", JSON.stringify(state.marchas));
        if (document.getElementById("section-marchas").classList.contains("active")) {
            renderMarchasList();
        }
        renderRehearsalMarchasWidget();
    }, err => {
        console.error("Error sync marchas:", err);
    });

    // Escucha de marchas ensayadas/tocadas por fecha
    unsubPlayedMarchas = db.collection("playedMarchas").onSnapshot(snapshot => {
        state.playedMarchas = {}; // Limpiar caché local
        snapshot.forEach(doc => {
            state.playedMarchas[doc.id] = doc.data().marchas || [];
        });
        localStorage.setItem("harmonia_played_marchas", JSON.stringify(state.playedMarchas));
        renderRehearsalMarchasWidget();
        if (document.getElementById("section-marchas").classList.contains("active")) {
            renderMarchasList();
        }
        if (document.getElementById("section-estadisticas").classList.contains("active")) {
            renderStatistics();
        }
    }, err => {
        console.error("Error sync marchas ensayadas:", err);
    });

    // Escucha de objetivos semanales por año
    unsubWeeklyGoals = db.collection("weeklyGoals").onSnapshot(snapshot => {
        state.weeklyGoals = {}; // Limpiar caché local
        snapshot.forEach(doc => {
            state.weeklyGoals[doc.id] = doc.data().goals || [];
        });
        localStorage.setItem("harmonia_weekly_goals", JSON.stringify(state.weeklyGoals));
        if (document.getElementById("section-calendario").classList.contains("active")) {
            renderWeeklyGoalsList();
        }
    }, err => {
        console.error("Error sync objetivos semanales:", err);
    });

    // Escucha de estados de marchas de músicos
    unsubMusicianMarchaStatuses = db.collection("musician_marcha_statuses").onSnapshot(snapshot => {
        state.musicianMarchaStatuses = {};
        snapshot.forEach(doc => {
            state.musicianMarchaStatuses[doc.id] = doc.data().status;
        });
        localStorage.setItem("harmonia_musician_marcha_statuses", JSON.stringify(state.musicianMarchaStatuses));
        if (document.getElementById("section-componente-repertorio").classList.contains("active")) {
            renderComponentRepertorio();
        }
        if (document.getElementById("section-componente-ficha").classList.contains("active")) {
            renderComponentFicha();
        }
    }, err => {
        console.error("Error sync estados marchas músicos:", err);
    });

    // Escucha de formación de concierto
    unsubFormacionConcierto = db.collection("config").doc("formacion_concierto").onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            let parsedMap = null;
            if (data.mapStr) {
                try {
                    parsedMap = JSON.parse(data.mapStr);
                } catch(e) {
                    console.error("Error parsing concert mapStr:", e);
                }
            } else if (data.map) {
                parsedMap = data.map;
            }
            if (parsedMap) {
                state.formacionConcierto = parsedMap;
                localStorage.setItem("yacente_formacion_concierto", JSON.stringify(parsedMap));
            }
            state.directorConcierto = data.director || null;
            if (state.directorConcierto) {
                localStorage.setItem("yacente_director_concierto", state.directorConcierto);
            } else {
                localStorage.removeItem("yacente_director_concierto");
            }
            // Repintar simulador si está abierto
            const modal = document.getElementById("modal-simulator");
            if (modal && modal.classList.contains("active") && simActiveMode === "concierto") {
                renderSimulatorSeats();
                renderSimulatorRoster();
                updateSimulatorOccupancy();
            }
        }
    }, err => {
        console.error("Error sync formación concierto:", err);
    });

    // Escucha de formación de desfile
    unsubFormacionDesfile = db.collection("config").doc("formacion_desfile").onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            let parsedMap = null;
            if (data.mapStr) {
                try {
                    parsedMap = JSON.parse(data.mapStr);
                } catch(e) {
                    console.error("Error parsing parade mapStr:", e);
                }
            } else if (data.map) {
                parsedMap = data.map;
            }
            if (parsedMap) {
                state.formacionDesfile = parsedMap;
                localStorage.setItem("yacente_formacion_desfile", JSON.stringify(parsedMap));
            }
            // Repintar simulador si está abierto
            const modal = document.getElementById("modal-simulator");
            if (modal && modal.classList.contains("active") && simActiveMode === "desfile") {
                renderSimulatorSeats();
                renderSimulatorRoster();
                updateSimulatorOccupancy();
            }
        }
    }, err => {
        console.error("Error sync formación desfile:", err);
    });
}

// Detiene escuchas en tiempo real
function stopCloudSync() {
    if (unsubMusicians) { unsubMusicians(); unsubMusicians = null; }
    if (unsubAttendance) { unsubAttendance(); unsubAttendance = null; }
    if (unsubSessionTypes) { unsubSessionTypes(); unsubSessionTypes = null; }
    if (unsubMarchas) { unsubMarchas(); unsubMarchas = null; }
    if (unsubPlayedMarchas) { unsubPlayedMarchas(); unsubPlayedMarchas = null; }
    if (unsubWeeklyGoals) { unsubWeeklyGoals(); unsubWeeklyGoals = null; }
    if (unsubMusicianMarchaStatuses) { unsubMusicianMarchaStatuses(); unsubMusicianMarchaStatuses = null; }
    if (unsubFormacionConcierto) { unsubFormacionConcierto(); unsubFormacionConcierto = null; }
    if (unsubFormacionDesfile) { unsubFormacionDesfile(); unsubFormacionDesfile = null; }
}

// Función para subir los datos locales a la nube
function syncLocalToCloud() {
    if (!isCloudActive()) return;
    if (!confirm("Esto subirá todos tus datos locales de músicos, historial de asistencia y repertorio de marchas a la nube de Firebase, fusionándolos o sobreescribiendo los del servidor. ¿Deseas continuar?")) {
        return;
    }
    
    const db = firebase.firestore();
    const batch = db.batch();
    
    // Subir músicos
    state.musicians.forEach(musician => {
        const ref = db.collection("musicians").doc(musician.id);
        batch.set(ref, musician);
    });
    
    // Subir asistencia
    Object.keys(state.attendance).forEach(date => {
        const ref = db.collection("attendance").doc(date);
        batch.set(ref, state.attendance[date]);
    });
    
    // Subir tipos de sesión
    Object.keys(state.sessionTypes).forEach(date => {
        const ref = db.collection("sessionTypes").doc(date);
        batch.set(ref, state.sessionTypes[date]);
    });

    // Subir marchas
    state.marchas.forEach(marcha => {
        const ref = db.collection("marchas").doc(marcha.id);
        batch.set(ref, marcha);
    });
    
    // Subir marchas ensayadas
    Object.keys(state.playedMarchas).forEach(date => {
        const ref = db.collection("playedMarchas").doc(date);
        batch.set(ref, { marchas: state.playedMarchas[date] });
    });
    
    // Subir configuraciones del simulador
    const refConcierto = db.collection("config").doc("formacion_concierto");
    batch.set(refConcierto, {
        mapStr: JSON.stringify(state.formacionConcierto),
        director: state.directorConcierto || null
    });

    const refDesfile = db.collection("config").doc("formacion_desfile");
    batch.set(refDesfile, {
        mapStr: JSON.stringify(state.formacionDesfile)
    });
    
    batch.commit()
        .then(() => {
            showToast("Datos locales subidos a la nube con éxito", "success");
            startCloudSync();
        })
        .catch(err => {
            console.error("Error al subir datos locales:", err);
            showToast("Error al subir los datos a la nube", "error");
        });
}

// Desconecta Firebase y vuelve al modo Local
function disconnectFirebase() {
    if (!confirm("¿Estás seguro de que deseas desconectar la sincronización en la nube? Volverás al modo de almacenamiento local independiente.")) {
        return;
    }
    stopCloudSync();
    state.firebaseConfig = null;
    state.firebasePasswordHash = "";
    sessionStorage.removeItem("yacente_authenticated");
    sessionStorage.removeItem("yacente_role");
    sessionStorage.removeItem("yacente_musician_id");
    localStorage.removeItem("yacente_authenticated");
    localStorage.removeItem("yacente_role");
    localStorage.removeItem("yacente_musician_id");
    saveStateToLocalStorage();
    
    // Recargar estado desde LocalStorage local
    const storedMusicians = localStorage.getItem("harmonia_musicians");
    const storedAttendance = localStorage.getItem("harmonia_attendance");
    const storedSessionTypes = localStorage.getItem("harmonia_session_types");
    const storedMarchas = localStorage.getItem("harmonia_marchas");
    const storedPlayedMarchas = localStorage.getItem("harmonia_played_marchas");
    
    state.musicians = storedMusicians ? JSON.parse(storedMusicians) : [];
    state.attendance = storedAttendance ? JSON.parse(storedAttendance) : {};
    state.sessionTypes = storedSessionTypes ? JSON.parse(storedSessionTypes) : {};
    state.marchas = storedMarchas ? JSON.parse(storedMarchas) : [];
    state.playedMarchas = storedPlayedMarchas ? JSON.parse(storedPlayedMarchas) : {};
    
    // Recargar formaciones de simulador locales
    const storedConcierto = localStorage.getItem("yacente_formacion_concierto");
    const storedDesfile = localStorage.getItem("yacente_formacion_desfile");
    state.formacionDesfile = storedDesfile ? JSON.parse(storedDesfile) : [];
    if (!Array.isArray(state.formacionDesfile)) {
        state.formacionDesfile = Array.from({ length: 8 }, () => []);
    }
    state.formacionConcierto = storedConcierto ? JSON.parse(storedConcierto) : [];
    if (!Array.isArray(state.formacionConcierto)) {
        state.formacionConcierto = Array.from({ length: 4 }, () => []);
    }
    state.directorConcierto = localStorage.getItem("yacente_director_concierto") || null;
    
    updateFirebaseStatusUI(false);
    showToast("Nube desactivada. Volviendo al modo local.", "success");
    
    // Repintar pantallas
    renderPlantillaTable();
    renderAttendance();
    renderEnsayosList();
    renderActuacionesList();
    renderStatistics();
    renderMarchasList();
    renderRehearsalMarchasWidget();
}

// Escrituras condicionales (Guardado en Nube o Local)
function dbSaveMusician(musician) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("musicians").doc(musician.id).set(musician)
            .catch(err => console.error("Error al guardar músico en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbDeleteMusician(id) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("musicians").doc(id).delete()
            .catch(err => console.error("Error al borrar músico en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbSaveAttendance(date, musicianId, recordObj) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("attendance").doc(date).set({
            [musicianId]: recordObj
        }, { merge: true })
            .catch(err => console.error("Error al guardar asistencia en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbSaveSessionType(date, sessionTypeObj) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("sessionTypes").doc(date).set(sessionTypeObj)
            .catch(err => console.error("Error al guardar tipo de sesión en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbDeleteSession(date) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("attendance").doc(date).delete()
            .catch(err => console.error("Error al borrar asistencia de sesión en nube:", err));
        db.collection("sessionTypes").doc(date).delete()
            .catch(err => console.error("Error al borrar tipo de sesión en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbSaveMarcha(marcha) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("marchas").doc(marcha.id).set(marcha)
            .catch(err => console.error("Error al guardar marcha en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbDeleteMarcha(id) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("marchas").doc(id).delete()
            .catch(err => console.error("Error al borrar marcha en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbSavePlayedMarchas(date, marchasArray) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("playedMarchas").doc(date).set({ marchas: marchasArray })
            .catch(err => console.error("Error al guardar marchas tocadas en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}



// ==========================================================================
// CONTROLADORES DE EVENTOS
// ==========================================================================
function setupEventListeners() {
    // Botón de restablecimiento local en la pantalla de bloqueo
    const btnLockResetLocal = document.getElementById("btn-lock-reset-local");
    if (btnLockResetLocal) {
        btnLockResetLocal.addEventListener("click", () => {
            if (confirm("¿Deseas desactivar la conexión a la nube y volver al modo local? No perderás tus datos guardados en este dispositivo.")) {
                localStorage.removeItem("yacente_firebase_config");
                localStorage.removeItem("yacente_firebase_hash");
                sessionStorage.removeItem("yacente_authenticated");
                sessionStorage.removeItem("yacente_role");
                sessionStorage.removeItem("yacente_musician_id");
                localStorage.removeItem("yacente_authenticated");
                localStorage.removeItem("yacente_role");
                localStorage.removeItem("yacente_musician_id");
                window.location.reload();
            }
        });
    }

    // Botones de Cerrar Sesión de Administración
    const btnLogoutSidebarAdmin = document.getElementById("btn-logout-sidebar-admin");
    if (btnLogoutSidebarAdmin) {
        btnLogoutSidebarAdmin.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que deseas cerrar la sesión de administración?")) {
                logoutAdmin();
            }
        });
    }

    const btnLogoutNavAdmin = document.getElementById("btn-logout-nav-admin");
    if (btnLogoutNavAdmin) {
        btnLogoutNavAdmin.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("¿Estás seguro de que deseas cerrar la sesión de administración?")) {
                logoutAdmin();
            }
        });
    }


    // --- Eventos del Portal de Componentes (Músicos) ---
    
    // Barra de navegación inferior móvil
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if (item.classList.contains("btn-logout-component")) {
                logoutComponent();
            } else {
                const target = item.getAttribute("data-target");
                if (target) renderActiveSection(target);
            }
        });
    });

    // Formulario de cambio de PIN en Ficha
    const formChangePin = document.getElementById("form-change-pin");
    if (formChangePin) {
        formChangePin.addEventListener("submit", (e) => {
            e.preventDefault();
            const musicianId = getAuthMusicianId();
            const newPin = document.getElementById("change-pin-new").value.trim();
            
            if (newPin.length !== 4 || isNaN(newPin)) {
                showToast("El PIN debe tener exactamente 4 dígitos numéricos", "warning");
                return;
            }
            
            const musician = state.musicians.find(m => m.id === musicianId);
            if (!musician) return;
            
            musician.pin = newPin;
            saveStateToLocalStorage();
            
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("musicians").doc(musicianId).update({ pin: newPin })
                    .then(() => {
                        showToast("PIN actualizado con éxito en la nube", "success");
                        document.getElementById("change-pin-new").value = "";
                        renderComponentFicha();
                    })
                    .catch(err => {
                        console.error("Error al actualizar PIN:", err);
                        showToast("PIN actualizado localmente (offline)", "success");
                        document.getElementById("change-pin-new").value = "";
                        renderComponentFicha();
                    });
            } else {
                showToast("PIN actualizado localmente", "success");
                document.getElementById("change-pin-new").value = "";
                renderComponentFicha();
            }
        });
    }

    // Filtros del historial de asistencia
    const filterHistoryType = document.getElementById("filter-history-type");
    const filterHistoryYear = document.getElementById("filter-history-year");
    const filterHistoryMonth = document.getElementById("filter-history-month");
    
    if (filterHistoryType) {
        filterHistoryType.addEventListener("change", renderComponentHistorial);
    }
    if (filterHistoryYear) {
        filterHistoryYear.addEventListener("change", renderComponentHistorial);
    }
    if (filterHistoryMonth) {
        filterHistoryMonth.addEventListener("change", renderComponentHistorial);
    }

    // Buscador de repertorio personal
    const searchCompMarcha = document.getElementById("search-comp-marcha");
    if (searchCompMarcha) {
        searchCompMarcha.addEventListener("input", () => {
            renderComponentRepertorio();
        });
    }

    // Descargar repertorio en PDF
    const btnDownloadRepertoirePDF = document.getElementById("btn-download-repertoire-pdf");
    if (btnDownloadRepertoirePDF) {
        btnDownloadRepertoirePDF.addEventListener("click", () => {
            downloadRepertoirePDFReport();
        });
    }

    // Colapsables de estadísticas y otros
    document.querySelectorAll(".card-collapsible-header").forEach(header => {
        header.addEventListener("click", () => {
            const card = header.closest(".card-collapsible");
            if (card) {
                card.classList.toggle("collapsed");
            }
        });
    });

    const btnToRepertoire = document.getElementById("btn-stats-to-repertoire");
    if (btnToRepertoire) {
        btnToRepertoire.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita colapsar la tarjeta al hacer clic en el botón
            const navItem = document.querySelector(`.nav-item[data-target="section-marchas"]`);
            if (navItem) {
                document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
                navItem.classList.add("active");
            }
            renderActiveSection("section-marchas");
        });
    }

    // Navegación Sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            if (!targetId) return;
            
            document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            renderActiveSection(targetId);
        });
    });

    // Control de Fecha en Pasar Lista
    document.getElementById("attendance-date").addEventListener("change", (e) => {
        const selectedDate = e.target.value;
        if (selectedDate) {
            // Si hay múltiples sesiones para esta fecha, seleccionamos la primera por defecto
            const sessionKeys = Object.keys(state.sessionTypes).filter(key => key.startsWith(selectedDate));
            const activeKey = sessionKeys.length > 0 ? sessionKeys[0] : selectedDate;
            
            state.currentDate = activeKey;
            initializeAttendanceForDate(activeKey);
            renderAttendance();
            renderRehearsalMarchasWidget();
            updateSessionBadge();
            showToast(`Cargada asistencia para el ${formatDateSpanish(selectedDate)}`, "success");
        }
    });

    // Control de múltiples sesiones en el mismo día
    document.getElementById("attendance-session-select").addEventListener("change", (e) => {
        const selectedSessionKey = e.target.value;
        if (selectedSessionKey) {
            state.currentDate = selectedSessionKey;
            initializeAttendanceForDate(selectedSessionKey);
            renderAttendance();
            renderRehearsalMarchasWidget();
            updateSessionBadge();
        }
    });

    // Cambio de Tema Claro/Oscuro
    document.getElementById("theme-switch").addEventListener("change", (e) => {
        const isDark = e.target.checked;
        document.body.setAttribute("data-theme", isDark ? "dark" : "light");
        localStorage.setItem("harmonia_theme", isDark ? "dark" : "light");
        showToast(`Modo ${isDark ? 'oscuro' : 'claro'} activado`, "success");
    });



    // Modal de Notas de Marchas
    document.getElementById("btn-close-marcha-notes-modal").addEventListener("click", closeMarchaNotesModal);
    document.getElementById("btn-cancel-marcha-notes-modal").addEventListener("click", closeMarchaNotesModal);
    document.getElementById("btn-save-marcha-notes-modal").addEventListener("click", saveMarchaNotes);

    // Buscador en Pasar Lista
    document.getElementById("search-musician").addEventListener("input", () => {
        renderAttendance();
    });

    // Buscador en Plantilla
    document.getElementById("search-plantilla").addEventListener("input", () => {
        renderPlantillaTable();
    });

    // Buscador en Estadísticas (Músicos individuales)
    document.getElementById("search-stats-musician").addEventListener("input", () => {
        renderComponentsCircularStats();
    });

    // Filtros de Período en Estadísticas
    document.getElementById("filter-year").addEventListener("change", () => {
        renderStatistics();
    });
    document.getElementById("filter-month").addEventListener("change", () => {
        renderStatistics();
    });
    document.getElementById("filter-type").addEventListener("change", () => {
        renderStatistics();
    });

    // Alternancia en Visión General (Estadísticas)
    const btnOvYears = document.getElementById("btn-stats-ov-years");
    const btnOvMonths = document.getElementById("btn-stats-ov-months");
    const ovYearSelect = document.getElementById("stats-ov-year-select");

    if (btnOvYears && btnOvMonths) {
        btnOvYears.addEventListener("click", () => {
            state.statsOvMode = "years";
            btnOvYears.classList.remove("btn-secondary");
            btnOvYears.classList.add("btn-primary");
            btnOvYears.style.background = "";
            btnOvYears.style.color = "";
            
            btnOvMonths.classList.remove("btn-primary");
            btnOvMonths.classList.add("btn-secondary");
            btnOvMonths.style.background = "transparent";
            btnOvMonths.style.color = "var(--text-secondary)";
            
            document.getElementById("stats-ov-month-filter-container").classList.add("hidden");
            renderGeneralOverviewChart();
        });
        
        btnOvMonths.addEventListener("click", () => {
            state.statsOvMode = "months";
            btnOvMonths.classList.remove("btn-secondary");
            btnOvMonths.classList.add("btn-primary");
            btnOvMonths.style.background = "";
            btnOvMonths.style.color = "";
            
            btnOvYears.classList.remove("btn-primary");
            btnOvYears.classList.add("btn-secondary");
            btnOvYears.style.background = "transparent";
            btnOvYears.style.color = "var(--text-secondary)";
            
            document.getElementById("stats-ov-month-filter-container").classList.remove("hidden");
            renderGeneralOverviewChart();
        });
    }

    if (ovYearSelect) {
        ovYearSelect.addEventListener("change", (e) => {
            state.statsOvSelectedSeason = e.target.value;
            renderGeneralOverviewChart();
        });
    }

    // Filtros de Historial de Ensayos
    document.getElementById("rehearsals-filter-year").addEventListener("change", () => {
        renderEnsayosList();
    });
    document.getElementById("rehearsals-filter-month").addEventListener("change", () => {
        renderEnsayosList();
    });

    // Filtros de Historial de Actuaciones
    document.getElementById("actuaciones-filter-year").addEventListener("change", () => {
        renderActuacionesList();
    });
    document.getElementById("actuaciones-filter-month").addEventListener("change", () => {
        renderActuacionesList();
    });

    // Modal de estadísticas detalladas del componente
    document.getElementById("btn-close-musician-stats").addEventListener("click", () => {
        document.getElementById("modal-musician-stats").classList.remove("active");
    });
    document.getElementById("modal-musician-stats").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.getElementById("modal-musician-stats").classList.remove("active");
        }
    });
    document.getElementById("detail-filter-year").addEventListener("change", () => renderMusicianDetailContent());
    document.getElementById("detail-filter-month").addEventListener("change", () => renderMusicianDetailContent());
    document.getElementById("detail-filter-type").addEventListener("change", () => renderMusicianDetailContent());
    document.getElementById("btn-download-pdf").addEventListener("click", () => downloadMusicianPDFReport());
    
    const toggleBtn = document.getElementById("btn-detail-absences-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            showAllDetailAbsences = !showAllDetailAbsences;
            renderMusicianDetailContent();
        });
    }
    
    const manualBadges = [
        { id: "weather", field: "badgeWeather" },
        { id: "sangre", field: "badgeSangreNueva" },
        { id: "fiel", field: "badgeFielAtril" },
        { id: "corazon", field: "badgeCorazonYacente" },
        { id: "raices", field: "badgeRaicesProfundas" },
        { id: "leyenda", field: "badgeLeyendaViva" },
        { id: "agonia", field: "badgeAgonia" },
        { id: "hasta_final", field: "badgeHastaElFinal" }
    ];
    manualBadges.forEach(badge => {
        const el = document.getElementById(`detail-badge-${badge.id}-check`);
        if (el) {
            el.addEventListener("change", (e) => {
                if (getAuthRole() !== "admin") {
                    e.preventDefault();
                    e.target.checked = !e.target.checked;
                    showToast("Solo la dirección puede asignar estas insignias", "error");
                    return;
                }
                const musicianId = currentDetailMusicianId;
                if (!musicianId) return;
                
                const musician = state.musicians.find(m => m.id === musicianId);
                if (!musician) return;
                
                musician[badge.field] = e.target.checked;
                
                if (isCloudActive()) {
                    const db = firebase.firestore();
                    db.collection("musicians").doc(musicianId).set(musician)
                        .then(() => {
                            showToast("Insignia actualizada en la nube", "success");
                        })
                        .catch(err => {
                            console.error("Error al actualizar insignia:", err);
                            showToast("Error al guardar en la nube", "error");
                        });
                } else {
                    localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
                    showToast("Insignia actualizada localmente", "success");
                }
                
                renderMusicianDetailContent();
            });
        }
    });



    const rutaInputListener = document.getElementById("detail-badge-ruta-trips");
    if (rutaInputListener) {
        rutaInputListener.addEventListener("change", (e) => {
            if (getAuthRole() !== "admin") {
                e.preventDefault();
                const musicianId = currentDetailMusicianId;
                const musician = state.musicians.find(m => m.id === musicianId);
                rutaInputListener.value = musician ? (musician.badgeRutaTrips || 0) : 0;
                showToast("Solo la dirección puede asignar estas insignias", "error");
                return;
            }
            const musicianId = currentDetailMusicianId;
            if (!musicianId) return;
            
            const musician = state.musicians.find(m => m.id === musicianId);
            if (!musician) return;
            
            const val = parseInt(e.target.value, 10);
            musician.badgeRutaTrips = isNaN(val) ? 0 : val;
            
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("musicians").doc(musicianId).set(musician)
                    .then(() => {
                        showToast("Insignia actualizada en la nube", "success");
                    })
                    .catch(err => {
                        console.error("Error al actualizar insignia:", err);
                        showToast("Error al guardar en la nube", "error");
                    });
            } else {
                localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
                showToast("Insignia actualizada localmente", "success");
            }
            
            renderMusicianDetailContent();
        });
    }

    const hermandadInputListener = document.getElementById("detail-badge-hermandad-events");
    if (hermandadInputListener) {
        hermandadInputListener.addEventListener("change", (e) => {
            if (getAuthRole() !== "admin") {
                e.preventDefault();
                const musicianId = currentDetailMusicianId;
                const musician = state.musicians.find(m => m.id === musicianId);
                hermandadInputListener.value = musician ? (musician.badgeHermandadEvents || 0) : 0;
                showToast("Solo la dirección puede asignar estas insignias", "error");
                return;
            }
            const musicianId = currentDetailMusicianId;
            if (!musicianId) return;
            
            const musician = state.musicians.find(m => m.id === musicianId);
            if (!musician) return;
            
            const val = parseInt(e.target.value, 10);
            musician.badgeHermandadEvents = isNaN(val) ? 0 : val;
            
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("musicians").doc(musicianId).set(musician)
                    .then(() => {
                        showToast("Insignia actualizada en la nube", "success");
                    })
                    .catch(err => {
                        console.error("Error al actualizar insignia:", err);
                        showToast("Error al guardar en la nube", "error");
                    });
            } else {
                localStorage.setItem("harmonia_musicians", JSON.stringify(state.musicians));
                showToast("Insignia actualizada localmente", "success");
            }
            
            renderMusicianDetailContent();
        });
    }

    // Modal de estadísticas detalladas de la sección / voz
    document.getElementById("btn-close-voice-stats").addEventListener("click", () => {
        document.getElementById("modal-voice-stats").classList.remove("active");
    });
    document.getElementById("modal-voice-stats").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.getElementById("modal-voice-stats").classList.remove("active");
        }
    });
    document.getElementById("voice-filter-year").addEventListener("change", () => renderVoiceDetailContent());
    document.getElementById("voice-filter-month").addEventListener("change", () => renderVoiceDetailContent());
    document.getElementById("voice-filter-type").addEventListener("change", () => renderVoiceDetailContent());

    // Botones colapsar/expandir en Pasar Lista
    document.getElementById("btn-collapse-all").addEventListener("click", () => {
        document.querySelectorAll(".instrument-section").forEach(sec => sec.classList.add("collapsed"));
    });
    document.getElementById("btn-expand-all").addEventListener("click", () => {
        document.querySelectorAll(".instrument-section").forEach(sec => sec.classList.remove("collapsed"));
    });
    document.getElementById("btn-reset-attendance").addEventListener("click", () => {
        if (confirm("¿Resetear la lista? Todos los componentes se marcarán como ausentes.")) {
            const date = state.currentDate;
            state.musicians.forEach(musician => {
                if (state.attendance[date] && state.attendance[date][musician.id]) {
                    state.attendance[date][musician.id].status = "absent";
                    state.attendance[date][musician.id].justified = false;
                    state.attendance[date][musician.id].reason = "";
                }
            });
            saveStateToLocalStorage();
            renderAttendance();
            showToast("Lista reseteada — todos marcados como ausentes", "error");
        }
    });



    // ==========================================
    // MODAL DE MÚSICO
    // ==========================================
    const modalMusician = document.getElementById("modal-musician");
    
    document.getElementById("btn-add-musician").addEventListener("click", () => {
        document.getElementById("form-musician").reset();
        document.getElementById("musician-id").value = "";
        document.getElementById("modal-title").innerText = "Añadir Nuevo Músico";
        modalMusician.classList.add("active");
    });

    const closeModalMusician = () => modalMusician.classList.remove("active");
    document.getElementById("btn-close-modal").addEventListener("click", closeModalMusician);
    document.getElementById("btn-cancel-modal").addEventListener("click", closeModalMusician);

    document.getElementById("form-musician").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("musician-id").value;
        const name = document.getElementById("musician-name").value.trim();
        const instrument = document.getElementById("musician-instrument").value;
        const role = document.getElementById("musician-role").value.trim();
        
        if (!name || !instrument) return;

        if (id) {
            const index = state.musicians.findIndex(m => m.id === id);
            if (index !== -1) {
                state.musicians[index] = { 
                    ...state.musicians[index], 
                    name, 
                    instrument, 
                    role
                };
                dbSaveMusician(state.musicians[index]);
                showToast("Músico actualizado", "success");
            }
        } else {
            const newId = "mus-" + Date.now();
            const newMusician = { 
                id: newId, 
                name, 
                instrument, 
                role, 
                pin: "", 
                badgeWeather: false,
                badgeSangreNueva: false,
                badgeFielAtril: false,
                badgeCorazonYacente: false,
                badgeRaicesProfundas: false,
                badgeLeyendaViva: false,
                badgeRutaTrips: 0,
                badgeAgonia: false,
                badgeHastaElFinal: false,
                badgeTrotamundosTrips: 0,
                badgeHermandadEvents: 0
            };
            state.musicians.push(newMusician);
            dbSaveMusician(newMusician);
            
            const sessionInfo = state.sessionTypes[state.currentDate];
            const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
            const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
            
            if (state.attendance[state.currentDate]) {
                if (!isSpecialRehearsal || convocated.includes(instrument)) {
                    state.attendance[state.currentDate][newId] = {
                        status: "absent",
                        justified: false,
                        reason: ""
                    };
                    dbSaveAttendance(state.currentDate, newId, state.attendance[state.currentDate][newId]);
                }
            }
            showToast("Músico añadido", "success");
        }

        closeModalMusician();
        renderPlantillaTable();
        renderAttendance();
        renderStatistics();
    });

    // ==========================================
    // MODAL DE CREAR ENSAYO
    // ==========================================
    const modalRehearsal = document.getElementById("modal-rehearsal");
    
    document.getElementById("btn-add-rehearsal").addEventListener("click", () => {
        document.getElementById("rehearsal-date-input").value = new Date().toISOString().split("T")[0];
        document.getElementById("rehearsal-type-input").value = "general";
        if (document.getElementById("rehearsal-location-input")) {
            document.getElementById("rehearsal-location-input").value = "Parking";
        }
        modalRehearsal.classList.add("active");
    });

    const closeModalRehearsal = () => modalRehearsal.classList.remove("active");
    document.getElementById("btn-close-rehearsal-modal").addEventListener("click", closeModalRehearsal);
    document.getElementById("btn-cancel-rehearsal-modal").addEventListener("click", closeModalRehearsal);

    document.getElementById("form-rehearsal").addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedDate = document.getElementById("rehearsal-date-input").value;
        const subtype = document.getElementById("rehearsal-type-input").value;
        if (!selectedDate) return;

        let sessionKey = selectedDate;
        if (state.sessionTypes[sessionKey]) {
            const existing = state.sessionTypes[sessionKey];
            if (existing.type === "ensayo" && existing.subtype === subtype) {
                showToast("Ya existe un ensayo de este tipo registrado para esta fecha", "error");
                return;
            }
            sessionKey = `${selectedDate}_${subtype}`;
            if (state.sessionTypes[sessionKey]) {
                showToast("Ya existe un ensayo de este tipo registrado para esta fecha", "error");
                return;
            }
        }

        let convocatedVoices = [];
        if (subtype === "trompetas1") {
            convocatedVoices = ["Trompetas 1ª", "Fliscornos"];
        } else if (subtype === "bajos") {
            convocatedVoices = ["Trompas", "Trombones", "Bombardinos", "Tubas"];
        } else if (subtype === "trompetas2y3") {
            convocatedVoices = ["Trompetas 2ª", "Trompetas 3ª"];
        } else if (subtype === "cornetas") {
            convocatedVoices = ["Cornetas"];
        } else if (subtype === "percusion") {
            convocatedVoices = ["Tambores", "Bombos", "Platos"];
        } else if (subtype === "primeras") {
            convocatedVoices = ["Trompetas 1ª", "Cornetas"]; // Fallback histórico
        }

        const locationVal = document.getElementById("rehearsal-location-input") ? document.getElementById("rehearsal-location-input").value : "Parking";
        state.sessionTypes[sessionKey] = { 
            type: "ensayo", 
            subtype: subtype, 
            name: "", 
            convocatedVoices: convocatedVoices,
            location: locationVal
        };
        initializeAttendanceForDate(sessionKey, convocatedVoices);
        
        dbSaveSessionType(sessionKey, state.sessionTypes[sessionKey]);
        if (isCloudActive()) {
            const db = firebase.firestore();
            db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
            // Disparar notificaciones push para el nuevo ensayo
            sendPushNotificationToConvocated(state.sessionTypes[sessionKey], sessionKey);
        } else {
            saveStateToLocalStorage();
        }
        
        closeModalRehearsal();
        renderEnsayosList();
        renderStatistics();
        
        state.currentDate = sessionKey;
        document.getElementById("attendance-date").value = selectedDate;
        
        document.querySelectorAll(".nav-item").forEach(nav => {
            if(nav.getAttribute("data-target") === "section-pasar-lista") {
                nav.classList.add("active");
            } else {
                nav.classList.remove("active");
            }
        });
        
        renderActiveSection("section-pasar-lista");
        renderAttendance();
        showToast(`Ensayo creado. Ya puedes pasar lista para el ${formatDateSpanish(selectedDate)}`, "success");
    });

    // ==========================================
    // MODAL DE CREAR ACTUACIÓN
    // ==========================================
    const modalActuacion = document.getElementById("modal-actuacion");
    
    document.getElementById("btn-add-actuacion").addEventListener("click", () => {
        document.getElementById("actuacion-date-input").value = new Date().toISOString().split("T")[0];
        document.getElementById("actuacion-name-input").value = "";
        if (document.getElementById("actuacion-trip-input")) {
            document.getElementById("actuacion-trip-input").checked = false;
        }
        modalActuacion.classList.add("active");
    });

    const closeModalActuacion = () => modalActuacion.classList.remove("active");
    document.getElementById("btn-close-actuacion-modal").addEventListener("click", closeModalActuacion);
    document.getElementById("btn-cancel-actuacion-modal").addEventListener("click", closeModalActuacion);

    document.getElementById("form-actuacion").addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedDate = document.getElementById("actuacion-date-input").value;
        const actuacionName = document.getElementById("actuacion-name-input").value.trim();
        if (!selectedDate || !actuacionName) return;

        let sessionKey = selectedDate;
        if (state.sessionTypes[sessionKey]) {
            sessionKey = `${selectedDate}_actuacion`;
            if (state.sessionTypes[sessionKey]) {
                showToast("Ya existe una actuación registrada para esta fecha", "error");
                return;
            }
        }

        initializeAttendanceForDate(sessionKey);
        const isTrip = document.getElementById("actuacion-trip-input") ? document.getElementById("actuacion-trip-input").checked : false;
        state.sessionTypes[sessionKey] = { type: "actuacion", name: actuacionName, isTrip: isTrip };
        
        dbSaveSessionType(sessionKey, state.sessionTypes[sessionKey]);
        if (isCloudActive()) {
            const db = firebase.firestore();
            db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
            // Disparar notificaciones push para la nueva actuación
            sendPushNotificationToConvocated(state.sessionTypes[sessionKey], sessionKey);
        } else {
            saveStateToLocalStorage();
        }
        
        closeModalActuacion();
        renderActuacionesList();
        renderStatistics();
        
        state.currentDate = sessionKey;
        document.getElementById("attendance-date").value = selectedDate;
        
        document.querySelectorAll(".nav-item").forEach(nav => {
            if(nav.getAttribute("data-target") === "section-pasar-lista") {
                nav.classList.add("active");
            } else {
                nav.classList.remove("active");
            }
        });
        
        renderActiveSection("section-pasar-lista");
        renderAttendance();
        showToast(`Actuación "${actuacionName}" creada. Ya puedes pasar lista para el ${formatDateSpanish(selectedDate)}`, "success");
    });

    // Guardar configuración de notificaciones push
    const formPushConfig = document.getElementById("form-push-config");
    if (formPushConfig) {
        formPushConfig.addEventListener("submit", (e) => {
            e.preventDefault();
            const vapidKey = document.getElementById("push-vapid-key").value.trim();
            const serverKey = document.getElementById("push-server-key").value.trim();
            
            localStorage.setItem("yacente_vapid_key", vapidKey);
            localStorage.setItem("yacente_fcm_server_key", serverKey);
            
            showToast("Configuración push guardada correctamente", "success");
        });
    }

    // ==========================================
    // BACKUPS Y COPIAS
    // ==========================================
    document.getElementById("btn-export-data").addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `harmonia_copia_${state.currentDate}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Copia de seguridad exportada", "success");
    });

    document.getElementById("import-file").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedState = JSON.parse(event.target.result);
                if (importedState.musicians && importedState.attendance) {
                    state.musicians = importedState.musicians;
                    state.attendance = importedState.attendance;
                    state.sessionTypes = importedState.sessionTypes || {};
                    
                    saveStateToLocalStorage();
                    initApp();
                    showToast("Copia de seguridad restaurada", "success");
                } else {
                    showToast("Formato JSON de copia no válido", "error");
                }
            } catch (err) {
                showToast("Error al leer el archivo", "error");
            }
        };
        reader.readAsText(file);
    });



    // Cambiar contraseña de administración (Modal)
    const modalChangeAdminPass = document.getElementById("modal-change-admin-password");
    const btnOpenChangePass = document.getElementById("btn-open-change-password-modal");
    const btnCloseChangePass = document.getElementById("btn-close-change-password-modal");
    const btnCancelChangePass = document.getElementById("btn-cancel-change-password-modal");
    const formChangeAdminPass = document.getElementById("form-change-admin-password");

    if (btnOpenChangePass && modalChangeAdminPass) {
        btnOpenChangePass.addEventListener("click", () => {
            modalChangeAdminPass.classList.add("active");
            formChangeAdminPass.reset();
        });
    }

    const closeChangePassModal = () => {
        if (modalChangeAdminPass) {
            modalChangeAdminPass.classList.remove("active");
        }
    };

    if (btnCloseChangePass) {
        btnCloseChangePass.addEventListener("click", closeChangePassModal);
    }
    if (btnCancelChangePass) {
        btnCancelChangePass.addEventListener("click", closeChangePassModal);
    }

    if (formChangeAdminPass) {
        formChangeAdminPass.addEventListener("submit", (e) => {
            e.preventDefault();
            const oldPass = document.getElementById("admin-pass-old").value.trim();
            const newPass = document.getElementById("admin-pass-new").value.trim();
            const confirmPass = document.getElementById("admin-pass-new-confirm").value.trim();
            
            if (newPass.length < 4) {
                showToast("La nueva contraseña debe tener al menos 4 caracteres", "warning");
                return;
            }
            
            if (newPass !== confirmPass) {
                showToast("Las contraseñas nuevas no coinciden", "warning");
                return;
            }
            
            // Validar contraseña actual
            const oldHash = hashString(oldPass);
            let isValid = false;
            
            if (state.firebasePasswordHash) {
                isValid = (oldHash === state.firebasePasswordHash);
            } else {
                isValid = (oldPass === "admin");
            }
            
            if (!isValid) {
                showToast("La contraseña actual es incorrecta", "error");
                return;
            }
            
            // Guardar nueva contraseña
            const newHash = hashString(newPass);
            state.firebasePasswordHash = newHash;
            localStorage.setItem("yacente_firebase_hash", newHash);
            
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("config").doc("security").set({
                    passwordHash: newHash
                }, { merge: true })
                .then(() => {
                    showToast("Contraseña de directiva actualizada en la nube", "success");
                    closeChangePassModal();
                })
                .catch(err => {
                    console.error("Error al actualizar contraseña en la nube:", err);
                    showToast("Contraseña guardada en este dispositivo, pero falló en la nube", "warning");
                    closeChangePassModal();
                });
            } else {
                showToast("Contraseña de directiva actualizada localmente", "success");
                closeChangePassModal();
            }
        });
    }

    // ==========================================
    // REPERTORIO Y MARCHAS
    // ==========================================
    const modalMarcha = document.getElementById("modal-marcha");
    document.getElementById("btn-add-marcha").addEventListener("click", () => {
        document.getElementById("modal-marcha-title").innerText = "Añadir Nueva Marcha";
        document.getElementById("marcha-id").value = "";
        document.getElementById("marcha-title-input").value = "";
        document.getElementById("marcha-status-input").value = "green";
        document.getElementById("marcha-difficulty-input").value = "1";
        modalMarcha.classList.add("active");
    });

    const closeModalMarcha = () => modalMarcha.classList.remove("active");
    document.getElementById("btn-close-marcha-modal").addEventListener("click", closeModalMarcha);
    document.getElementById("btn-cancel-marcha-modal").addEventListener("click", closeModalMarcha);

    document.getElementById("btn-close-marcha-history-modal").addEventListener("click", () => {
        document.getElementById("modal-marcha-history").classList.remove("active");
    });
    document.getElementById("modal-marcha-history").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.getElementById("modal-marcha-history").classList.remove("active");
        }
    });

    document.getElementById("form-marcha").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("marcha-id").value;
        const title = document.getElementById("marcha-title-input").value.trim();
        const status = document.getElementById("marcha-status-input").value;
        const difficulty = parseInt(document.getElementById("marcha-difficulty-input").value) || 1;

        if (!title) return;

        if (id) {
            // Edit existing marcha
            const index = state.marchas.findIndex(m => m.id === id);
            if (index !== -1) {
                state.marchas[index].title = title;
                state.marchas[index].status = status;
                state.marchas[index].difficulty = difficulty;
                dbSaveMarcha(state.marchas[index]);
                showToast("Marcha actualizada", "success");
            }
        } else {
            // Create new marcha
            const newMarcha = {
                id: "mar-" + Date.now(),
                title,
                status,
                difficulty
            };
            state.marchas.push(newMarcha);
            dbSaveMarcha(newMarcha);
            showToast("Marcha añadida al repertorio", "success");
        }

        closeModalMarcha();
        renderMarchasList();
        renderRehearsalMarchasWidget();
    });

    document.getElementById("search-marcha").addEventListener("input", () => {
        renderMarchasList();
    });

    document.getElementById("btn-view-list").addEventListener("click", () => {
        state.marchasViewMode = "list";
        renderMarchasList();
    });

    document.getElementById("btn-view-difficulty").addEventListener("click", () => {
        state.marchasViewMode = "difficulty";
        renderMarchasList();
    });

    document.getElementById("btn-view-status").addEventListener("click", () => {
        state.marchasViewMode = "status";
        renderMarchasList();
    });

    document.getElementById("btn-add-marcha-today").addEventListener("click", () => {
        const select = document.getElementById("select-add-marcha-today");
        const marchaId = select.value;
        if (!marchaId) return;

        const date = state.currentDate;
        if (!state.playedMarchas[date]) {
            state.playedMarchas[date] = [];
        }

        if (state.playedMarchas[date].includes(marchaId)) {
            showToast("Esta marcha ya ha sido registrada hoy", "warning");
            return;
        }

        state.playedMarchas[date].push(marchaId);
        dbSavePlayedMarchas(date, state.playedMarchas[date]);

        select.value = "";
        renderRehearsalMarchasWidget();
        renderMarchasList();
        showToast("Marcha registrada hoy", "success");
    });

    const closeRehearsalDetailModal = () => {
        document.getElementById("modal-rehearsal-detail").classList.remove("active");
    };
    document.getElementById("btn-close-rehearsal-detail").addEventListener("click", closeRehearsalDetailModal);
    document.getElementById("btn-close-rehearsal-detail-footer").addEventListener("click", closeRehearsalDetailModal);

    const closeActuacionDetailModal = () => {
        document.getElementById("modal-actuacion-detail").classList.remove("active");
    };
    document.getElementById("btn-close-actuacion-detail").addEventListener("click", closeActuacionDetailModal);
    document.getElementById("btn-close-actuacion-detail-footer").addEventListener("click", closeActuacionDetailModal);

    const handleEditFromDetail = () => {
        const date = state.activeDetailDate;
        if (!date) return;
        
        closeRehearsalDetailModal();
        closeActuacionDetailModal();
        
        const rawDate = date.split("_")[0];
        state.currentDate = date;
        document.getElementById("attendance-date").value = rawDate;
        
        initializeAttendanceForDate(date);
        
        document.querySelectorAll(".nav-item").forEach(nav => {
            if (nav.getAttribute("data-target") === "section-pasar-lista") {
                nav.classList.add("active");
            } else {
                nav.classList.remove("active");
            }
        });
        
        renderActiveSection("section-pasar-lista");
        renderAttendance();
        renderRehearsalMarchasWidget();
        updateSessionBadge();
    };

    document.getElementById("btn-edit-rehearsal-from-detail").addEventListener("click", handleEditFromDetail);
    document.getElementById("btn-edit-actuacion-from-detail").addEventListener("click", handleEditFromDetail);

    document.getElementById("btn-delete-rehearsal-from-detail").addEventListener("click", () => {
        const date = state.activeDetailDate;
        if (!date) return;
        
        const rawDate = date.split("_")[0];
        const today = new Date().toISOString().split("T")[0];
        if (rawDate < today) {
            showToast("No puedes eliminar ensayos pasados desde el calendario", "warning");
            return;
        }
        
        if (confirm(`¿Estás seguro de que quieres eliminar por completo el ensayo del ${formatDateSpanish(date)}? Esta acción borrará el registro de asistencia.`)) {
            delete state.attendance[date];
            delete state.sessionTypes[date];
            dbDeleteSession(date);
            
            closeRehearsalDetailModal();
            
            renderEnsayosList();
            renderStatistics();
            renderCalendar();
            showToast(`Ensayo del ${formatDateSpanish(date)} eliminado`, "error");
        }
    });

    // ==========================================
    // MODAL DE CONFIGURACIÓN RÁPIDA DE SESIÓN
    // ==========================================
    const modalQuickSession = document.getElementById("modal-quick-session");
    
    document.getElementById("btn-configure-session").addEventListener("click", () => {
        state.isAddingNewSession = false;
        const date = state.currentDate;
        if (!date) return;
        
        document.getElementById("quick-session-title").innerText = `Configurar Sesión - ${formatDateSpanish(date)}`;
        
        // Reset defaults
        document.getElementById("quick-session-actuacion-name").value = "";
        
        const sessionInfo = state.sessionTypes[date];
        if (sessionInfo) {
            if (sessionInfo.type === "actuacion") {
                document.getElementById("quick-session-type").value = "actuacion";
                document.getElementById("quick-session-actuacion-name").value = sessionInfo.name || "";
            } else if (sessionInfo.type === "ensayo") {
                const sub = sessionInfo.subtype;
                if (sub === "trompetas1") {
                    document.getElementById("quick-session-type").value = "ensayo-trompetas1";
                } else if (sub === "bajos") {
                    document.getElementById("quick-session-type").value = "ensayo-bajos";
                } else if (sub === "trompetas2y3") {
                    document.getElementById("quick-session-type").value = "ensayo-trompetas2y3";
                } else if (sub === "cornetas") {
                    document.getElementById("quick-session-type").value = "ensayo-cornetas";
                } else if (sub === "percusion") {
                    document.getElementById("quick-session-type").value = "ensayo-percusion";
                } else if (sub === "primeras") {
                    document.getElementById("quick-session-type").value = "ensayo-primeras";
                } else {
                    document.getElementById("quick-session-type").value = "ensayo-general";
                }
                if (document.getElementById("quick-session-location")) {
                    document.getElementById("quick-session-location").value = sessionInfo.location || "Parking";
                }
            }
        } else {
            // Default when not created
            document.getElementById("quick-session-type").value = "ensayo-general";
            if (document.getElementById("quick-session-location")) {
                document.getElementById("quick-session-location").value = "Parking";
            }
        }
        
        // Trigger visibility update
        updateQuickSessionFieldsVisibility();
        
        modalQuickSession.classList.add("active");
    });

    const closeQuickSession = () => modalQuickSession.classList.remove("active");
    document.getElementById("btn-close-quick-session").addEventListener("click", closeQuickSession);
    document.getElementById("btn-cancel-quick-session").addEventListener("click", closeQuickSession);

    const quickSessionTypeSelect = document.getElementById("quick-session-type");
    
    function updateQuickSessionFieldsVisibility() {
        const type = quickSessionTypeSelect.value;
        const actuacionGroup = document.getElementById("quick-session-actuacion-group");
        const locationGroup = document.getElementById("quick-session-location-group");
        
        if (type === "actuacion") {
            actuacionGroup.classList.remove("hidden");
            if (locationGroup) locationGroup.classList.add("hidden");
        } else {
            actuacionGroup.classList.add("hidden");
            if (locationGroup) locationGroup.classList.remove("hidden");
        }
    }
    
    quickSessionTypeSelect.addEventListener("change", updateQuickSessionFieldsVisibility);

    document.getElementById("form-quick-session").addEventListener("submit", (e) => {
        e.preventDefault();
        const date = state.currentDate;
        if (!date) return;
        
        const type = quickSessionTypeSelect.value;
        let newSession = null;
        let convocatedVoices = [];
        
        if (type.startsWith("ensayo-")) {
            const locationVal = document.getElementById("quick-session-location") ? document.getElementById("quick-session-location").value : "Parking";
            
            if (type === "ensayo-general") {
                newSession = { type: "ensayo", subtype: "general", name: "", location: locationVal };
            } else if (type === "ensayo-trompetas1") {
                convocatedVoices = ["Trompetas 1ª", "Fliscornos"];
                newSession = { type: "ensayo", subtype: "trompetas1", name: "", convocatedVoices, location: locationVal };
            } else if (type === "ensayo-bajos") {
                convocatedVoices = ["Trompas", "Trombones", "Bombardinos", "Tubas"];
                newSession = { type: "ensayo", subtype: "bajos", name: "", convocatedVoices, location: locationVal };
            } else if (type === "ensayo-trompetas2y3") {
                convocatedVoices = ["Trompetas 2ª", "Trompetas 3ª"];
                newSession = { type: "ensayo", subtype: "trompetas2y3", name: "", convocatedVoices, location: locationVal };
            } else if (type === "ensayo-cornetas") {
                convocatedVoices = ["Cornetas"];
                newSession = { type: "ensayo", subtype: "cornetas", name: "", convocatedVoices, location: locationVal };
            } else if (type === "ensayo-percusion") {
                convocatedVoices = ["Tambores", "Bombos", "Platos"];
                newSession = { type: "ensayo", subtype: "percusion", name: "", convocatedVoices, location: locationVal };
            } else if (type === "ensayo-primeras") {
                convocatedVoices = ["Trompetas 1ª", "Cornetas"];
                newSession = { type: "ensayo", subtype: "primeras", name: "", convocatedVoices, location: locationVal }; // Fallback
            }
        } else if (type === "actuacion") {
            const actuacionName = document.getElementById("quick-session-actuacion-name").value.trim();
            if (!actuacionName) {
                showToast("Por favor, introduce el nombre de la actuación", "error");
                return;
            }
            newSession = { type: "actuacion", name: actuacionName };
        }
        
        // Determine the actual session key to use
        let sessionKey = date;
        if (state.isAddingNewSession) {
            const rawDate = date.split("_")[0];
            sessionKey = rawDate;
            if (state.sessionTypes[sessionKey]) {
                let counter = 1;
                while (state.sessionTypes[`${rawDate}_${counter}`]) {
                    counter++;
                }
                sessionKey = `${rawDate}_${counter}`;
            }
            state.currentDate = sessionKey;
        }

        // Save to state
        state.sessionTypes[sessionKey] = newSession;
        
        // Initialize attendance records for the new configuration
        initializeAttendanceForDate(sessionKey, convocatedVoices);
        
        // Save to Database and Local Storage
        dbSaveSessionType(sessionKey, newSession);
        if (isCloudActive()) {
            const db = firebase.firestore();
            db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
            // Disparar notificaciones push si es una sesión nueva
            if (state.isAddingNewSession) {
                sendPushNotificationToConvocated(newSession, sessionKey);
            }
        } else {
            saveStateToLocalStorage();
        }
        
        // Update UI
        closeQuickSession();
        updateSessionBadge();
        renderAttendance();
        renderRehearsalMarchasWidget();
        renderEnsayosList();
        renderActuacionesList();
        renderStatistics();
        renderCalendar();
        showToast("Sesión configurada correctamente", "success");
    });

    // Listener para el huevo de pascua de la vela en Ajustes
    const candleIcon = document.getElementById("candle-icon");
    if (candleIcon) {
        const motivationalPhrases = [
            "El esfuerzo invisible de hoy, es el éxito visible del mañana",
            "Los grandes resultados se construyen en los detalles que nadie ve",
            "El trabajo que nadie aplaude es justo el que hace posibles los logros",
            "Preparar el camino es tan importante como cruzar la meta",
            "El cansancio es temporal, pero la satisfacción de haber construido algo grande es permanente",
            "La excelencia no es un don, es el hábito de no rendirse cuando el trabajo se vuelve pesado",
            "El trabajo de hoy es el concierto inolvidable de mañana"
        ];
        
        let shuffledPhrases = [];
        let phrasePointer = 0;
        
        function shufflePhrases() {
            shuffledPhrases = [...motivationalPhrases].sort(() => Math.random() - 0.5);
            phrasePointer = 0;
        }
        
        // Barajar al cargar la aplicación
        shufflePhrases();

        candleIcon.addEventListener("click", () => {
            const flame = document.getElementById("candle-flame");
            const halo = document.getElementById("flame-halo");
            const phrase = document.getElementById("candle-tribute-phrase");
            if (flame && phrase) {
                const isLit = !flame.classList.contains("hidden");
                if (isLit) {
                    flame.classList.add("hidden");
                    if (halo) halo.classList.add("hidden");
                    phrase.classList.add("hidden");
                } else {
                    // Cargar frase de la lista barajada
                    phrase.innerText = shuffledPhrases[phrasePointer];
                    
                    // Avanzar puntero y re-barajar si se termina la tanda
                    phrasePointer++;
                    if (phrasePointer >= shuffledPhrases.length) {
                        const lastPhrase = shuffledPhrases[shuffledPhrases.length - 1];
                        do {
                            shufflePhrases();
                        } while (shuffledPhrases[0] === lastPhrase && shuffledPhrases.length > 1);
                    }
                    
                    flame.classList.remove("hidden");
                    if (halo) halo.classList.remove("hidden");
                    phrase.classList.remove("hidden");
                }
            }
        });
    }

    setupMarchasDragAndDrop();
    setupFirebaseListeners();
}

// Configura las zonas de arrastre (drop zones) para las columnas de repertorio
function setupMarchasDragAndDrop() {
    // 1. Columnas de Estado
    const statusColumnsConfig = [
        { id: "column-green-list", status: "green" },
        { id: "column-yellow-list", status: "yellow" },
        { id: "column-red-list", status: "red" }
    ];

    statusColumnsConfig.forEach(col => {
        const el = document.getElementById(col.id);
        if (!el) return;

        el.addEventListener("dragover", (e) => {
            e.preventDefault();
            el.classList.add("drag-hover");
        });

        el.addEventListener("dragleave", () => {
            el.classList.remove("drag-hover");
        });

        el.addEventListener("drop", (e) => {
            e.preventDefault();
            el.classList.remove("drag-hover");
            const marchaId = e.dataTransfer.getData("text/plain");
            const marcha = state.marchas.find(item => item.id === marchaId);
            if (marcha && marcha.status !== col.status) {
                marcha.status = col.status;
                
                // Guardar cambios
                dbSaveMarcha(marcha);
                saveStateToLocalStorage();
                renderMarchasList();
                renderRehearsalMarchasWidget();
                
                const statusLabel = col.status === "green" ? "Bien trabajada" : col.status === "yellow" ? "En proceso" : "Por trabajar";
                showToast(`Marcha "${marcha.title}" cambiada a ${statusLabel}`, "success");
            }
        });
    });

    // 2. Columnas de Dificultad
    const diffColumnsConfig = [
        { id: "column-diff-1-list", difficulty: 1 },
        { id: "column-diff-2-list", difficulty: 2 },
        { id: "column-diff-3-list", difficulty: 3 },
        { id: "column-diff-4-list", difficulty: 4 },
        { id: "column-diff-5-list", difficulty: 5 }
    ];

    diffColumnsConfig.forEach(col => {
        const el = document.getElementById(col.id);
        if (!el) return;

        el.addEventListener("dragover", (e) => {
            e.preventDefault();
            el.classList.add("drag-hover");
        });

        el.addEventListener("dragleave", () => {
            el.classList.remove("drag-hover");
        });

        el.addEventListener("drop", (e) => {
            e.preventDefault();
            el.classList.remove("drag-hover");
            const marchaId = e.dataTransfer.getData("text/plain");
            const marcha = state.marchas.find(item => item.id === marchaId);
            if (marcha && parseInt(marcha.difficulty) !== col.difficulty) {
                marcha.difficulty = col.difficulty;
                
                // Guardar cambios
                dbSaveMarcha(marcha);
                saveStateToLocalStorage();
                renderMarchasList();
                
                showToast(`Marcha "${marcha.title}" cambiada a Dificultad Nivel ${col.difficulty}`, "success");
            }
        });
    });
    
    // Inicializar eventos de preaviso
    setupPreavisoEvents();

    // Notificaciones de Músicos
    const btnNotifBell = document.getElementById("btn-comp-notifications-bell");
    if (btnNotifBell) {
        btnNotifBell.addEventListener("click", () => {
            renderActiveSection("section-componente-notificaciones");
        });
    }

    const btnBackNotif = document.getElementById("btn-back-from-notif");
    if (btnBackNotif) {
        btnBackNotif.addEventListener("click", () => {
            renderActiveSection("section-componente-ficha");
        });
    }

    const btnMarkAllRead = document.getElementById("btn-comp-notif-mark-all-read");
    if (btnMarkAllRead) {
        btnMarkAllRead.addEventListener("click", () => {
            const musicianId = getAuthMusicianId();
            if (!musicianId) return;
            const notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
            notifs.forEach(n => n.seen = true);
            localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));
            renderComponentNotificationsList();
            updateNotificationsBadge();
            showToast("Todas las notificaciones marcadas como leídas.", "success");
        });
    }
}

function renderActiveSection(sectionId) {
    const activeRole = getAuthRole();
    if (activeRole === "component" && !sectionId.startsWith("section-componente-")) {
        sectionId = "section-componente-ficha";
    }

    document.querySelectorAll(".app-section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");

    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");
    const dateContainer = document.getElementById("header-date-container");
    const sessionBadge = document.getElementById("attendance-session-badge");
    const configBtn = document.getElementById("btn-configure-session");

    if (sessionBadge) sessionBadge.style.display = "none";
    if (configBtn) configBtn.style.display = "none";

    // Manejo del contenedor de tributo (vela)
    const tributeContainer = document.getElementById("candle-tribute-container");
    if (tributeContainer) {
        if (sectionId === "section-ajustes" && activeRole !== "component") {
            tributeContainer.classList.remove("hidden");
        } else {
            tributeContainer.classList.add("hidden");
        }
    }

    switch(sectionId) {
        case "section-pasar-lista":
            pageTitle.innerText = "Pasar Lista";
            pageSubtitle.innerText = "Control diario de músicos por sección";
            dateContainer.classList.remove("hidden");
            if (sessionBadge) sessionBadge.style.display = "inline-flex";
            if (configBtn) configBtn.style.display = "inline-flex";
            renderAttendance();
            renderRehearsalMarchasWidget();
            break;
        case "section-ensayos":
            pageTitle.innerText = "Ensayos";
            pageSubtitle.innerText = "Historial de ensayos y sesiones musicales";
            dateContainer.classList.add("hidden");
            renderEnsayosList();
            break;
        case "section-actuaciones":
            pageTitle.innerText = "Actuaciones";
            pageSubtitle.innerText = "Historial de actuaciones y salidas procesionales";
            dateContainer.classList.add("hidden");
            renderActuacionesList();
            break;
        case "section-calendario":
            pageTitle.innerText = "Calendario";
            pageSubtitle.innerText = "Planificador de ensayos, actuaciones y objetivos";
            dateContainer.classList.add("hidden");
            renderCalendar();
            renderWeeklyGoalsList();
            break;
        case "section-plantilla":
            pageTitle.innerText = `Plantilla (${state.musicians.length})`;
            pageSubtitle.innerText = "Listado completo y gestión de la banda";
            dateContainer.classList.add("hidden");
            renderPlantillaTable();
            break;
        case "section-estadisticas":
            pageTitle.innerText = "Estadísticas";
            pageSubtitle.innerText = "Métricas históricas y análisis de asistencia";
            dateContainer.classList.add("hidden");
            renderStatistics();
            break;
        case "section-marchas":
            pageTitle.innerText = `Repertorio (${state.marchas ? state.marchas.length : 0})`;
            pageSubtitle.innerText = "Estado de trabajo y estadísticas de marchas procesionales";
            dateContainer.classList.add("hidden");
            renderMarchasList();
            break;
        case "section-ajustes":
            pageTitle.innerText = "Ajustes";
            pageSubtitle.innerText = "Administración general y copias de seguridad";
            dateContainer.classList.add("hidden");
            
            // Popula claves push si existen
            const savedVapid = localStorage.getItem("yacente_vapid_key") || "";
            const savedServerKey = localStorage.getItem("yacente_fcm_server_key") || "";
            const vapidInput = document.getElementById("push-vapid-key");
            const serverKeyInput = document.getElementById("push-server-key");
            if (vapidInput) vapidInput.value = savedVapid;
            if (serverKeyInput) serverKeyInput.value = savedServerKey;
            break;
        case "section-componente-ficha":
            pageTitle.innerText = "Mi Ficha";
            pageSubtitle.innerText = "Mis estadísticas e insignias personales";
            dateContainer.classList.add("hidden");
            renderComponentFicha();
            break;
        case "section-componente-eventos":
            pageTitle.innerText = "Eventos";
            pageSubtitle.innerText = "Próximos ensayos y actuaciones (Preavisos)";
            dateContainer.classList.add("hidden");
            renderComponentEventos();
            renderComponenteCalendario();
            break;
        case "section-componente-historial":
            pageTitle.innerText = "Mi Historial";
            pageSubtitle.innerText = "Mis asistencias pasadas a ensayos y actuaciones";
            dateContainer.classList.add("hidden");
            renderComponentHistorial();
            break;
        case "section-componente-repertorio":
            pageTitle.innerText = "Repertorio";
            pageSubtitle.innerText = "Mi nivel de dominio de las marchas";
            dateContainer.classList.add("hidden");
            renderComponentRepertorio();
            break;
        case "section-componente-notificaciones":
            pageTitle.innerText = "Centro de Notificaciones";
            pageSubtitle.innerText = "Avisos de nuevos ensayos y actuaciones";
            dateContainer.classList.add("hidden");
            renderComponentNotificationsList();
            break;
    }

    // Actualizar clase activa en la barra de navegación inferior móvil
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
        if (item.getAttribute("data-target") === sectionId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

// ==========================================================================
// SECCIÓN: PASAR LISTA
// ==========================================================================
function renderAttendance() {
    updateSessionBadge();
    const container = document.getElementById("instruments-container");
    container.innerHTML = "";

    if (state.musicians.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p class="text-muted">No hay músicos registrados. Ve a 'Plantilla' para agregarlos.</p>
            </div>
        `;
        updateAttendanceStatsRibbon();
        return;
    }

    const searchQuery = document.getElementById("search-musician").value.toLowerCase();
    const date = state.currentDate;

    const grouped = {};
    SECCIONES_ORDEN.forEach(sec => grouped[sec] = []);
    
    const sessionInfo = state.sessionTypes[date];
    const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
    const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];

    state.musicians.forEach(musician => {
        // Si el ensayo es por voces y el músico no está convocado, lo omitimos
        if (isSpecialRehearsal && !convocated.includes(musician.instrument)) {
            return;
        }

        const matchesSearch = musician.name.toLowerCase().startsWith(searchQuery);
        
        if (matchesSearch) {
            const section = musician.instrument;
            if (!grouped[section]) {
                grouped[section] = [];
            }
            grouped[section].push(musician);
        }
    });

    let hasVisibleMusicians = false;

    SECCIONES_ORDEN.forEach(sectionName => {
        const musiciansInSection = grouped[sectionName];
        if (!musiciansInSection || musiciansInSection.length === 0) return;

        hasVisibleMusicians = true;
        
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "instrument-section";
        sectionDiv.id = `section-instrument-${sectionName.replace(/\s+/g, '-')}`;

        let presents = 0;
        musiciansInSection.forEach(m => {
            if (state.attendance[date] && state.attendance[date][m.id] && state.attendance[date][m.id].status === "present") {
                presents++;
            }
        });
        const sectionRatio = Math.round((presents / musiciansInSection.length) * 100) || 0;

        const headerDiv = document.createElement("div");
        headerDiv.className = "instrument-header";
        headerDiv.innerHTML = `
            <div class="instrument-title">
                <h3>${sectionName}</h3>
                <span class="musician-count-badge">${musiciansInSection.length}</span>
            </div>
            <div class="instrument-header-actions">
                <span class="section-attendance-ratio">${sectionRatio}% Asistencia</span>
                <svg class="chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        `;
        
        headerDiv.addEventListener("click", () => {
            sectionDiv.classList.toggle("collapsed");
        });

        const listDiv = document.createElement("div");
        listDiv.className = "musicians-list";

        musiciansInSection.forEach(musician => {
            const dateAtt = state.attendance[date] || {};
            const attState = dateAtt[musician.id] || { status: "absent", justified: false, reason: "" };
            const cardDiv = document.createElement("div");
            cardDiv.className = `musician-card`;
            cardDiv.id = `card-${musician.id}`;
            
            if (attState.status === "present") {
                cardDiv.classList.add("is-present");
            } else {
                cardDiv.classList.add("is-absent");
                if (attState.justified) {
                    cardDiv.classList.add("is-justified");
                }
            }

            const initials = getInitials(musician.name);
            
            cardDiv.innerHTML = `
                <div class="musician-card-top">
                    <div class="musician-avatar">${initials}</div>
                    <div class="musician-details">
                        <span class="musician-name">${musician.name}</span>
                        <span class="musician-role">${musician.role || 'Músico de fila'}</span>
                    </div>
                </div>
                
                <div class="attendance-actions">
                    <button class="toggle-btn btn-present" data-id="${musician.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Presente
                    </button>
                    <button class="toggle-btn btn-absent" data-id="${musician.id}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Ausente
                    </button>
                </div>
                
                <div class="absence-details-container ${attState.status === 'present' ? 'hidden' : ''} ${attState.status === 'absent' && attState.justified && attState.reason && attState.reason.trim() !== '' ? 'show-summary' : 'show-form'}">
                    <!-- Vista Formulario -->
                    <div class="absence-form-view">
                        <label class="justified-checkbox-row">
                            <input type="checkbox" class="chk-justified" data-id="${musician.id}" ${attState.justified ? 'checked' : ''}>
                            <span>¿Falta Justificada?</span>
                        </label>
                        
                        <div class="reason-input-group ${attState.justified ? '' : 'hidden'}">
                            <label>Motivo de la ausencia</label>
                            <input type="text" class="input-reason" data-id="${musician.id}" placeholder="Escribe el motivo..." value="${attState.reason || ''}">
                            
                            <div class="quick-reasons">
                                <span class="quick-reason-pill ${attState.reason === 'Trabajo' ? 'active' : ''}" data-value="Trabajo">Trabajo</span>
                                <span class="quick-reason-pill ${attState.reason === 'Salud' ? 'active' : ''}" data-value="Salud">Salud</span>
                                <span class="quick-reason-pill ${attState.reason === 'Familia' ? 'active' : ''}" data-value="Familia">Familia</span>
                                <span class="quick-reason-pill ${attState.reason === 'Estudios' ? 'active' : ''}" data-value="Estudios">Estudios</span>
                                <span class="quick-reason-pill ${attState.reason === 'Viaje' ? 'active' : ''}" data-value="Viaje">Viaje</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Vista Resumen -->
                    <div class="absence-summary-view">
                        <span class="summary-badge">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" style="margin-right: 4px; vertical-align: middle;">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Justificada: <strong class="summary-reason-text">${attState.reason || ''}</strong>
                        </span>
                        <button type="button" class="btn-edit-reason">Editar</button>
                    </div>
                </div>
            `;

            cardDiv.querySelector(".btn-present").addEventListener("click", () => {
                updateMusicianAttendance(musician.id, "present");
            });

            cardDiv.querySelector(".btn-absent").addEventListener("click", () => {
                updateMusicianAttendance(musician.id, "absent");
            });

            cardDiv.querySelector(".chk-justified").addEventListener("change", (e) => {
                updateMusicianJustification(musician.id, e.target.checked);
            });

            const inputReason = cardDiv.querySelector(".input-reason");
            inputReason.addEventListener("input", (e) => {
                updateMusicianReason(musician.id, e.target.value);
            });

            inputReason.addEventListener("blur", (e) => {
                const val = e.target.value.trim();
                updateMusicianReason(musician.id, val);
                if (val !== "") {
                    showAbsenceSummary(cardDiv, val);
                }
            });

            inputReason.addEventListener("keyup", (e) => {
                if (e.key === "Enter") {
                    const val = e.target.value.trim();
                    updateMusicianReason(musician.id, val);
                    if (val !== "") {
                        showAbsenceSummary(cardDiv, val);
                        inputReason.blur();
                    }
                }
            });

            cardDiv.querySelectorAll(".quick-reason-pill").forEach(pill => {
                pill.addEventListener("click", () => {
                    const value = pill.getAttribute("data-value");
                    inputReason.value = value;
                    cardDiv.querySelectorAll(".quick-reason-pill").forEach(p => p.classList.remove("active"));
                    pill.classList.add("active");
                    updateMusicianReason(musician.id, value);
                    showAbsenceSummary(cardDiv, value);
                });
            });

            cardDiv.querySelector(".btn-edit-reason").addEventListener("click", () => {
                const container = cardDiv.querySelector(".absence-details-container");
                container.classList.remove("show-summary");
                container.classList.add("show-form");
                inputReason.focus();
            });

            listDiv.appendChild(cardDiv);
        });

        sectionDiv.appendChild(headerDiv);
        sectionDiv.appendChild(listDiv);
        container.appendChild(sectionDiv);
    });

    if (!hasVisibleMusicians) {
        container.innerHTML = `
            <div class="empty-state">
                <p class="text-muted">Ningún músico coincide con la búsqueda.</p>
            </div>
        `;
    }

    updateAttendanceStatsRibbon();
}

function showAbsenceSummary(card, reasonText) {
    const absenceContainer = card.querySelector(".absence-details-container");
    if (!absenceContainer) return;
    
    absenceContainer.querySelector(".summary-reason-text").innerText = reasonText;
    absenceContainer.classList.remove("show-form");
    absenceContainer.classList.add("show-summary");
}

function ensureAttendanceRecord(date, id) {
    if (!state.attendance[date]) {
        state.attendance[date] = {};
    }
    if (!state.attendance[date][id]) {
        state.attendance[date][id] = {
            status: "absent",
            justified: false,
            reason: ""
        };
    }
}

function updateMusicianAttendance(id, status) {
    const date = state.currentDate;
    ensureAttendanceRecord(date, id);
    const record = state.attendance[date][id];
    
    record.status = status;
    if (status === "present") {
        record.justified = false;
        record.reason = "";
    }
    
    dbSaveAttendance(date, id, record);
    
    const card = document.getElementById(`card-${id}`);
    const absenceContainer = card.querySelector(".absence-details-container");
    
    card.classList.remove("is-present", "is-absent", "is-justified");
    
    if (status === "present") {
        card.classList.add("is-present");
        absenceContainer.classList.add("hidden");
    } else {
        card.classList.add("is-absent");
        absenceContainer.classList.remove("hidden");
        card.querySelector(".chk-justified").checked = false;
        card.querySelector(".input-reason").value = "";
        card.querySelectorAll(".quick-reason-pill").forEach(p => p.classList.remove("active"));
        
        // Reset a vista formulario al marcar como ausente de cero
        absenceContainer.classList.remove("show-summary");
        absenceContainer.classList.add("show-form");
        card.querySelector(".reason-input-group").classList.add("hidden");
    }

    updateAttendanceStatsRibbon();
    updateSectionHeaderRatio(id);
}

function updateMusicianJustification(id, isJustified) {
    const date = state.currentDate;
    ensureAttendanceRecord(date, id);
    state.attendance[date][id].justified = isJustified;
    
    dbSaveAttendance(date, id, state.attendance[date][id]);
    
    const card = document.getElementById(`card-${id}`);
    const reasonInputGroup = card.querySelector(".reason-input-group");
    const absenceContainer = card.querySelector(".absence-details-container");
    
    if (isJustified) {
        card.classList.add("is-justified");
        if (reasonInputGroup) reasonInputGroup.classList.remove("hidden");
    } else {
        card.classList.remove("is-justified");
        if (reasonInputGroup) reasonInputGroup.classList.add("hidden");
        
        // Limpiar motivo
        state.attendance[date][id].reason = "";
        dbSaveAttendance(date, id, state.attendance[date][id]);
        card.querySelector(".input-reason").value = "";
        card.querySelectorAll(".quick-reason-pill").forEach(p => p.classList.remove("active"));
        
        // Volver a vista formulario
        if (absenceContainer) {
            absenceContainer.classList.remove("show-summary");
            absenceContainer.classList.add("show-form");
        }
    }
    
    updateAttendanceStatsRibbon();
}

function updateMusicianReason(id, reasonText) {
    const date = state.currentDate;
    ensureAttendanceRecord(date, id);
    state.attendance[date][id].reason = reasonText.trim();
    dbSaveAttendance(date, id, state.attendance[date][id]);
}

function updateSectionHeaderRatio(musicianId) {
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;
    
    const sectionName = musician.instrument;
    const sectionDiv = document.getElementById(`section-instrument-${sectionName.replace(/\s+/g, '-')}`);
    if (!sectionDiv) return;
    
    const date = state.currentDate;
    const musiciansInSection = state.musicians.filter(m => m.instrument === sectionName);
    
    let presents = 0;
    musiciansInSection.forEach(m => {
        if (state.attendance[date] && state.attendance[date][m.id] && state.attendance[date][m.id].status === "present") {
            presents++;
        }
    });
    
    const sectionRatio = Math.round((presents / musiciansInSection.length) * 100) || 0;
    sectionDiv.querySelector(".section-attendance-ratio").innerText = `${sectionRatio}% Asistencia`;
}

function updateAttendanceStatsRibbon() {
    const date = state.currentDate;
    if (!state.attendance[date]) return;

    const sessionInfo = state.sessionTypes[date];
    const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
    const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];

    let total = 0;
    let present = 0;
    let absentJustified = 0;
    let absentUnjustified = 0;

    state.musicians.forEach(m => {
        // Si el ensayo es por voces y el músico no está convocado, omitimos
        if (isSpecialRehearsal && !convocated.includes(m.instrument)) {
            return;
        }
        total++;
        const record = state.attendance[date][m.id];
        if (record) {
            if (record.status === "present") {
                present++;
            } else {
                if (record.justified) {
                    absentJustified++;
                } else {
                    absentUnjustified++;
                }
            }
        }
    });

    const ratio = total > 0 ? Math.round((present / total) * 100) : 0;

    document.getElementById("stats-present").innerText = present;
    document.getElementById("stats-absent-unjustified").innerText = absentUnjustified;
    document.getElementById("stats-absent-justified").innerText = absentJustified;
    document.getElementById("stats-ratio").innerText = `${ratio}%`;
}

// ==========================================================================
// SECCIÓN: HISTORIAL DE ENSAYOS
// ==========================================================================
function renderEnsayosList() {
    const tbody = document.getElementById("ensayos-table-body");
    const emptyState = document.getElementById("ensayos-empty");
    tbody.innerHTML = "";

    const filterYear = document.getElementById("rehearsals-filter-year").value;
    const filterMonth = document.getElementById("rehearsals-filter-month").value;

    const dates = Object.keys(state.attendance)
        .filter(date => {
            const sessionInfo = state.sessionTypes[date];
            if (sessionInfo && sessionInfo.type !== "ensayo") return false;

            const [yyyy, mm, dd] = date.split('-');
            
            // Year filter
            if (filterYear !== "all" && yyyy !== filterYear) return false;
            
            // Month filter
            if (filterMonth !== "all" && (parseInt(mm) - 1).toString() !== filterMonth) return false;

            return true;
        })
        .sort((a, b) => b.localeCompare(a));

    if (dates.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }
    emptyState.classList.add("hidden");

    const MESES = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let currentYearStr = "";
    let currentMonthStr = "";

    dates.forEach(date => {
        const dayRecord = state.attendance[date];
        const [yyyy, mm, dd] = date.split('-');
        const monthName = MESES[parseInt(mm) - 1];

        // Check if we need to print a year header row
        if (yyyy !== currentYearStr) {
            currentYearStr = yyyy;
            currentMonthStr = ""; // reset month when year changes
            const yearHeaderTr = document.createElement("tr");
            yearHeaderTr.innerHTML = `
                <td colspan="7" style="background-color: rgba(212, 175, 55, 0.12); font-weight: 800; color: var(--color-gold); font-size: 0.95rem; padding: 10px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinzel', serif;">
                    Año ${yyyy}
                </td>
            `;
            tbody.appendChild(yearHeaderTr);
        }

        // Check if we need to print a month header row
        if (monthName !== currentMonthStr) {
            currentMonthStr = monthName;
            const monthHeaderTr = document.createElement("tr");
            monthHeaderTr.innerHTML = `
                <td colspan="7" style="background-color: rgba(255, 255, 255, 0.02); font-weight: 700; color: var(--color-gold); font-size: 0.82rem; padding: 6px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 0.5px;">
                    ${monthName}
                </td>
            `;
            tbody.appendChild(monthHeaderTr);
        }
        const sessionInfo = state.sessionTypes[date];
        const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
        const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
        
        let present = 0;
        let absentJustified = 0;
        let absentUnjustified = 0;
        let total = 0;

        state.musicians.forEach(m => {
            // Si el ensayo es por voces y el músico no está convocado, lo omitimos
            if (isSpecialRehearsal && !convocated.includes(m.instrument)) {
                return;
            }
            const r = dayRecord[m.id];
            if (r) {
                total++;
                if (r.status === "present") {
                    present++;
                } else if (r.justified) {
                    absentJustified++;
                } else {
                    absentUnjustified++;
                }
            }
        });

        const ratio = total > 0 ? Math.round((present / total) * 100) : 0;

        let typeLabel = "";
        if (sessionInfo) {
            const sub = sessionInfo.subtype;
            if (sub === "trompetas1") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Trompetas 1ª</span>`;
            } else if (sub === "bajos") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Bajos</span>`;
            } else if (sub === "trompetas2y3") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Trompetas 2ª y 3ª</span>`;
            } else if (sub === "cornetas") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Cornetas</span>`;
            } else if (sub === "percusion") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Percusión</span>`;
            } else if (sub === "voces") {
                typeLabel = `<span class="musician-count-badge" style="background-color: var(--bg-primary); border-color: var(--border-color); font-size: 0.8rem; cursor: help; display: inline-block; max-width: 130px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="Voces convocadas: ${convocated.join(', ')}">Voces (${convocated.length})</span>`;
            } else if (sub === "primeras") {
                typeLabel = `<span class="musician-count-badge" style="background-color: rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.35); color: #9b59b6; font-size: 0.8rem; display: inline-block;">Primeras</span>`;
            } else {
                typeLabel = `<span class="musician-count-badge" style="background-color: var(--bg-primary); border-color: var(--border-color); font-size: 0.8rem; display: inline-block;">General</span>`;
            }
        } else {
            typeLabel = `<span class="musician-count-badge" style="background-color: var(--bg-primary); border-color: var(--border-color); font-size: 0.8rem; display: inline-block;">General</span>`;
        }

        const locationVal = sessionInfo && sessionInfo.location ? sessionInfo.location : "Parking";
        const tr = document.createElement("tr");
        tr.classList.add("clickable-row");
        tr.innerHTML = `
            <td style="white-space: nowrap;">
                <strong>${formatDateShortSpanish(date)}</strong>
            </td>
            <td>
                <span>${locationVal}</span>
            </td>
            <td style="white-space: nowrap;">
                ${typeLabel}
            </td>
            <td>
                <span style="color: var(--color-present); font-weight: 600;">${present}</span> de ${total} músicos
            </td>
            <td style="white-space: nowrap;">
                <div style="color: var(--color-justified); font-weight: 500;">${absentJustified} justificadas</div>
                <div style="color: var(--color-absent); font-weight: 500;">${absentUnjustified} sin justificar</div>
            </td>
            <td>
                <span class="musician-count-badge" style="background-color: var(--color-purple-dark); border-color: var(--border-active); font-size: 0.85rem; padding: 4px 10px;">
                    ${ratio}%
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 6px; align-items: center;">
                    <button class="btn btn-secondary btn-sm edit-rehearsal-btn" data-date="${date}" title="Editar Ensayo" style="padding: 6px; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; border-radius: 4px;">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-action delete delete-rehearsal-btn" data-date="${date}" title="Eliminar Ensayo" style="padding: 4px; display: inline-flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;

        tr.addEventListener("click", () => {
            openRehearsalDetailModal(date);
        });

        tr.querySelector(".edit-rehearsal-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            const rawDate = date.split("_")[0];
            state.currentDate = date;
            document.getElementById("attendance-date").value = rawDate;
            
            initializeAttendanceForDate(date);
            
            document.querySelectorAll(".nav-item").forEach(nav => {
                if (nav.getAttribute("data-target") === "section-pasar-lista") {
                    nav.classList.add("active");
                } else {
                    nav.classList.remove("active");
                }
            });
            renderActiveSection("section-pasar-lista");
        });

        tr.querySelector(".delete-rehearsal-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`¿Estás seguro de que quieres eliminar por completo el ensayo del ${formatDateSpanish(date)}? Esta acción borrará el registro de asistencia.`)) {
                delete state.attendance[date];
                delete state.sessionTypes[date];
                dbDeleteSession(date);
                renderEnsayosList();
                renderStatistics();
                renderCalendar();
                showToast(`Ensayo del ${formatDateSpanish(date)} eliminado`, "error");
            }
        });

        tbody.appendChild(tr);
    });
}

function openRehearsalDetailModal(date) {
    const modal = document.getElementById("modal-rehearsal-detail");
    if (!modal) return;

    state.activeDetailDate = date;

    const btnDelete = document.getElementById("btn-delete-rehearsal-from-detail");
    if (btnDelete) {
        const rawDate = date.split("_")[0];
        const today = new Date().toISOString().split("T")[0];
        if (rawDate >= today) {
            btnDelete.classList.remove("hidden");
        } else {
            btnDelete.classList.add("hidden");
        }
    }

    // Safety guards on global state objects
    const dayRecord = (state && state.attendance) ? state.attendance[date] : null;
    const sessionInfo = (state && state.sessionTypes) ? state.sessionTypes[date] : null;
    const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
    const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
    
    // Safety guard on playedMarchas
    const playedTodayIds = (state && state.playedMarchas && state.playedMarchas[date]) || [];

    // Title & subtitle
    document.getElementById("rehearsal-detail-title").innerText = `Ensayo del ${formatDateSpanish(date)}`;
    let subtypeText = "Ensayo General";
    if (isSpecialRehearsal) {
        subtypeText = `Ensayo por Voces (Convocadas: ${convocated.join(", ")})`;
    }
    const locationVal = sessionInfo && sessionInfo.location ? sessionInfo.location : "Parking";
    document.getElementById("rehearsal-detail-subtitle").innerText = `${subtypeText} | Lugar: ${locationVal}`;

    // Marchas
    const marchasContainer = document.getElementById("rehearsal-detail-marchas");
    marchasContainer.innerHTML = "";
    if (playedTodayIds.length === 0) {
        marchasContainer.innerHTML = `<span class="text-muted" style="font-size: 0.85rem; font-style: italic;">Ninguna marcha ensayada en esta fecha.</span>`;
    } else {
        playedTodayIds.forEach(mId => {
            const marchasArray = (state && state.marchas) || [];
            const m = marchasArray.find(item => item.id === mId);
            const mTitle = m ? m.title : `Marcha (${mId})`;
            const badge = document.createElement("span");
            badge.className = "marcha-tag";
            badge.style.fontSize = "0.75rem";
            badge.style.padding = "4px 10px";
            badge.innerText = mTitle;
            marchasContainer.appendChild(badge);
        });
    }

    // Attendance calculation
    let presentCount = 0;
    let justifiedCount = 0;
    let absentCount = 0;
    let totalCount = 0;

    const presentsList = document.getElementById("rehearsal-detail-presentes-list");
    const justifiedList = document.getElementById("rehearsal-detail-justificados-list");
    const absentList = document.getElementById("rehearsal-detail-sinjustificar-list");

    presentsList.innerHTML = "";
    justifiedList.innerHTML = "";
    absentList.innerHTML = "";

    // Categorize and filter musicians
    const listPresent = [];
    const listJustified = [];
    const listAbsent = [];

    const musiciansList = (state && state.musicians) || [];
    musiciansList.forEach(m => {
        // Skip if special voice rehearsal and musician not convocated
        if (isSpecialRehearsal && !convocated.includes(m.instrument)) {
            return;
        }

        const r = dayRecord ? dayRecord[m.id] : null;
        if (!r) return;

        totalCount++;

        if (r.status === "present") {
            presentCount++;
            listPresent.push({ musician: m, record: r });
        } else if (r.justified) {
            justifiedCount++;
            listJustified.push({ musician: m, record: r });
        } else {
            absentCount++;
            listAbsent.push({ musician: m, record: r });
        }
    });

    // Ratio
    const ratio = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    // Metrics populating
    document.getElementById("rehearsal-detail-present-count").innerText = presentCount;
    document.getElementById("badge-detail-presentes-count").innerText = presentCount;

    document.getElementById("rehearsal-detail-justified-count").innerText = justifiedCount;
    document.getElementById("badge-detail-justificados-count").innerText = justifiedCount;

    document.getElementById("rehearsal-detail-absent-count").innerText = absentCount;
    document.getElementById("badge-detail-sinjustificar-count").innerText = absentCount;

    document.getElementById("rehearsal-detail-ratio").innerText = `${ratio}%`;

    // Render lists grouped by voice
    const hasPresents = renderGroupedList(presentsList, listPresent);
    const hasJustified = renderGroupedList(justifiedList, listJustified);
    const hasAbsents = renderGroupedList(absentList, listAbsent);

    // Show empty messages if any list is empty
    if (!hasPresents) {
        presentsList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ningún músico presente.</td></tr>`;
    }
    if (!hasJustified) {
        justifiedList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ninguna ausencia justificada.</td></tr>`;
    }
    if (!hasAbsents) {
        absentList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ninguna ausencia sin justificar.</td></tr>`;
    }

    // Open modal
    modal.classList.add("active");
}

function renderGroupedList(container, itemsList) {
    container.innerHTML = "";
    if (itemsList.length === 0) {
        return false;
    }

    // Group by voice
    const grouped = {};
    SECCIONES_ORDEN.forEach(v => grouped[v] = []);
    
    itemsList.forEach(item => {
        const m = item.musician;
        let voice = m.instrument;
        if (!SECCIONES_ORDEN.includes(voice)) {
            voice = "Otros / Varios";
        }
        if (!grouped[voice]) {
            grouped[voice] = [];
        }
        grouped[voice].push(item);
    });

    const orderedVoices = [...SECCIONES_ORDEN];
    if (grouped["Otros / Varios"] && grouped["Otros / Varios"].length > 0) {
        orderedVoices.push("Otros / Varios");
    }

    let hasContent = false;
    orderedVoices.forEach(voice => {
        const items = grouped[voice] || [];
        if (items.length === 0) return;
        hasContent = true;

        // Sort alphabetically by name
        items.sort((a, b) => a.musician.name.localeCompare(b.musician.name));

        const voiceHeaderTr = document.createElement("tr");
        voiceHeaderTr.innerHTML = `
            <td colspan="2" style="background-color: rgba(212, 175, 55, 0.05); font-weight: 700; color: var(--color-gold); font-size: 0.8rem; padding: 4px 8px; border-bottom: 1px solid var(--border-color);">
                ${voice} (${items.length})
            </td>
        `;
        container.appendChild(voiceHeaderTr);

        items.forEach(item => {
            const m = item.musician;
            const r = item.record;
            const tr = document.createElement("tr");
            
            if (r.status === "present") {
                tr.innerHTML = `
                    <td style="padding: 6px 12px; border-bottom: 1px solid var(--border-color); font-weight: 500;">${m.name}</td>
                    <td style="text-align: right; padding: 6px 12px; border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 0.8rem;">Presente</td>
                `;
            } else if (r.justified) {
                const justifText = r.justification || 'Sin justificación';
                const truncatedJustif = justifText.length > 50 ? justifText.substring(0, 50) + '...' : justifText;
                tr.innerHTML = `
                    <td style="padding: 6px 12px; border-bottom: 1px solid var(--border-color);">
                        <div style="font-weight: 500;">${m.name}</div>
                        <div class="text-muted" style="font-size: 0.75rem; margin-top: 2px; font-style: italic;" title="${justifText}">
                            Motivo: ${truncatedJustif}
                        </div>
                    </td>
                    <td style="text-align: right; padding: 6px 12px; border-bottom: 1px solid var(--border-color); color: var(--color-justified); font-weight: 600; font-size: 0.8rem;">Justificada</td>
                `;
            } else {
                tr.innerHTML = `
                    <td style="padding: 6px 12px; border-bottom: 1px solid var(--border-color); font-weight: 500;">${m.name}</td>
                    <td style="text-align: right; padding: 6px 12px; border-bottom: 1px solid var(--border-color); color: var(--color-absent); font-weight: 600; font-size: 0.8rem;">Ausente</td>
                `;
            }
            container.appendChild(tr);
        });
    });

    return hasContent;
}

// ==========================================================================
// SECCIÓN: HISTORIAL DE ACTUACIONES
// ==========================================================================
function renderActuacionesList() {
    const tbody = document.getElementById("actuaciones-table-body");
    const emptyState = document.getElementById("actuaciones-empty");
    tbody.innerHTML = "";

    const filterYear = document.getElementById("actuaciones-filter-year").value;
    const filterMonth = document.getElementById("actuaciones-filter-month").value;

    const dates = Object.keys(state.attendance)
        .filter(date => {
            const sessionInfo = state.sessionTypes[date];
            if (!sessionInfo || sessionInfo.type !== "actuacion") return false;

            const [yyyy, mm, dd] = date.split('-');
            
            // Year filter
            if (filterYear !== "all" && yyyy !== filterYear) return false;
            
            // Month filter
            if (filterMonth !== "all" && (parseInt(mm) - 1).toString() !== filterMonth) return false;

            return true;
        })
        .sort((a, b) => b.localeCompare(a));

    if (dates.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }
    emptyState.classList.add("hidden");

    const MESES = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    let currentYearStr = "";
    let currentMonthStr = "";

    dates.forEach(date => {
        const dayRecord = state.attendance[date];
        const [yyyy, mm, dd] = date.split('-');
        const monthName = MESES[parseInt(mm) - 1];

        // Check if we need to print a year header row
        if (yyyy !== currentYearStr) {
            currentYearStr = yyyy;
            currentMonthStr = ""; // reset month when year changes
            const yearHeaderTr = document.createElement("tr");
            yearHeaderTr.innerHTML = `
                <td colspan="6" style="background-color: rgba(212, 175, 55, 0.12); font-weight: 800; color: var(--color-gold); font-size: 0.95rem; padding: 10px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinzel', serif;">
                    Año ${yyyy}
                </td>
            `;
            tbody.appendChild(yearHeaderTr);
        }

        // Check if we need to print a month header row
        if (monthName !== currentMonthStr) {
            currentMonthStr = monthName;
            const monthHeaderTr = document.createElement("tr");
            monthHeaderTr.innerHTML = `
                <td colspan="6" style="background-color: rgba(255, 255, 255, 0.02); font-weight: 700; color: var(--color-gold); font-size: 0.82rem; padding: 6px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 0.5px;">
                    ${monthName}
                </td>
            `;
            tbody.appendChild(monthHeaderTr);
        }
        const sessionInfo = state.sessionTypes[date];
        
        let present = 0;
        let absentJustified = 0;
        let absentUnjustified = 0;
        let total = 0;

        state.musicians.forEach(m => {
            const r = dayRecord[m.id];
            if (r) {
                total++;
                if (r.status === "present") {
                    present++;
                } else if (r.justified) {
                    absentJustified++;
                } else {
                    absentUnjustified++;
                }
            }
        });

        const ratio = total > 0 ? Math.round((present / total) * 100) : 0;

        const tr = document.createElement("tr");
        tr.classList.add("clickable-row");
        tr.innerHTML = `
            <td style="white-space: nowrap;">
                <strong>${formatDateShortSpanish(date)}</strong>
            </td>
            <td>
                <span style="font-weight: 600; color: var(--color-gold);">${sessionInfo.name || "Sin nombre"}</span>
            </td>
            <td>
                <span style="color: var(--color-present); font-weight: 600;">${present}</span> de ${total} músicos
            </td>
            <td style="white-space: nowrap;">
                <div style="color: var(--color-justified); font-weight: 500;">${absentJustified} justificadas</div>
                <div style="color: var(--color-absent); font-weight: 500;">${absentUnjustified} sin justificar</div>
            </td>
            <td>
                <span class="musician-count-badge" style="background-color: var(--color-purple-dark); border-color: var(--border-active); font-size: 0.85rem; padding: 4px 10px;">
                    ${ratio}%
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 6px; align-items: center;">
                    <button class="btn btn-secondary btn-sm edit-actuacion-btn" data-date="${date}" title="Editar Actuación" style="padding: 6px; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; border-radius: 4px;">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-action delete delete-actuacion-btn" data-date="${date}" title="Eliminar Actuación" style="padding: 4px; display: inline-flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;

        tr.addEventListener("click", () => {
            openActuacionDetailModal(date);
        });

        tr.querySelector(".edit-actuacion-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            const rawDate = date.split("_")[0];
            state.currentDate = date;
            document.getElementById("attendance-date").value = rawDate;
            
            initializeAttendanceForDate(date);
            
            document.querySelectorAll(".nav-item").forEach(nav => {
                if (nav.getAttribute("data-target") === "section-pasar-lista") {
                    nav.classList.add("active");
                } else {
                    nav.classList.remove("active");
                }
            });
            renderActiveSection("section-pasar-lista");
        });

        tr.querySelector(".delete-actuacion-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            const actuacionName = sessionInfo.name || formatDateSpanish(date);
            if (confirm(`¿Estás seguro de que quieres eliminar la actuación "${actuacionName}" del ${formatDateSpanish(date)}? Esta acción borrará el registro de asistencia.`)) {
                delete state.attendance[date];
                delete state.sessionTypes[date];
                dbDeleteSession(date);
                renderActuacionesList();
                renderStatistics();
                renderCalendar();
                showToast(`Actuación "${actuacionName}" eliminada`, "error");
            }
        });

        tbody.appendChild(tr);
    });
}

function openActuacionDetailModal(date) {
    const modal = document.getElementById("modal-actuacion-detail");
    if (!modal) return;

    state.activeDetailDate = date;

    // Safety guards on global state objects
    const dayRecord = (state && state.attendance) ? state.attendance[date] : null;
    const sessionInfo = (state && state.sessionTypes) ? state.sessionTypes[date] : null;
    const playedTodayIds = (state && state.playedMarchas && state.playedMarchas[date]) || [];

    const actuacionName = sessionInfo ? (sessionInfo.name || "Actuación") : "Actuación";

    // Title & subtitle
    document.getElementById("actuacion-detail-title").innerText = actuacionName;
    document.getElementById("actuacion-detail-subtitle").innerText = formatDateSpanish(date);

    // Marchas
    const marchasContainer = document.getElementById("actuacion-detail-marchas");
    marchasContainer.innerHTML = "";
    if (playedTodayIds.length === 0) {
        marchasContainer.innerHTML = `<span class="text-muted" style="font-size: 0.85rem; font-style: italic;">Ninguna marcha registrada en esta actuación.</span>`;
    } else {
        playedTodayIds.forEach(mId => {
            const marchasArray = (state && state.marchas) || [];
            const m = marchasArray.find(item => item.id === mId);
            const mTitle = m ? m.title : `Marcha (${mId})`;
            const badge = document.createElement("span");
            badge.className = "marcha-tag";
            badge.style.fontSize = "0.75rem";
            badge.style.padding = "4px 10px";
            badge.innerText = mTitle;
            marchasContainer.appendChild(badge);
        });
    }

    // Attendance calculation
    let presentCount = 0;
    let justifiedCount = 0;
    let absentCount = 0;
    let totalCount = 0;

    const presentsList = document.getElementById("actuacion-detail-presentes-list");
    const justifiedList = document.getElementById("actuacion-detail-justificados-list");
    const absentList = document.getElementById("actuacion-detail-sinjustificar-list");

    presentsList.innerHTML = "";
    justifiedList.innerHTML = "";
    absentList.innerHTML = "";

    // Categorize and filter musicians
    const listPresent = [];
    const listJustified = [];
    const listAbsent = [];

    const musiciansList = (state && state.musicians) || [];
    musiciansList.forEach(m => {
        const r = dayRecord ? dayRecord[m.id] : null;
        if (!r) return;

        totalCount++;

        if (r.status === "present") {
            presentCount++;
            listPresent.push({ musician: m, record: r });
        } else if (r.justified) {
            justifiedCount++;
            listJustified.push({ musician: m, record: r });
        } else {
            absentCount++;
            listAbsent.push({ musician: m, record: r });
        }
    });

    // Ratio
    const ratio = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    // Metrics populating
    document.getElementById("actuacion-detail-present-count").innerText = presentCount;
    document.getElementById("badge-actuacion-detail-presentes-count").innerText = presentCount;

    document.getElementById("actuacion-detail-justified-count").innerText = justifiedCount;
    document.getElementById("badge-actuacion-detail-justificados-count").innerText = justifiedCount;

    document.getElementById("actuacion-detail-absent-count").innerText = absentCount;
    document.getElementById("badge-actuacion-detail-sinjustificar-count").innerText = absentCount;

    document.getElementById("actuacion-detail-ratio").innerText = `${ratio}%`;

    // Render lists grouped by voice
    const hasPresents = renderGroupedList(presentsList, listPresent);
    const hasJustified = renderGroupedList(justifiedList, listJustified);
    const hasAbsents = renderGroupedList(absentList, listAbsent);

    // Show empty messages if any list is empty
    if (!hasPresents) {
        presentsList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ningún músico presente.</td></tr>`;
    }
    if (!hasJustified) {
        justifiedList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ninguna ausencia justificada.</td></tr>`;
    }
    if (!hasAbsents) {
        absentList.innerHTML = `<tr><td colspan="2" class="text-center text-muted" style="padding: 15px; font-style: italic;">Ninguna ausencia sin justificar.</td></tr>`;
    }

    // Open modal
    modal.classList.add("active");
}

// ==========================================================================
// SECCIÓN: GESTIÓN DE PLANTILLA (GROUPED BY VOICE)
// ==========================================================================
function renderPlantillaTable() {
    const activeSection = document.getElementById("section-plantilla");
    if (activeSection && activeSection.classList.contains("active")) {
        const pageTitle = document.getElementById("page-title");
        if (pageTitle) {
            pageTitle.innerText = `Plantilla (${state.musicians.length})`;
        }
    }

    const container = document.getElementById("plantilla-grouped-container");
    container.innerHTML = "";

    if (state.musicians.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p class="text-muted">No hay músicos registrados en la plantilla. Añade uno para comenzar.</p>
            </div>
        `;
        return;
    }

    const query = document.getElementById("search-plantilla").value.toLowerCase();

    // Agrupar músicos por voz
    const grouped = {};
    SECCIONES_ORDEN.forEach(voice => grouped[voice] = []);
    
    // Si hay voces auxiliares no mapeadas, se ponen en 'Otros'
    state.musicians.forEach(musician => {
        const matchesSearch = musician.name.toLowerCase().startsWith(query);
        
        if (matchesSearch) {
            let voice = musician.instrument;
            if (!SECCIONES_ORDEN.includes(voice)) {
                voice = "Otros / Varios";
            }
            if (!grouped[voice]) {
                grouped[voice] = [];
            }
            grouped[voice].push(musician);
        }
    });

    let totalVisible = 0;

    // Crear un bloque visual para cada voz que tenga integrantes
    const fullOrderList = [...SECCIONES_ORDEN];
    if (grouped["Otros / Varios"] && grouped["Otros / Varios"].length > 0) {
        fullOrderList.push("Otros / Varios");
    }

    fullOrderList.forEach(voiceName => {
        const musiciansInVoice = grouped[voiceName];
        if (!musiciansInVoice || musiciansInVoice.length === 0) return;

        totalVisible += musiciansInVoice.length;

        // Ordenar alfabéticamente por nombre de músico dentro de la voz
        musiciansInVoice.sort((a, b) => a.name.localeCompare(b.name));

        const groupSection = document.createElement("div");
        groupSection.className = "plantilla-group-section";
        
        groupSection.innerHTML = `
            <div class="plantilla-group-header">
                <h4>${voiceName}</h4>
                <span class="plantilla-group-count">${musiciansInVoice.length} ${musiciansInVoice.length === 1 ? 'músico' : 'músicos'}</span>
            </div>
            
            <div class="card-table plantilla-group-table-card">
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th style="text-align: center; width: 100px;">Acceso PIN</th>
                                <th style="width: 100px; text-align: center;">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Dynamic rows -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        const tbody = groupSection.querySelector("tbody");

        musiciansInVoice.forEach(musician => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">
                    <div class="musician-name-clickable" style="font-weight: 600; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: block;" title="${musician.name}">${musician.name}</div>
                </td>
                <td style="white-space: nowrap;">
                    <span class="text-muted" title="${musician.role || 'Músico de fila'}">${musician.role || 'Músico de fila'}</span>
                </td>
                <td style="white-space: nowrap; text-align: center; width: 100px;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; vertical-align: middle;">
                        <span class="pin-status-icon" title="${musician.pin ? 'PIN configurado' : 'Sin PIN (Auto-registro activo)'}">
                            ${musician.pin ? '🔒' : '🔓'}
                        </span>
                        ${musician.pin ? `
                            <button class="btn-reset-pin-row" data-id="${musician.id}" title="Borrar PIN (Restablecer)" style="margin: 0; padding: 2px;">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
                <td style="white-space: nowrap; width: 100px; text-align: center;">
                    <div style="display: inline-flex; gap: 8px; justify-content: center; align-items: center; vertical-align: middle;">
                        <button class="btn-action edit-musician-btn" data-id="${musician.id}" title="Editar">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-musician-btn" data-id="${musician.id}" title="Eliminar">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            `;

            tr.querySelector(".musician-name-clickable").addEventListener("click", () => {
                openMusicianDetailStats(musician.id);
            });

            tr.querySelector(".edit-musician-btn").addEventListener("click", () => {
                openEditMusicianModal(musician.id);
            });

            tr.querySelector(".delete-musician-btn").addEventListener("click", () => {
                deleteMusician(musician.id);
            });

            const resetPinBtn = tr.querySelector(".btn-reset-pin-row");
            if (resetPinBtn) {
                resetPinBtn.addEventListener("click", () => {
                    if (confirm(`¿Estás seguro de que quieres restablecer el PIN de ${musician.name}? Volverá a registrarse con el siguiente PIN que introduzca.`)) {
                        musician.pin = "";
                        saveStateToLocalStorage();
                        
                        if (isCloudActive()) {
                            const db = firebase.firestore();
                            db.collection("musicians").doc(musician.id).update({ pin: "" })
                                .then(() => {
                                    showToast(`PIN de ${musician.name} borrado con éxito`, "success");
                                    renderPlantillaTable();
                                })
                                .catch(err => {
                                    console.error("Error clearing PIN in cloud:", err);
                                    showToast("PIN borrado localmente (offline)", "success");
                                    renderPlantillaTable();
                                });
                        } else {
                            showToast("PIN borrado localmente", "success");
                            renderPlantillaTable();
                        }
                    }
                });
            }

            tbody.appendChild(tr);
        });

        container.appendChild(groupSection);
    });

    if (totalVisible === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p class="text-muted">Ningún músico coincide con el término de búsqueda.</p>
            </div>
        `;
    }
}

function openEditMusicianModal(id) {
    const m = state.musicians.find(mus => mus.id === id);
    if (!m) return;

    document.getElementById("musician-id").value = m.id;
    document.getElementById("musician-name").value = m.name;
    document.getElementById("musician-instrument").value = m.instrument;
    const roleVal = m.role || "Músico";
    const roleSelect = document.getElementById("musician-role");
    const hasOption = Array.from(roleSelect.options).some(opt => opt.value === roleVal);
    roleSelect.value = hasOption ? roleVal : "Músico";
    

    
    document.getElementById("modal-title").innerText = "Editar Músico";
    document.getElementById("modal-musician").classList.add("active");
}

function deleteMusician(id) {
    const m = state.musicians.find(mus => mus.id === id);
    if (!m) return;

    if (confirm(`¿Dar de baja a ${m.name}? Sus datos de asistencia se mantendrán en el historial.`)) {
        state.musicians = state.musicians.filter(mus => mus.id !== id);
        if (state.attendance[state.currentDate] && state.attendance[state.currentDate][id]) {
            delete state.attendance[state.currentDate][id];
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("attendance").doc(state.currentDate).set({
                    [id]: firebase.firestore.FieldValue.delete()
                }, { merge: true }).catch(err => console.error("Error al borrar asistencia en nube:", err));
            }
        }
        dbDeleteMusician(id);
        renderPlantillaTable();
        renderAttendance();
        renderStatistics();
        showToast(`Baja registrada: ${m.name}`, "error");
    }
}

// ==========================================================================
// SECCIÓN: ESTADÍSTICAS AVANZADAS
// ==========================================================================
function renderStatistics() {
    const yearFilter = document.getElementById("filter-year").value;
    const monthFilter = document.getElementById("filter-month").value;
    const typeFilter = document.getElementById("filter-type").value;

    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const allDates = Object.keys(state.attendance);
    const filteredDates = allDates.filter(dateStr => {
        if (dateStr > todayStr) return false; // Excluir sesiones futuras de las estadísticas

        const dateObj = new Date(dateStr.replace(/-/g, "/"));
        const year = dateObj.getFullYear().toString();
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || year === yearFilter;
        const monthMatches = monthFilter === "all" || month === monthFilter;
        const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
        const typeMatches = typeFilter === "all" || sessionType === typeFilter;

        return yearMatches && monthMatches && typeMatches;
    });

    const totalDaysFiltered = filteredDates.length;
    document.getElementById("stats-total-days").innerText = totalDaysFiltered;

    if (totalDaysFiltered === 0 || state.musicians.length === 0) {
        document.getElementById("stats-avg-attendance").innerText = "0%";
        document.getElementById("stats-best-section").innerText = "-";
        document.getElementById("bar-chart-container").innerHTML = "<p class='text-muted text-center'>No hay sesiones registradas en este período.</p>";
        const compContainer = document.getElementById("stats-components-container");
        if (compContainer) compContainer.innerHTML = "";
        const streakContainer = document.getElementById("stats-streak-container");
        if (streakContainer) streakContainer.innerHTML = "";
        document.getElementById("alerts-table-body").innerHTML = "<tr><td colspan='5' class='text-center text-muted'>Sin alertas de asistencia en este período.</td></tr>";
        renderStatsMarchasTop10([]);
        renderStatsStreaks([]);
        renderStatsMarchasOlvidadas();
        renderGeneralOverviewChart();
        return;
    }

    let totalPresenceCheck = 0;
    let totalPresentsCount = 0;

    const sectionStats = {};
    SECCIONES_ORDEN.forEach(sec => {
        sectionStats[sec] = { totalCheck: 0, presents: 0 };
    });

    const musicianStats = {};
    state.musicians.forEach(m => {
        musicianStats[m.id] = { id: m.id, name: m.name, instrument: m.instrument, role: m.role, total: 0, absent: 0, unjustified: 0, lastReason: "" };
    });

    filteredDates.forEach(date => {
        const dayRecord = state.attendance[date];
        
        state.musicians.forEach(m => {
            const record = dayRecord[m.id];
            if (!record) return;

            totalPresenceCheck++;
            musicianStats[m.id].total++;

            if (record.status === "present") {
                totalPresentsCount++;
                if (sectionStats[m.instrument]) {
                    sectionStats[m.instrument].presents++;
                }
            } else {
                musicianStats[m.id].absent++;
                if (!record.justified) {
                    musicianStats[m.id].unjustified++;
                }
                if (record.reason) {
                    musicianStats[m.id].lastReason = record.reason;
                }
            }

            if (sectionStats[m.instrument]) {
                sectionStats[m.instrument].totalCheck++;
            }
        });
    });

    const avgAttendance = Math.round((totalPresentsCount / totalPresenceCheck) * 100) || 0;
    document.getElementById("stats-avg-attendance").innerText = `${avgAttendance}%`;

    let bestSectionName = "-";
    let bestRatio = -1;

    Object.keys(sectionStats).forEach(sec => {
        if (sec === "Dirección") return; // Excluir Dirección de la sección líder
        const stats = sectionStats[sec];
        if (stats.totalCheck === 0) return;
        const ratio = (stats.presents / stats.totalCheck);
        if (ratio > bestRatio) {
            bestRatio = ratio;
            bestSectionName = sec;
        }
    });
    document.getElementById("stats-best-section").innerText = bestSectionName;

    // Gráfico de Barras: Secciones
    const barContainer = document.getElementById("bar-chart-container");
    barContainer.innerHTML = "";
    
    const activeSections = Object.keys(sectionStats).filter(sec => sectionStats[sec].totalCheck > 0);
    if (activeSections.length > 0) {
        activeSections.sort((a, b) => {
            const ratioA = sectionStats[a].presents / sectionStats[a].totalCheck;
            const ratioB = sectionStats[b].presents / sectionStats[b].totalCheck;
            return ratioB - ratioA;
        });

        activeSections.forEach(secName => {
            const stats = sectionStats[secName];
            const ratioPercent = Math.round((stats.presents / stats.totalCheck) * 100);

            let numColor = "var(--color-present)";
            if (ratioPercent < 80) numColor = "var(--color-justified)";
            if (ratioPercent < 50) numColor = "var(--color-absent)";

            const row = document.createElement("div");
            row.className = "chart-bar-row";
            row.style.cursor = "pointer";
            row.title = "Clic para ver estadísticas de la sección";
            row.addEventListener("click", () => openVoiceDetailStats(secName));
            row.innerHTML = `
                <div class="chart-bar-info">
                    <span class="chart-bar-label">${secName}</span>
                    <span class="chart-bar-value" style="color: ${numColor}; font-weight: 700;">${ratioPercent}%</span>
                </div>
                <div class="chart-bar-outer">
                    <div class="chart-bar-inner" style="width: 0%"></div>
                </div>
            `;
            barContainer.appendChild(row);
            
            setTimeout(() => {
                const bar = row.querySelector(".chart-bar-inner");
                if (bar) bar.style.width = `${ratioPercent}%`;
            }, 100);
        });
    }

    window.lastMusicianStats = musicianStats;
    window.lastTotalDaysFiltered = totalDaysFiltered;

    renderComponentsCircularStats();

    // Alertas de Asistencia (Asistencia menor al 50% en el período filtrado)
    const alertBody = document.getElementById("alerts-table-body");
    alertBody.innerHTML = "";

    const flaggedMusicians = Object.keys(musicianStats)
        .map(id => {
            const stat = musicianStats[id];
            const presents = stat.total - stat.absent;
            const pct = stat.total > 0 ? Math.round((presents / stat.total) * 100) : 100;
            return { ...stat, pct };
        })
        .filter(stat => stat.total > 0 && stat.pct < 50)
        .sort((a, b) => a.pct - b.pct);

    if (flaggedMusicians.length > 0) {
        flaggedMusicians.forEach(stat => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${stat.name}</strong></td>
                <td><span class="musician-count-badge" style="background-color: var(--bg-primary);">${stat.instrument}</span></td>
                <td><span style="color: var(--color-absent); font-weight: bold;">${stat.pct}%</span></td>
                <td><span style="font-weight: 600;">${stat.unjustified}</span></td>
                <td class="text-muted italic">"${stat.lastReason || 'Sin justificar'}"</td>
            `;
            alertBody.appendChild(tr);
        });
    } else {
        alertBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay alertas de asistencia (asistencia < 50%) en el período seleccionado.
                </td>
            </tr>
        `;
    }

    renderStatsMarchasTop10(filteredDates);
    renderStatsStreaks(filteredDates);
    renderStatsMarchasOlvidadas();
    renderGeneralOverviewChart();
}

function renderStatsMarchasTop10(filteredDates) {
    const playCounts = {};
    if (state.playedMarchas) {
        filteredDates.forEach(date => {
            const list = state.playedMarchas[date] || [];
            list.forEach(mId => {
                playCounts[mId] = (playCounts[mId] || 0) + 1;
            });
        });
    }

    const topMarchas = (state.marchas || [])
        .map(m => ({
            ...m,
            count: playCounts[m.id] || 0
        }))
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, 'es'))
        .slice(0, 10);

    const tbody = document.getElementById("stats-marchas-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (topMarchas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay marchas registradas en los ensayos de este período.
                </td>
            </tr>
        `;
    } else {
        topMarchas.forEach((m, idx) => {
            let statusLabel = "";
            if (m.status === "green") {
                statusLabel = `<span style="color: var(--color-present); font-weight: 600;">🟢 Bien</span>`;
            } else if (m.status === "yellow") {
                statusLabel = `<span style="color: var(--color-justified); font-weight: 600;">🟡 Proceso</span>`;
            } else {
                statusLabel = `<span style="color: var(--color-absent); font-weight: 600;">🔴 Trabajar</span>`;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>#${idx + 1}</strong></td>
                <td><strong>${m.title}</strong></td>
                <td style="font-weight: bold; color: var(--color-gold); font-size: 0.92rem; padding-left: 20px;">${m.count}</td>
                <td><span class="musician-count-badge" style="background-color: var(--bg-primary);">Nivel ${m.difficulty || 1}</span></td>
                <td>${statusLabel}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

function renderStatsMarchasOlvidadas() {
    const tbody = document.getElementById("stats-marchas-olvidadas-table-body");
    if (!tbody) return;
    tbody.innerHTML = "";

    const lastRehearsalDates = {};
    
    if (state.playedMarchas) {
        Object.keys(state.playedMarchas).forEach(sessionKey => {
            const sessionInfo = state.sessionTypes[sessionKey];
            const isRehearsal = !sessionInfo || sessionInfo.type === "ensayo";
            if (!isRehearsal) return;
            
            const rawDate = sessionKey.split("_")[0];
            const list = state.playedMarchas[sessionKey] || [];
            
            list.forEach(mId => {
                if (!lastRehearsalDates[mId] || rawDate > lastRehearsalDates[mId]) {
                    lastRehearsalDates[mId] = rawDate;
                }
            });
        });
    }

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const olvidadas = (state.marchas || []).map(m => {
        const lastDateStr = lastRehearsalDates[m.id];
        let days = Infinity;
        let daysLabel = "Nunca";
        
        if (lastDateStr) {
            const parts = lastDateStr.split("-");
            const lastDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            const diffTime = todayStart - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            days = Math.max(0, diffDays);
            daysLabel = `${days} ${days === 1 ? 'día' : 'días'}`;
        }
        
        return {
            ...m,
            days: days,
            daysLabel: daysLabel
        };
    });

    olvidadas.sort((a, b) => {
        if (a.days === Infinity && b.days !== Infinity) return -1;
        if (a.days !== Infinity && b.days === Infinity) return 1;
        if (a.days === Infinity && b.days === Infinity) {
            return a.title.localeCompare(b.title, 'es');
        }
        return b.days - a.days || a.title.localeCompare(b.title, 'es');
    });

    const top10 = olvidadas.slice(0, 10);

    if (top10.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay marchas registradas en la aplicación.
                </td>
            </tr>
        `;
        return;
    }

    top10.forEach((m, idx) => {
        let statusLabel = "";
        if (m.status === "green") {
            statusLabel = `<span style="color: var(--color-present); font-weight: 600;">🟢 Bien</span>`;
        } else if (m.status === "yellow") {
            statusLabel = `<span style="color: var(--color-justified); font-weight: 600;">🟡 Proceso</span>`;
        } else {
            statusLabel = `<span style="color: var(--color-absent); font-weight: 600;">🔴 Trabajar</span>`;
        }

        const daysColor = m.days === Infinity ? "var(--color-absent)" : (m.days > 30 ? "var(--color-justified)" : "var(--text-secondary)");

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td><strong>${m.title}</strong></td>
            <td style="font-weight: bold; color: ${daysColor}; font-size: 0.92rem;">${m.daysLabel}</td>
            <td><span class="musician-count-badge" style="background-color: var(--bg-primary);">Nivel ${m.difficulty || 1}</span></td>
            <td>${statusLabel}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Renderiza la racha de asistencia de los 3 componentes que llevan más ensayos seguidos
function renderStatsStreaks(filteredDates) {
    const container = document.getElementById("stats-streak-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    if (state.musicians.length === 0 || filteredDates.length === 0) {
        container.innerHTML = "<p class='text-muted text-center' style='grid-column: 1/-1;'>No hay datos para calcular rachas en este período.</p>";
        return;
    }
    
    // 1. Filtrar solo fechas que sean ensayos (type === "ensayo")
    const rehearsalDates = filteredDates.filter(date => {
        const session = state.sessionTypes[date];
        return !session || session.type === "ensayo";
    });
    
    // 2. Ordenar de más reciente (nueva) a más antigua
    rehearsalDates.sort((a, b) => b.localeCompare(a));
    
    if (rehearsalDates.length === 0) {
        container.innerHTML = "<p class='text-muted text-center' style='grid-column: 1/-1;'>No hay ensayos registrados en este período.</p>";
        return;
    }
    
    // 3. Calcular racha consecutiva actual de asistencia para cada músico
    const streaks = state.musicians.map(m => {
        let streak = 0;
        for (let i = 0; i < rehearsalDates.length; i++) {
            const date = rehearsalDates[i];
            const dayRecord = state.attendance[date];
            const record = dayRecord ? dayRecord[m.id] : null;
            if (record && record.status === "present") {
                streak++;
            } else {
                break;
            }
        }
        return {
            id: m.id,
            name: m.name,
            instrument: m.instrument,
            role: m.role,
            streak: streak
        };
    });
    
    // 4. Ordenar por racha descendente, y por nombre ascendente secundario
    streaks.sort((a, b) => b.streak - a.streak || a.name.localeCompare(b.name, 'es'));
    
    // 5. Tomar los 3 primeros
    const top3 = streaks.slice(0, 3);
    
    top3.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "stats-streak-card";
        card.style.background = "var(--bg-secondary)";
        card.style.border = "1px solid var(--border-color)";
        card.style.borderRadius = "12px";
        card.style.padding = "16px";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.position = "relative";
        card.style.overflow = "hidden";
        card.style.boxShadow = "var(--shadow-sm)";
        
        card.innerHTML = `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 60px; height: 60px; flex-shrink: 0;">
                <svg viewBox="0 0 32 40" width="55" height="55" style="filter: drop-shadow(0 2px 6px rgba(255, 80, 0, 0.55)); overflow: visible;">
                    <defs>
                        <linearGradient id="flame-grad-outer-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ff2c00"/>
                            <stop offset="100%" stop-color="#ff6a00"/>
                        </linearGradient>
                        <linearGradient id="flame-grad-inner-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ffb300"/>
                            <stop offset="100%" stop-color="#ffd000"/>
                        </linearGradient>
                    </defs>
                    <path d="M16 2C16 2 24 9.5 24 19C24 24.5 20.4 29 16 29C11.6 29 8 24.5 8 19C8 9.5 16 2 16 2Z" fill="url(#flame-grad-outer-${idx})"/>
                    <path d="M16 8C16 8 21 13.5 21 20C21 23.5 18.8 26.5 16 26.5C13.2 26.5 11 23.5 11 20C11 13.5 16 8 16 8Z" fill="url(#flame-grad-inner-${idx})"/>
                    <path d="M16 13C16 13 19 17 19 21.5C19 24 17.7 25.5 16 25.5C14.3 25.5 13 24 13 21.5C13 17 16 13 16 13Z" fill="#ffea00" opacity="0.9"/>
                </svg>
                <span style="position: absolute; color: #ffffff; font-weight: 900; font-size: 1.25rem; text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 2px 4px rgba(0,0,0,0.8); top: 50%; left: 50%; transform: translate(-50%, -20%); font-family: 'Outfit', sans-serif;">
                    ${item.streak}
                </span>
            </div>
            <div style="margin-left: 14px; flex-grow: 1;">
                <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 2px;">${item.name}</div>
                <div style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                    <span class="musician-count-badge" style="background-color: var(--bg-primary); margin: 0; padding: 2px 6px;">${item.instrument}</span>
                    <span>${item.role}</span>
                </div>
            </div>
            <div style="font-size: 1.5rem; margin-left: auto; font-weight: 800; opacity: 0.85; flex-shrink: 0;">
                ${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
            </div>
        `;
        container.appendChild(card);
    });
}

// Renderiza la cuadrícula de componentes con sus anillos SVG circulares de progreso
function renderComponentsCircularStats() {
    const container = document.getElementById("stats-components-container");
    container.innerHTML = "";

    const musicianStats = window.lastMusicianStats;
    const totalDays = window.lastTotalDaysFiltered;

    if (!musicianStats || totalDays === 0) return;

    const searchQuery = document.getElementById("search-stats-musician").value.toLowerCase();
    let countVisible = 0;

    const sortedIds = Object.keys(musicianStats).sort((a, b) => {
        const musA = musicianStats[a];
        const musB = musicianStats[b];
        const secA = SECCIONES_ORDEN.indexOf(musA.instrument);
        const secB = SECCIONES_ORDEN.indexOf(musB.instrument);
        if (secA !== secB) return secA - secB;
        return musA.name.localeCompare(musB.name);
    });

    // Group musicians stats by voice
    const grouped = {};
    SECCIONES_ORDEN.forEach(voice => grouped[voice] = []);

    sortedIds.forEach(id => {
        const stats = musicianStats[id];
        const matchesSearch = stats.name.toLowerCase().includes(searchQuery) ||
                              stats.instrument.toLowerCase().includes(searchQuery);

        if (!matchesSearch) return;
        countVisible++;

        let voice = stats.instrument;
        if (!SECCIONES_ORDEN.includes(voice)) {
            voice = "Otros / Varios";
        }
        if (!grouped[voice]) {
            grouped[voice] = [];
        }
        grouped[voice].push(stats);
    });

    const fullOrderList = [...SECCIONES_ORDEN];
    if (grouped["Otros / Varios"] && grouped["Otros / Varios"].length > 0) {
        fullOrderList.push("Otros / Varios");
    }

    fullOrderList.forEach(voiceName => {
        const statsList = grouped[voiceName];
        if (!statsList || statsList.length === 0) return;

        // Group section div
        const groupSection = document.createElement("div");
        groupSection.style.marginBottom = "24px";
        
        groupSection.innerHTML = `
            <div class="plantilla-group-header" style="margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-family: inherit; font-size: 0.95rem; font-weight: 700; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.5px; margin: 0;">${voiceName}</h4>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${statsList.length} ${statsList.length === 1 ? 'componente' : 'componentes'}</span>
            </div>
            <div class="components-stats-grid"></div>
        `;
        
        container.appendChild(groupSection);
        const grid = groupSection.querySelector(".components-stats-grid");

        statsList.forEach(stats => {
            const presents = stats.total - stats.absent;
            const ratioPercent = stats.total > 0 ? Math.round((presents / stats.total) * 100) : 0;
            
            const offset = PROGRESS_CIRCUMFERENCE - (ratioPercent / 100) * PROGRESS_CIRCUMFERENCE;

            let circleColor = "var(--color-present)";
            if (ratioPercent < 80) circleColor = "var(--color-justified)";
            if (ratioPercent < 60) circleColor = "var(--color-absent)";

            const card = document.createElement("div");
            card.className = "component-stat-card";
            card.innerHTML = `
                <div class="component-stat-info">
                    <span class="component-stat-name" title="${stats.name}">${stats.name}</span>
                    <span class="component-stat-section">${stats.instrument}</span>
                    <span class="component-stat-ratio-text">${presents} de ${stats.total} ensayos</span>
                </div>
                
                <div class="component-stat-circle-wrapper">
                    <svg class="progress-ring" width="52" height="52">
                        <circle 
                            stroke="rgba(212, 175, 55, 0.08)"
                            stroke-width="3.5"
                            fill="transparent"
                            r="21"
                            cx="26"
                            cy="26"
                        />
                        <circle 
                            class="progress-ring__circle"
                            stroke="${circleColor}"
                            stroke-width="3.5"
                            stroke-linecap="round"
                            fill="transparent"
                            r="21"
                            cx="26"
                            cy="26"
                            stroke-dasharray="${PROGRESS_CIRCUMFERENCE} ${PROGRESS_CIRCUMFERENCE}"
                            stroke-dashoffset="${PROGRESS_CIRCUMFERENCE}"
                        />
                    </svg>
                    <span class="component-stat-percent-text">${ratioPercent}%</span>
                </div>
            `;

            card.style.cursor = "pointer";
            card.title = "Clic para ver estadísticas detalladas";
            card.addEventListener("click", () => openMusicianDetailStats(stats.id));
            grid.appendChild(card);

            setTimeout(() => {
                const circle = card.querySelector(".progress-ring__circle");
                if (circle) circle.style.strokeDashoffset = offset;
            }, 80);
        });
    });

    if (countVisible === 0) {
        container.innerHTML = `<div class="text-center text-muted" style="padding: 40px;">Ningún componente coincide con el término de búsqueda.</div>`;
    }
}

// ==========================================================================
// MODAL: ESTADÍSTICAS DETALLADAS POR COMPONENTE
// ==========================================================================
let currentDetailMusicianId = null;
let showAllDetailAbsences = false;

function openMusicianDetailStats(musicianId) {
    currentDetailMusicianId = musicianId;
    showAllDetailAbsences = false;
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;

    document.getElementById("detail-musician-name").innerText = musician.name;
    document.getElementById("detail-musician-instrument").innerText = `${musician.instrument} — ${musician.role}`;

    // Resetear filtros al abrir
    document.getElementById("detail-filter-year").value = "all";
    document.getElementById("detail-filter-month").value = "all";
    document.getElementById("detail-filter-type").value = "all";

    renderMusicianDetailContent();
    document.getElementById("modal-musician-stats").classList.add("active");
}

function renderMusicianDetailContent() {
    const musicianId = currentDetailMusicianId;
    if (!musicianId) return;

    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;

    const currentStreak = calculateMusicianStreak(musicianId);
    const detailMedals = getMusicianMedalsData(musicianId);
    const hasVolverEnsayar = detailMedals.some(m => m.id === "volver_ensayar" && m.unlocked);
    const detailUnlockedCount = hasVolverEnsayar ? 0 : detailMedals.reduce((acc, m) => {
        if (!m.unlocked || m.isNegative) return acc;
        return acc + (m.stars || 1);
    }, 0);

    const badgeBg = hasVolverEnsayar ? "rgba(231, 76, 60, 0.12)" : "rgba(212, 175, 55, 0.12)";
    const badgeColor = hasVolverEnsayar ? "var(--color-absent)" : "var(--color-gold)";
    const badgeBorder = hasVolverEnsayar ? "1px solid rgba(231, 76, 60, 0.35)" : "1px solid rgba(212, 175, 55, 0.25)";
    const badgeIcon = hasVolverEnsayar ? "⚠️" : "🏅";

    document.getElementById("detail-musician-name").innerHTML = `${musician.name} <span class="streak-badge" style="font-size: 0.9rem; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; background: rgba(230, 126, 34, 0.12); color: #e67e22; padding: 2px 8px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600;"><span style="font-size: 1rem;">🔥</span> ${currentStreak}</span><span class="streak-badge" style="font-size: 0.9rem; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; background: ${badgeBg}; color: ${badgeColor}; padding: 2px 8px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600; border: ${badgeBorder};"><span style="font-size: 1rem;">${badgeIcon}</span> ${detailUnlockedCount}</span>`;
    document.getElementById("detail-musician-instrument").innerText = `${musician.instrument} — ${musician.role || "Músico"}`;

    const detailChecks = [
        { id: "detail-badge-weather-check", val: !!musician.badgeWeather },
        { id: "detail-badge-sangre-check", val: !!musician.badgeSangreNueva },
        { id: "detail-badge-fiel-check", val: !!musician.badgeFielAtril },
        { id: "detail-badge-corazon-check", val: !!musician.badgeCorazonYacente },
        { id: "detail-badge-raices-check", val: !!musician.badgeRaicesProfundas },
        { id: "detail-badge-leyenda-check", val: !!musician.badgeLeyendaViva },
        { id: "detail-badge-agonia-check", val: !!musician.badgeAgonia },
        { id: "detail-badge-hasta_final-check", val: !!musician.badgeHastaElFinal }
    ];
    const isAdmin = getAuthRole() === "admin";
    detailChecks.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) {
            el.checked = item.val;
            el.disabled = !isAdmin;
        }
    });



    const rutaTripsInput = document.getElementById("detail-badge-ruta-trips");
    if (rutaTripsInput) {
        rutaTripsInput.value = musician.badgeRutaTrips || 0;
        rutaTripsInput.disabled = !isAdmin;
    }

    const hermandadEventsInput = document.getElementById("detail-badge-hermandad-events");
    if (hermandadEventsInput) {
        hermandadEventsInput.value = musician.badgeHermandadEvents || 0;
        hermandadEventsInput.disabled = !isAdmin;
    }

    const yearFilter = document.getElementById("detail-filter-year").value;
    const monthFilter = document.getElementById("detail-filter-month").value;
    const typeFilter = document.getElementById("detail-filter-type").value;

    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Filtrar fechas
    const filteredDates = Object.keys(state.attendance).filter(dateStr => {
        if (dateStr > todayStr) return false; // Excluir sesiones futuras de las estadísticas

        const dateObj = new Date(dateStr.replace(/-/g, "/"));
        const year = dateObj.getFullYear().toString();
        const month = dateObj.getMonth().toString();
        const yearMatches = yearFilter === "all" || year === yearFilter;
        const monthMatches = monthFilter === "all" || month === monthFilter;
        const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
        const typeMatches = typeFilter === "all" || sessionType === typeFilter;
        return yearMatches && monthMatches && typeMatches;
    }).sort((a, b) => b.localeCompare(a));

    let totalSessions = 0;
    let presents = 0;
    let absentJustified = 0;
    let absentUnjustified = 0;
    const absenceRecords = [];
    const reasonCounts = {};

    filteredDates.forEach(date => {
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (!record) return;
        totalSessions++;

        if (record.status === "present") {
            presents++;
        } else {
            const sessionInfo = state.sessionTypes[date];
            let sessionLabel = "General";
            if (sessionInfo) {
                if (sessionInfo.type === "actuacion") {
                    sessionLabel = sessionInfo.name || "Actuación";
                } else if (sessionInfo.type === "ensayo") {
                    const sub = sessionInfo.subtype;
                    if (sub === "trompetas1") {
                        sessionLabel = "Trompetas 1ª";
                    } else if (sub === "bajos") {
                        sessionLabel = "Bajos";
                    } else if (sub === "trompetas2y3") {
                        sessionLabel = "Trompetas 2ª y 3ª";
                    } else if (sub === "cornetas") {
                        sessionLabel = "Cornetas";
                    } else if (sub === "percusion") {
                        sessionLabel = "Percusión";
                    } else if (sub === "primeras") {
                        sessionLabel = "Primeras";
                    } else if (sub === "voces") {
                        const count = sessionInfo.convocatedVoices ? sessionInfo.convocatedVoices.length : 0;
                        sessionLabel = `Voces (${count})`;
                    } else {
                        sessionLabel = "General";
                    }
                }
            }
            const sessionTypeName = sessionInfo ? sessionInfo.type : "ensayo";

            if (record.justified) {
                absentJustified++;
            } else {
                absentUnjustified++;
            }

            const reason = record.reason || "Sin especificar";
            reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;

            absenceRecords.push({
                date,
                sessionLabel,
                sessionType: sessionTypeName,
                justified: record.justified,
                reason
            });
        }
    });

    const totalAbsent = absentJustified + absentUnjustified;
    const pct = totalSessions > 0 ? Math.round((presents / totalSessions) * 100) : 0;

    // Tarjetas resumen
    document.getElementById("detail-attendance-pct").innerText = `${pct}%`;
    document.getElementById("detail-total-sessions").innerText = totalSessions;
    document.getElementById("detail-total-absences").innerText = totalAbsent;

    // Gráfico de sectores (pie chart)
    const pieSvg = document.getElementById("detail-pie-svg");
    pieSvg.innerHTML = "";

    const cx = 60, cy = 60, r = 54;
    const segments = [];
    if (presents > 0) segments.push({ value: presents, color: "var(--color-present)" });
    if (absentJustified > 0) segments.push({ value: absentJustified, color: "var(--color-justified)" });
    if (absentUnjustified > 0) segments.push({ value: absentUnjustified, color: "var(--color-absent)" });

    if (totalSessions === 0 || segments.length === 0) {
        // Círculo vacío
        const emptyCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        emptyCircle.setAttribute("cx", cx);
        emptyCircle.setAttribute("cy", cy);
        emptyCircle.setAttribute("r", r);
        emptyCircle.setAttribute("fill", "rgba(212, 175, 55, 0.08)");
        pieSvg.appendChild(emptyCircle);
    } else if (segments.length === 1) {
        // Círculo completo de un solo color
        const fullCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        fullCircle.setAttribute("cx", cx);
        fullCircle.setAttribute("cy", cy);
        fullCircle.setAttribute("r", r);
        fullCircle.setAttribute("fill", segments[0].color);
        pieSvg.appendChild(fullCircle);
    } else {
        // Múltiples sectores
        let currentAngle = -Math.PI / 2; // Empezar arriba
        segments.forEach(seg => {
            const sliceAngle = (seg.value / totalSessions) * 2 * Math.PI;
            const x1 = cx + r * Math.cos(currentAngle);
            const y1 = cy + r * Math.sin(currentAngle);
            const x2 = cx + r * Math.cos(currentAngle + sliceAngle);
            const y2 = cy + r * Math.sin(currentAngle + sliceAngle);
            const largeArc = sliceAngle > Math.PI ? 1 : 0;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`);
            path.setAttribute("fill", seg.color);
            path.setAttribute("stroke", "var(--bg-primary)");
            path.setAttribute("stroke-width", "1.5");
            pieSvg.appendChild(path);

            currentAngle += sliceAngle;
        });
    }


    // Desglose textual
    let breakdownHTML = `
        <div><span style="color: var(--color-present); font-weight: 600;">● Presente:</span> ${presents} sesiones</div>
        <div><span style="color: var(--color-justified); font-weight: 600;">● Falta justificada:</span> ${absentJustified}</div>
        <div><span style="color: var(--color-absent); font-weight: 600;">● Falta sin justificar:</span> ${absentUnjustified}</div>
    `;

    // Motivos más frecuentes
    const sortedReasons = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]);
    if (sortedReasons.length > 0) {
        breakdownHTML += `<hr style="border-color: var(--border-color); margin: 8px 0;">`;
        breakdownHTML += `<div style="font-weight: 600; margin-bottom: 4px;">Motivos de falta:</div>`;
        sortedReasons.forEach(([reason, count]) => {
            breakdownHTML += `<div style="padding-left: 8px;">• ${reason}: <strong>${count}</strong></div>`;
        });
    }

    document.getElementById("detail-breakdown").innerHTML = breakdownHTML;

    // Tabla de faltas
    const tbody = document.getElementById("detail-absences-tbody");
    const noAbsences = document.getElementById("detail-no-absences");
    const toggleContainer = document.getElementById("detail-absences-toggle-container");
    const toggleBtnEl = document.getElementById("btn-detail-absences-toggle");
    tbody.innerHTML = "";

    if (absenceRecords.length === 0) {
        noAbsences.classList.remove("hidden");
        if (toggleContainer) toggleContainer.classList.add("hidden");
    } else {
        noAbsences.classList.add("hidden");
        
        let recordsToRender = absenceRecords;
        if (absenceRecords.length > 3) {
            if (toggleContainer) {
                toggleContainer.classList.remove("hidden");
                if (toggleBtnEl) {
                    toggleBtnEl.innerText = showAllDetailAbsences 
                        ? "Ver menos" 
                        : `Ver todas las faltas (${absenceRecords.length})`;
                }
            }
            if (!showAllDetailAbsences) {
                recordsToRender = absenceRecords.slice(0, 3);
            }
        } else {
            if (toggleContainer) toggleContainer.classList.add("hidden");
        }

        recordsToRender.forEach(rec => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${formatDateSpanish(rec.date)}</strong></td>
                <td>${rec.sessionLabel}</td>
                <td>
                    <span style="color: ${rec.justified ? 'var(--color-justified)' : 'var(--color-absent)'}; font-weight: 600;">
                        ${rec.justified ? 'Sí' : 'No'}
                    </span>
                </td>
                <td>${rec.reason}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Render detail medals grid
    const medalsGrid = document.getElementById("detail-medals-grid");
    if (medalsGrid) {
        const medals = getMusicianMedalsData(musicianId);
        const hasVolverEnsayar = medals.some(m => m.id === "volver_ensayar" && m.unlocked);
        
        // Contabilizar insignias positivas desbloqueadas, donde cada estrella cuenta como una insignia
        const unlockedCount = hasVolverEnsayar ? 0 : medals.reduce((acc, m) => {
            if (!m.unlocked || m.isNegative) return acc;
            return acc + (m.stars || 1);
        }, 0);
        const detailInsigniasVal = document.getElementById("detail-insignias-val");
        if (detailInsigniasVal) {
            detailInsigniasVal.innerText = unlockedCount;
        }
        const detailInsigniasBadge = document.getElementById("detail-insignias-badge");
        if (detailInsigniasBadge) {
            const iconEl = detailInsigniasBadge.querySelector(".insignias-badge-icon");
            if (hasVolverEnsayar) {
                detailInsigniasBadge.classList.add("alarm-red");
                if (iconEl) iconEl.innerText = "⚠️";
            } else {
                detailInsigniasBadge.classList.remove("alarm-red");
                if (iconEl) iconEl.innerText = "🏅";
            }
        }

        const categories = [
            {
                title: "📅 Asistencia",
                ids: ["asistencia", "comprometido", "veterano", "racha", "god", "titular", "capitan", "volver_ensayar"]
            },
            {
                title: "📜 Legado",
                ids: ["sangre_nueva", "fiel_atril", "corazon_yacente", "raices_profundas", "leyenda_viva"]
            },
            {
                title: "✨ Especiales",
                ids: ["estudio", "agonia", "ruta", "hermandad", "hasta_final", "trotamundos", "doblete", "marea"]
            }
        ];

        medalsGrid.innerHTML = categories.map(cat => {
            const catMedals = medals.filter(m => cat.ids.includes(m.id));
            catMedals.sort((a, b) => cat.ids.indexOf(a.id) - cat.ids.indexOf(b.id));

            return `
                <div style="grid-column: 1 / -1; margin-top: 15px; margin-bottom: 5px;">
                    <h4 style="margin: 0; font-family: 'Cinzel', serif; font-size: 0.95rem; color: var(--color-gold); border-bottom: 1px solid rgba(212, 175, 55, 0.25); padding-bottom: 4px; text-align: left;">
                        ${cat.title}
                    </h4>
                </div>
                ${catMedals.map(medal => {
                    let cardClass = medal.unlocked ? 'unlocked' : 'locked';
                    if (medal.isNegative && medal.unlocked) {
                        cardClass = 'negative-unlocked';
                    } else if (medal.unlocked && medal.stars > 0) {
                        cardClass += ` unlocked-${medal.stars}star`;
                    }
                    
                    let starsHTML = "";
                    if (medal.stars !== undefined && medal.stars > 0) {
                        let starsSpanHTML = "";
                        for (let i = 1; i <= 3; i++) {
                            if (i <= medal.stars) {
                                starsSpanHTML += '<span class="medal-star-icon filled">★</span>';
                            } else {
                                starsSpanHTML += '<span class="medal-star-icon">★</span>';
                            }
                        }
                        starsHTML = `<div class="medal-stars" style="display: flex;">${starsSpanHTML}</div>`;
                    }
                    return `
                        <div class="medal-card ${cardClass}" style="padding: 10px; display: flex; align-items: center; gap: 8px; font-size: 0.82rem; border-radius: 6px;">
                            <div class="medal-icon-wrapper" style="position: relative; width: 32px; height: 32px; font-size: 1.1rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                ${medal.icon}
                                ${starsHTML}
                            </div>
                            <div style="flex: 1; min-width: 0; text-align: left;">
                                <div style="font-weight: 700; color: #FFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${medal.title}">${medal.title}</div>
                                <div style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${medal.desc}">${medal.desc}</div>
                            </div>
                        </div>
                    `;
                }).join("")}
            `;
        }).join("");
    }
}

function downloadMusicianPDFReport() {
    const musicianId = currentDetailMusicianId;
    if (!musicianId) return;

    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;

    const yearFilter = document.getElementById("detail-filter-year").value;
    const monthFilter = document.getElementById("detail-filter-month").value;
    const typeFilter = document.getElementById("detail-filter-type").value;

    const allDates = Object.keys(state.attendance);
    const filteredDates = allDates.filter(dateStr => {
        const dateObj = new Date(dateStr);
        const year = dateObj.getFullYear().toString();
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || year === yearFilter;
        const monthMatches = monthFilter === "all" || month === monthFilter;
        const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
        const typeMatches = typeFilter === "all" || sessionType === typeFilter;

        return yearMatches && monthMatches && typeMatches;
    }).sort((a, b) => b.localeCompare(a));

    let totalSessions = 0;
    let presents = 0;
    let absentJustified = 0;
    let absentUnjustified = 0;
    const sessionsList = [];
    const reasonCounts = {};

    filteredDates.forEach(date => {
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (!record) return;
        totalSessions++;

        const sessionInfo = state.sessionTypes[date];
        let sessionLabel = "General";
        if (sessionInfo) {
            if (sessionInfo.type === "actuacion") {
                sessionLabel = sessionInfo.name || "Actuación";
            } else {
                const sub = sessionInfo.subtype;
                if (sub === "trompetas1") {
                    sessionLabel = "Trompetas 1ª";
                } else if (sub === "bajos") {
                    sessionLabel = "Bajos";
                } else if (sub === "trompetas2y3") {
                    sessionLabel = "Trompetas 2ª y 3ª";
                } else if (sub === "cornetas") {
                    sessionLabel = "Cornetas";
                } else if (sub === "percusion") {
                    sessionLabel = "Percusión";
                } else if (sub === "primeras") {
                    sessionLabel = "Primeras";
                } else if (sub === "voces") {
                    sessionLabel = "Voces";
                } else {
                    sessionLabel = "General";
                }
            }
        }
        const sessionTypeName = sessionInfo ? sessionInfo.type : "ensayo";

        if (record.status === "present") {
            presents++;
            sessionsList.push({
                date,
                sessionLabel,
                sessionType: sessionTypeName,
                status: "present",
                justified: false,
                reason: ""
            });
        } else {
            if (record.justified) {
                absentJustified++;
            } else {
                absentUnjustified++;
            }
            const reason = record.reason || "Sin especificar";
            reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;

            sessionsList.push({
                date,
                sessionLabel,
                sessionType: sessionTypeName,
                status: "absent",
                justified: record.justified,
                reason: reason
            });
        }
    });

    const totalAbsent = absentJustified + absentUnjustified;
    const pct = totalSessions > 0 ? Math.round((presents / totalSessions) * 100) : 0;
    const pctAbsent = totalSessions > 0 ? Math.round((totalAbsent / totalSessions) * 100) : 0;

    let reasonsHTML = "";
    const sortedReasons = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1]);
    if (sortedReasons.length > 0) {
        reasonsHTML = `
            <div class="print-section-title">Motivos de ausencia frecuentes</div>
            <div class="print-reasons-container">
                ${sortedReasons.map(([reason, count]) => `• ${reason}: <strong>${count} ${count === 1 ? 'vez' : 'veces'}</strong>`).join('<br>')}
            </div>
        `;
    }

    const filterTextYear = yearFilter === "all" ? "Todos los años" : yearFilter;
    const monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const filterTextMonth = monthFilter === "all" ? "Todos los meses" : monthsNames[parseInt(monthFilter)];
    const filterTextType = typeFilter === "all" ? "Ensayos y Actuaciones" : (typeFilter === "ensayo" ? "Solo Ensayos" : "Solo Actuaciones");

    let tableRowsHTML = "";
    if (sessionsList.length === 0) {
        tableRowsHTML = `<tr><td colspan="4" style="text-align: center; color: #666;">Sin sesiones registradas en este período.</td></tr>`;
    } else {
        sessionsList.forEach(s => {
            let badgeClass = "print-badge-present";
            let statusText = "Presente";
            if (s.status === "absent") {
                if (s.justified) {
                    badgeClass = "print-badge-justified";
                    statusText = "Falta Justificada";
                } else {
                    badgeClass = "print-badge-absent";
                    statusText = "Falta";
                }
            }
            tableRowsHTML += `
                <tr>
                    <td style="white-space: nowrap;"><strong>${formatDateSpanish(s.date)}</strong></td>
                    <td>${s.sessionLabel}</td>
                    <td><span class="print-badge ${badgeClass}">${statusText}</span></td>
                    <td>${s.reason || "-"}</td>
                </tr>
            `;
        });
    }

    const printArea = document.getElementById("print-report-area");
    
    printArea.innerHTML = `
        <div class="print-header">
            <div>
                <h1 class="print-title">YACENTE</h1>
                <div class="print-subtitle">Gestor de asistencia • Informe de Componente</div>
            </div>
            <div class="print-meta">
                <strong>Fecha de generación:</strong> ${new Date().toLocaleDateString("es-ES")}<br>
                <strong>Período:</strong> ${filterTextMonth} ${filterTextYear}<br>
                <strong>Tipo:</strong> ${filterTextType}
            </div>
        </div>

        <div class="print-musician-info">
            <h2 class="print-musician-name">${musician.name}</h2>
            <p class="print-musician-instrument"><strong>Sección:</strong> ${musician.instrument} | <strong>Rol:</strong> ${musician.role}</p>
        </div>

        <div class="print-section-title">Resumen de Asistencia</div>
        <div class="print-grid">
            <div class="print-stat-box">
                <div class="print-stat-title">Asistencia (%)</div>
                <div class="print-stat-value" style="color: ${pct >= 80 ? '#2ecc71' : (pct >= 60 ? '#e67e22' : '#e74c3c')}">${pct}%</div>
            </div>
            <div class="print-stat-box">
                <div class="print-stat-title">Sesiones Evaluadas</div>
                <div class="print-stat-value">${totalSessions}</div>
            </div>
            <div class="print-stat-box">
                <div class="print-stat-title">Porcentaje Faltado</div>
                <div class="print-stat-value" style="color: ${pctAbsent > 50 ? '#e74c3c' : '#333'}">${pctAbsent}%</div>
            </div>
        </div>

        <div class="print-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: -5px;">
            <div class="print-stat-box">
                <div class="print-stat-title">Asistencias</div>
                <div class="print-stat-value" style="color: #2ecc71; font-size: 11.5pt; font-weight: 600;">${presents} presentes</div>
            </div>
            <div class="print-stat-box">
                <div class="print-stat-title">Faltas Justificadas</div>
                <div class="print-stat-value" style="color: #e67e22; font-size: 11.5pt; font-weight: 600;">${absentJustified} justificadas</div>
            </div>
            <div class="print-stat-box">
                <div class="print-stat-title">Faltas Sin Justificar</div>
                <div class="print-stat-value" style="color: #e74c3c; font-size: 11.5pt; font-weight: 600;">${absentUnjustified} sin justificar</div>
            </div>
        </div>

        ${reasonsHTML}

        <div class="print-section-title">Historial Detallado de Sesiones</div>
        <table class="print-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Sesión</th>
                    <th>Estado</th>
                    <th>Motivo de Ausencia</th>
                </tr>
            </thead>
            <tbody>
                ${tableRowsHTML}
            </tbody>
        </table>
    `;

    window.print();
    
    setTimeout(() => {
        printArea.innerHTML = "";
    }, 10000);
}

function downloadRepertoirePDFReport() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;

    if (!state.marchas || state.marchas.length === 0) {
        showToast("No hay marchas en el repertorio para exportar", "warning");
        return;
    }

    if (!state.musicianMarchaStatuses) {
        state.musicianMarchaStatuses = {};
    }

    // Count statistics
    const stats = { green: 0, yellow: 0, red: 0, none: 0 };
    state.marchas.forEach(marcha => {
        const key = `${musicianId}_${marcha.id}`;
        const status = state.musicianMarchaStatuses[key] || "none";
        if (status === "green") stats.green++;
        else if (status === "yellow") stats.yellow++;
        else if (status === "red") stats.red++;
        else stats.none++;
    });

    const sorted = [...(state.marchas || [])].sort((a, b) => a.title.localeCompare(b.title));
    
    // Determine dynamic column count to make it fit on exactly ONE page
    let columnCount = 2;
    if (sorted.length <= 15) {
        columnCount = 1;
    } else if (sorted.length > 40) {
        columnCount = 3;
    }
    
    const itemsPerColumn = Math.ceil(sorted.length / columnCount);
    let columnsHTML = "";
    
    for (let c = 0; c < columnCount; c++) {
        const columnItems = sorted.slice(c * itemsPerColumn, (c + 1) * itemsPerColumn);
        let itemsHTML = "";
        
        columnItems.forEach(marcha => {
            const key = `${musicianId}_${marcha.id}`;
            const status = state.musicianMarchaStatuses[key] || "none";
            
            itemsHTML += `
                <div class="print-repertoire-item">
                    <div class="print-repertoire-meta">
                        <span class="print-repertoire-title">${marcha.title}</span>
                    </div>
                    <div>
                        <span class="print-status-dot ${status}"></span>
                    </div>
                </div>
            `;
        });
        
        columnsHTML += `
            <div class="print-repertoire-column">
                ${itemsHTML}
            </div>
        `;
    }

    const printArea = document.getElementById("print-report-area");
    
    printArea.innerHTML = `
        <div class="print-header">
            <div>
                <h1 class="print-title">YACENTE</h1>
                <div class="print-subtitle">Repertorio General y Nivel de Dominio</div>
            </div>
            <div class="print-meta">
                <strong>Músico:</strong> ${musician.name}<br>
                <strong>Voz/Sección:</strong> ${musician.instrument}<br>
                <strong>Fecha:</strong> ${new Date().toLocaleDateString("es-ES")}
            </div>
        </div>
        
        <div class="print-repertoire-legend">
            <div class="print-legend-item">
                <span class="print-status-dot green"></span>
                <span>Dominada (${stats.green})</span>
            </div>
            <div class="print-legend-item">
                <span class="print-status-dot yellow"></span>
                <span>En proceso (${stats.yellow})</span>
            </div>
            <div class="print-legend-item">
                <span class="print-status-dot red"></span>
                <span>Por trabajar (${stats.red})</span>
            </div>
            <div class="print-legend-item">
                <span class="print-status-dot none"></span>
                <span>Sin marcar (${stats.none})</span>
            </div>
            <div style="margin-left: auto; font-weight: 600;">
                Total: ${state.marchas.length} marchas
            </div>
        </div>
        
        <div class="print-repertoire-grid">
            ${columnsHTML}
        </div>
    `;

    window.print();
    
    setTimeout(() => {
        printArea.innerHTML = "";
    }, 10000);
}

// ==========================================================================
// MODAL: ESTADÍSTICAS DETALLADAS POR VOZ / SECCIÓN
// ==========================================================================
let currentDetailVoiceName = null;

function openVoiceDetailStats(voiceName) {
    currentDetailVoiceName = voiceName;
    document.getElementById("detail-voice-name").innerText = voiceName;
    
    // Heredar los filtros actuales seleccionados en la pantalla de estadísticas principal
    document.getElementById("voice-filter-year").value = document.getElementById("filter-year").value;
    document.getElementById("voice-filter-month").value = document.getElementById("filter-month").value;
    document.getElementById("voice-filter-type").value = document.getElementById("filter-type").value;
    
    renderVoiceDetailContent();
    document.getElementById("modal-voice-stats").classList.add("active");
}

function renderVoiceDetailContent() {
    const voiceName = currentDetailVoiceName;
    if (!voiceName) return;

    const yearFilter = document.getElementById("voice-filter-year").value;
    const monthFilter = document.getElementById("voice-filter-month").value;
    const typeFilter = document.getElementById("voice-filter-type").value;

    // Filtrar fechas
    const allDates = Object.keys(state.attendance);
    const filteredDates = allDates.filter(dateStr => {
        const dateObj = new Date(dateStr);
        const year = dateObj.getFullYear().toString();
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || year === yearFilter;
        const monthMatches = monthFilter === "all" || month === monthFilter;
        const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
        const typeMatches = typeFilter === "all" || sessionType === typeFilter;

        return yearMatches && monthMatches && typeMatches;
    });

    const totalDaysFiltered = filteredDates.length;
    const container = document.getElementById("voice-bar-chart-container");
    container.innerHTML = "";

    // Buscar músicos de esta voz
    const musiciansInVoice = state.musicians.filter(m => m.instrument === voiceName);

    if (totalDaysFiltered === 0 || musiciansInVoice.length === 0) {
        container.innerHTML = "<p class='text-muted text-center' style='padding: 20px;'>No hay sesiones registradas en este período para esta sección.</p>";
        return;
    }

    // Calcular estadísticas individuales para los integrantes de esta voz
    const musicianStats = [];
    musiciansInVoice.forEach(m => {
        let total = 0;
        let presents = 0;

        filteredDates.forEach(date => {
            const record = state.attendance[date] ? state.attendance[date][m.id] : null;
            if (record) {
                total++;
                if (record.status === "present") {
                    presents++;
                }
            }
        });

        const pct = total > 0 ? Math.round((presents / total) * 100) : 0;
        musicianStats.push({
            name: m.name,
            role: m.role,
            pct: pct,
            presents: presents,
            total: total
        });
    });

    // Ordenar de mayor a menor asistencia
    musicianStats.sort((a, b) => b.pct - a.pct);

    // Dibujar las filas de gráfico de barras
    musicianStats.forEach(m => {
        let numColor = "var(--color-present)";
        if (m.pct < 80) numColor = "var(--color-justified)";
        if (m.pct < 50) numColor = "var(--color-absent)";

        const row = document.createElement("div");
        row.className = "chart-bar-row";
        row.innerHTML = `
            <div class="chart-bar-info">
                <span class="chart-bar-label" style="font-weight: 500;">${m.name} <small class="text-muted">(${m.role})</small></span>
                <span class="chart-bar-value" style="color: ${numColor}; font-weight: 700;">${m.pct}% <small class="text-muted" style="color: inherit; opacity: 0.7;">(${m.presents}/${m.total})</small></span>
            </div>
            <div class="chart-bar-outer">
                <div class="chart-bar-inner" style="width: 0%;"></div>
            </div>
        `;
        container.appendChild(row);
        
        setTimeout(() => {
            const bar = row.querySelector(".chart-bar-inner");
            if (bar) bar.style.width = `${m.pct}%`;
        }, 100);
    });
}

// ==========================================================================
// UTILERÍAS & AUXILIARES
// ==========================================================================
function getInitials(name) {
    const parts = name.split(" ").filter(p => p.length > 0);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return "M";
}

function formatDateSpanish(dateStr) {
    const cleanDateStr = dateStr.split("_")[0];
    const parts = cleanDateStr.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString("es-ES", {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    });
}

function formatDateShortSpanish(dateStr) {
    const cleanDateStr = dateStr.split("_")[0];
    const parts = cleanDateStr.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const formatted = date.toLocaleDateString("es-ES", {
        weekday: 'long', 
        day: 'numeric'
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "";
    if (type === "success") {
        icon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else {
        icon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    }

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function setupFirebaseListeners() {
    // Cerrar modal de configuración
    const closeFirebaseModal = () => {
        document.getElementById("modal-firebase-config").classList.remove("active");
    };
    document.getElementById("btn-close-firebase-modal").addEventListener("click", closeFirebaseModal);
    document.getElementById("btn-cancel-firebase-modal").addEventListener("click", closeFirebaseModal);
    
    // Guardar credenciales de Firebase (Activar Nube)
    document.getElementById("form-firebase-config").addEventListener("submit", (e) => {
        e.preventDefault();
        const configJson = document.getElementById("firebase-config-json").value.trim();
        const password = document.getElementById("firebase-admin-password").value.trim();
        
        try {
            // Extraer solo la parte del objeto entre llaves { } para tolerar código Javascript copiado de la consola
            const startIdx = configJson.indexOf("{");
            const endIdx = configJson.lastIndexOf("}");
            if (startIdx === -1 || endIdx === -1) {
                throw new Error("No se encontró un objeto de configuración válido");
            }
            const cleanObjStr = configJson.substring(startIdx, endIdx + 1);
            
            // Evaluar de forma segura el objeto de javascript copiado
            const configObj = Function("return " + cleanObjStr)();
            
            if (!configObj.apiKey || !configObj.projectId) {
                throw new Error("El objeto debe contener al menos apiKey y projectId");
            }
            
            // Guardar configuración en estado
            state.firebaseConfig = configObj;
            
            const isConfiguringAsAdmin = password.length > 0;
            if (isConfiguringAsAdmin) {
                state.firebasePasswordHash = hashString(password);
                sessionStorage.setItem("yacente_authenticated", "true"); // El administrador que lo configura queda autenticado de inmediato
            }
            saveStateToLocalStorage();
            
            closeFirebaseModal();
            showToast("Configuración guardada. Conectando a la nube...", "success");
            
            // Inicializar Firebase
            initFirebase();
            
            if (isConfiguringAsAdmin) {
                // Crear el registro de seguridad en Firestore para validar a los demás dispositivos
                const db = firebase.firestore();
                db.collection("config").doc("security").set({
                    passwordHash: state.firebasePasswordHash
                })
                .then(() => {
                    showToast("Contraseña de seguridad configurada en la nube", "success");
                    // Ofrecer migración de datos
                    syncLocalToCloud();
                })
                .catch(err => {
                    console.error("Error al guardar hash en Firestore:", err);
                });
            } else {
                showToast("Conectado con éxito. Cargando base de datos...", "success");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            showToast("JSON inválido. Por favor, introduce la configuración correcta de Firebase", "error");
        }
    });
    
    // --- Lógica del Selector de Pestañas de la Pantalla de Bloqueo ---
    const tabAdmin = document.getElementById("tab-login-admin");
    const tabMusico = document.getElementById("tab-login-musico");
    const groupAdmin = document.getElementById("group-login-admin");
    const groupMusico = document.getElementById("group-login-musico");
    const passwordInput = document.getElementById("lock-password-input");
    const musicianSelect = document.getElementById("login-musician-select");
    const musicianPin = document.getElementById("login-musician-pin");
    const errorMsg = document.getElementById("lock-error-msg");
    const subtitle = document.getElementById("lock-subtitle");
    
    let activeTab = "admin"; // "admin" o "musico"

    if (tabAdmin && tabMusico) {
        tabAdmin.addEventListener("click", () => {
            activeTab = "admin";
            tabAdmin.classList.add("active");
            tabMusico.classList.remove("active");
            groupAdmin.classList.remove("hidden");
            groupMusico.classList.add("hidden");
            if (subtitle) subtitle.innerText = "Gestor de asistencia";
            passwordInput.required = true;
            musicianSelect.required = false;
            musicianPin.required = false;
            errorMsg.classList.add("hidden");
        });

        tabMusico.addEventListener("click", () => {
            activeTab = "musico";
            tabMusico.classList.add("active");
            tabAdmin.classList.remove("active");
            groupMusico.classList.remove("hidden");
            groupAdmin.classList.add("hidden");
            if (subtitle) subtitle.innerText = "Gestor de asistencia • Músicos";
            passwordInput.required = false;
            musicianSelect.required = true;
            musicianPin.required = true;
            errorMsg.classList.add("hidden");
            populateLoginMusicians();
        });
    }

    const btnLockConfigureCloud = document.getElementById("btn-lock-configure-cloud");
    if (btnLockConfigureCloud) {
        btnLockConfigureCloud.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("modal-firebase-config").classList.add("active");
        });
    }

    // Desbloquear pantalla (Lock Screen Form)
    document.getElementById("form-lock-screen").addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (activeTab === "admin") {
            // LOGIN DE ADMINISTRACIÓN
            const enteredPassword = passwordInput.value.trim();
            const enteredHash = hashString(enteredPassword);
            
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("config").doc("security").get()
                    .then(doc => {
                        let validHash = state.firebasePasswordHash; // fallback local
                        if (doc.exists && doc.data().passwordHash) {
                            validHash = doc.data().passwordHash;
                        }
                        
                        if (enteredHash === validHash || (!validHash && enteredPassword === "admin")) {
                            sessionStorage.setItem("yacente_authenticated", "true");
                            sessionStorage.setItem("yacente_role", "admin");
                            localStorage.setItem("yacente_authenticated", "true");
                            localStorage.setItem("yacente_role", "admin");
                            document.body.classList.remove("component-portal");
                            
                            // Ocultar PWA Bottom Navigation
                            const mobNav = document.getElementById("component-mobile-nav");
                            if (mobNav) mobNav.classList.add("hidden");
                            
                            hideLockScreen();
                            startCloudSync();
                            renderActiveSection("section-pasar-lista");
                            showToast("Panel desbloqueado correctamente", "success");
                        } else {
                            errorMsg.classList.remove("hidden");
                            errorMsg.innerText = "Contraseña incorrecta";
                            showToast("Contraseña de directiva incorrecta", "error");
                        }
                    })
                    .catch(err => {
                        console.error("Error de conexión al validar contraseña:", err);
                        if (enteredHash === state.firebasePasswordHash || enteredPassword === "admin") {
                            sessionStorage.setItem("yacente_authenticated", "true");
                            sessionStorage.setItem("yacente_role", "admin");
                            localStorage.setItem("yacente_authenticated", "true");
                            localStorage.setItem("yacente_role", "admin");
                            document.body.classList.remove("component-portal");
                            
                            // Ocultar PWA Bottom Navigation
                            const mobNav = document.getElementById("component-mobile-nav");
                            if (mobNav) mobNav.classList.add("hidden");
                            
                            hideLockScreen();
                            startCloudSync();
                            renderActiveSection("section-pasar-lista");
                            showToast("Panel desbloqueado en modo offline", "success");
                        } else {
                            errorMsg.classList.remove("hidden");
                            errorMsg.innerText = "Contraseña incorrecta";
                            showToast("Contraseña de directiva incorrecta", "error");
                        }
                    });
            } else {
                // Modo local sin config en la nube
                if (enteredHash === state.firebasePasswordHash || enteredPassword === "admin") {
                    sessionStorage.setItem("yacente_authenticated", "true");
                    sessionStorage.setItem("yacente_role", "admin");
                    localStorage.setItem("yacente_authenticated", "true");
                    localStorage.setItem("yacente_role", "admin");
                    document.body.classList.remove("component-portal");
                    
                    // Ocultar PWA Bottom Navigation
                    const mobNav = document.getElementById("component-mobile-nav");
                    if (mobNav) mobNav.classList.add("hidden");
                    
                    hideLockScreen();
                    renderActiveSection("section-pasar-lista");
                    showToast("Panel local desbloqueado", "success");
                } else {
                    errorMsg.classList.remove("hidden");
                    errorMsg.innerText = "Contraseña incorrecta (Usa 'admin' en modo local)";
                    showToast("Contraseña incorrecta", "error");
                }
            }
        } else {
            // LOGIN DE MÚSICOS (PIN de 4 dígitos)
            const musicianId = musicianSelect.value;
            const enteredPin = musicianPin.value.trim();
            
            if (!musicianId) {
                showToast("Por favor, selecciona tu nombre", "warning");
                return;
            }
            if (enteredPin.length !== 4 || isNaN(enteredPin)) {
                showToast("El PIN debe ser de 4 dígitos numéricos", "warning");
                return;
            }
            
            const musician = state.musicians.find(m => m.id === musicianId);
            if (!musician) {
                showToast("Músico no encontrado", "error");
                return;
            }
            
            const performAuth = () => {
                sessionStorage.setItem("yacente_authenticated", "true");
                sessionStorage.setItem("yacente_role", "component");
                sessionStorage.setItem("yacente_musician_id", musicianId);
                localStorage.setItem("yacente_authenticated", "true");
                localStorage.setItem("yacente_role", "component");
                localStorage.setItem("yacente_musician_id", musicianId);
                document.body.classList.add("component-portal");
                hideLockScreen();
                
                // Activar PWA Bottom Navigation
                const mobNav = document.getElementById("component-mobile-nav");
                if (mobNav) mobNav.classList.remove("hidden");
                
                // Conectar en segundo plano a la nube
                startCloudSync();
                registerDeviceToken(musicianId);
                
                if ("Notification" in window && Notification.permission === "default") {
                    Notification.requestPermission().then(perm => {
                        if (perm === "granted") {
                            registerDeviceToken(musicianId);
                        }
                    });
                }
                
                renderActiveSection("section-componente-ficha");
                showToast(`Bienvenido/a, ${musician.name}`, "success");
            };
            
            if (!musician.pin) {
                // AUTO-REGISTRO: Es su primer login
                musician.pin = enteredPin;
                saveStateToLocalStorage();
                
                if (isCloudActive()) {
                    const db = firebase.firestore();
                    db.collection("musicians").doc(musicianId).update({ pin: enteredPin })
                        .then(() => {
                            showToast("PIN registrado correctamente como tu contraseña personal", "success");
                            performAuth();
                        })
                        .catch(err => {
                            console.error("Error al registrar PIN en Firestore:", err);
                            showToast("PIN registrado localmente (offline)", "success");
                            performAuth();
                        });
                } else {
                    showToast("PIN registrado localmente (Modo local)", "success");
                    performAuth();
                }
            } else {
                // Validación de PIN
                if (musician.pin === enteredPin) {
                    performAuth();
                } else {
                    errorMsg.classList.remove("hidden");
                    errorMsg.innerText = "PIN incorrecto. Si lo has olvidado, consulta con la Directiva.";
                    showToast("El PIN introducido es incorrecto", "error");
                }
            }
        }
    });
}

function getDemoRepertoire() {
    return [
        { id: "mar-1", title: "Amarguras", composer: "Manuel Font de Anta", status: "green", difficulty: 3 },
        { id: "mar-2", title: "Soleá dame la mano", composer: "Manuel Font de Anta", status: "yellow", difficulty: 4 },
        { id: "mar-3", title: "La Estrella Sublime", composer: "Manuel López Farfán", status: "green", difficulty: 2 },
        { id: "mar-4", title: "Rocío", composer: "Manuel Ruiz Vidriet", status: "red", difficulty: 1 }
    ];
}

function renderMarchasList() {
    const pageTitle = document.getElementById("page-title");
    if (pageTitle && document.getElementById("section-marchas").classList.contains("active")) {
        pageTitle.innerText = `Repertorio (${state.marchas ? state.marchas.length : 0})`;
    }

    const gridContainer = document.getElementById("marchas-grid-container");
    const statusColumns = document.getElementById("marchas-status-columns");
    const difficultyColumns = document.getElementById("marchas-difficulty-columns");
    const emptyState = document.getElementById("marchas-empty");
    if (!gridContainer || !statusColumns || !difficultyColumns) return;

    gridContainer.innerHTML = "";
    
    const greenList = document.getElementById("column-green-list");
    const yellowList = document.getElementById("column-yellow-list");
    const redList = document.getElementById("column-red-list");
    if (greenList) greenList.innerHTML = "";
    if (yellowList) yellowList.innerHTML = "";
    if (redList) redList.innerHTML = "";

    const diff1List = document.getElementById("column-diff-1-list");
    const diff2List = document.getElementById("column-diff-2-list");
    const diff3List = document.getElementById("column-diff-3-list");
    const diff4List = document.getElementById("column-diff-4-list");
    const diff5List = document.getElementById("column-diff-5-list");
    if (diff1List) diff1List.innerHTML = "";
    if (diff2List) diff2List.innerHTML = "";
    if (diff3List) diff3List.innerHTML = "";
    if (diff4List) diff4List.innerHTML = "";
    if (diff5List) diff5List.innerHTML = "";

    updateMarchasButtonsUI();

    const searchQuery = document.getElementById("search-marcha") ? document.getElementById("search-marcha").value.toLowerCase().trim() : "";

    // Count plays dynamically
    const playCounts = {};
    if (state.playedMarchas) {
        Object.keys(state.playedMarchas).forEach(date => {
            const list = state.playedMarchas[date] || [];
            list.forEach(mId => {
                playCounts[mId] = (playCounts[mId] || 0) + 1;
            });
        });
    }

    // Sort marchas alphabetically in-place before filtering
    (state.marchas || []).sort((a, b) => a.title.localeCompare(b.title, 'es'));

    const filteredMarchas = (state.marchas || []).filter(m => {
        const titleMatch = m.title.toLowerCase().startsWith(searchQuery);
        return titleMatch;
    });

    if (filteredMarchas.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        gridContainer.classList.add("hidden");
        statusColumns.classList.add("hidden");
        difficultyColumns.classList.add("hidden");
        return;
    } else {
        if (emptyState) emptyState.classList.add("hidden");
    }

    if (state.marchasViewMode === "list") {
        gridContainer.classList.remove("hidden");
        statusColumns.classList.add("hidden");
        difficultyColumns.classList.add("hidden");
    } else if (state.marchasViewMode === "status") {
        gridContainer.classList.add("hidden");
        statusColumns.classList.remove("hidden");
        difficultyColumns.classList.add("hidden");
    } else if (state.marchasViewMode === "difficulty") {
        gridContainer.classList.add("hidden");
        statusColumns.classList.add("hidden");
        difficultyColumns.classList.remove("hidden");
    }

    filteredMarchas.forEach(m => {
        const count = playCounts[m.id] || 0;
        
        let statusCircle = "";
        if (m.status === "green") {
            statusCircle = `<span title="Bien trabajada" style="font-size: 0.68rem; line-height: 1;">🟢</span>`;
        } else if (m.status === "yellow") {
            statusCircle = `<span title="En proceso" style="font-size: 0.68rem; line-height: 1;">🟡</span>`;
        } else {
            statusCircle = `<span title="Por trabajar" style="font-size: 0.68rem; line-height: 1;">🔴</span>`;
        }

        const diffNum = m.difficulty || 1;
        const diffBadge = `<span class="difficulty-tag" style="background-color: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.62rem; font-weight: 600; padding: 1px 3px; border-radius: 3px; line-height: 1; display: inline-flex; align-items: center; height: 13px;">N${diffNum}</span>`;

        // Render meta indicators conditionally to avoid redundancies
        let metaHtml = "";
        if (state.marchasViewMode === "list") {
            metaHtml = `${statusCircle} ${diffBadge}`;
        } else if (state.marchasViewMode === "status") {
            metaHtml = `${diffBadge}`; // Hide status circle since cards are in status columns
        } else if (state.marchasViewMode === "difficulty") {
            metaHtml = `${statusCircle}`; // Hide difficulty tag since cards are in difficulty groups
        }

        const card = document.createElement("div");
        card.className = "marcha-card-compact";
        card.style.cursor = "pointer";
        
        // Habilitar arrastrar y soltar (Drag and Drop)
        if (state.marchasViewMode === "status" || state.marchasViewMode === "difficulty") {
            card.setAttribute("draggable", "true");
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", m.id);
                setTimeout(() => card.classList.add("dragging"), 0);
            });
            card.addEventListener("dragend", () => {
                card.classList.remove("dragging");
            });
        }

        card.addEventListener("click", (e) => {
            if (e.target.closest(".marcha-actions-compact") || e.target.closest(".btn-action")) {
                return;
            }
            openMarchaNotesModal(m.id);
        });
        
        const btnStyle = `padding: 2px; background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;`;
        const iconSize = state.marchasViewMode === "list" ? 14 : 11;

        if (state.marchasViewMode === "list") {
            card.innerHTML = `
                <h4 class="marcha-title-compact" title="${m.title}" style="flex: 1; min-width: 0; margin: 0; margin-right: 8px;">${m.title}</h4>
                <div class="marcha-right-controls" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: auto;">
                    <div class="marcha-meta-compact" style="display: flex; align-items: center; gap: 6px;">
                        ${metaHtml}
                        <span class="marcha-plays-compact" title="Veces tocada">${count} ens.</span>
                    </div>
                    <div class="marcha-actions-compact" style="display: flex; align-items: center; gap: 3px;">
                        <button class="btn-action history view-marcha-history-btn" data-id="${m.id}" title="Ver Ensayos" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </button>
                        <button class="btn-action edit edit-marcha-btn" data-id="${m.id}" title="Editar Marcha" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-marcha-btn" data-id="${m.id}" title="Eliminar Marcha" style="${btnStyle} color: var(--color-absent);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Status or difficulty columns mode
            card.innerHTML = `
                <h4 class="marcha-title-compact" title="${m.title}" style="flex: 1; min-width: 0; margin: 0; margin-right: 4px;">${m.title}</h4>
                <div class="marcha-right-controls" style="display: flex; align-items: center; gap: 3px; flex-shrink: 0; margin-left: auto;">
                    <div class="marcha-meta-compact" style="display: flex; align-items: center; gap: 2px; margin-right: 0px;">
                        ${metaHtml}
                    </div>
                    <span class="marcha-plays-compact" title="Veces tocada" style="padding: 1px 3px; font-size: 0.62rem;">${count}e</span>
                    <div class="marcha-actions-compact" style="display: flex; align-items: center; gap: 2px;">
                        <button class="btn-action history view-marcha-history-btn" data-id="${m.id}" title="Ver Ensayos" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </button>
                        <button class="btn-action edit edit-marcha-btn" data-id="${m.id}" title="Editar Marcha" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-marcha-btn" data-id="${m.id}" title="Eliminar Marcha" style="${btnStyle} color: var(--color-absent);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            card.style.padding = "4px 6px";
            if (state.marchasViewMode === "status") {
                if (m.status === "green") {
                    card.style.backgroundColor = "var(--color-present-transparent)";
                    card.style.borderColor = "rgba(46, 204, 113, 0.25)";
                } else if (m.status === "yellow") {
                    card.style.backgroundColor = "var(--color-justified-transparent)";
                    card.style.borderColor = "rgba(230, 126, 34, 0.25)";
                } else {
                    card.style.backgroundColor = "var(--color-absent-transparent)";
                    card.style.borderColor = "rgba(231, 76, 60, 0.25)";
                }
            } else if (state.marchasViewMode === "difficulty") {
                card.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
                card.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }
        }

        // Bind events dynamically
        card.querySelector(".view-marcha-history-btn").addEventListener("click", () => {
            openMarchaHistoryModal(m.id);
        });

        card.querySelector(".edit-marcha-btn").addEventListener("click", () => {
            const modal = document.getElementById("modal-marcha");
            document.getElementById("modal-marcha-title").innerText = "Editar Marcha";
            document.getElementById("marcha-id").value = m.id;
            document.getElementById("marcha-title-input").value = m.title;
            document.getElementById("marcha-status-input").value = m.status || "green";
            document.getElementById("marcha-difficulty-input").value = m.difficulty || "1";
            modal.classList.add("active");
        });

        card.querySelector(".delete-marcha-btn").addEventListener("click", () => {
            if (confirm(`¿Estás seguro de que quieres eliminar la marcha "${m.title}" del repertorio? Esto también borrará sus registros de ensayos.`)) {
                // Delete from repertoire
                state.marchas = state.marchas.filter(item => item.id !== m.id);
                dbDeleteMarcha(m.id);

                // Clean from play history
                if (state.playedMarchas) {
                    Object.keys(state.playedMarchas).forEach(date => {
                        if (state.playedMarchas[date].includes(m.id)) {
                            state.playedMarchas[date] = state.playedMarchas[date].filter(id => id !== m.id);
                            dbSavePlayedMarchas(date, state.playedMarchas[date]);
                        }
                    });
                }

                saveStateToLocalStorage();
                renderMarchasList();
                renderRehearsalMarchasWidget();
                showToast("Marcha eliminada del repertorio", "error");
            }
        });

        if (state.marchasViewMode === "list") {
            gridContainer.appendChild(card);
        } else if (state.marchasViewMode === "status") {
            // Append to status column
            if (m.status === "green" && greenList) {
                greenList.appendChild(card);
            } else if (m.status === "yellow" && yellowList) {
                yellowList.appendChild(card);
            } else if (redList) {
                redList.appendChild(card);
            }
        } else if (state.marchasViewMode === "difficulty") {
            // Append to difficulty column
            const diff = parseInt(m.difficulty) || 1;
            if (diff === 1 && diff1List) diff1List.appendChild(card);
            else if (diff === 2 && diff2List) diff2List.appendChild(card);
            else if (diff === 3 && diff3List) diff3List.appendChild(card);
            else if (diff === 4 && diff4List) diff4List.appendChild(card);
            else if (diff === 5 && diff5List) diff5List.appendChild(card);
        }
    });

    // Check if columns are empty to show empty text
    if (state.marchasViewMode === "status") {
        if (greenList && greenList.children.length === 0) {
            greenList.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; text-align: center; padding: 10px;">Sin marchas.</span>`;
        }
        if (yellowList && yellowList.children.length === 0) {
            yellowList.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; text-align: center; padding: 10px;">Sin marchas.</span>`;
        }
        if (redList && redList.children.length === 0) {
            redList.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; text-align: center; padding: 10px;">Sin marchas.</span>`;
        }
    } else if (state.marchasViewMode === "difficulty") {
        const checkEmpty = (list) => {
            if (list && list.children.length === 0) {
                list.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; padding: 6px 10px;">No hay marchas en este nivel.</span>`;
            }
        };
        checkEmpty(diff1List);
        checkEmpty(diff2List);
        checkEmpty(diff3List);
        checkEmpty(diff4List);
        checkEmpty(diff5List);
    }
}

function updateMarchasButtonsUI() {
    const btnList = document.getElementById("btn-view-list");
    const btnDiff = document.getElementById("btn-view-difficulty");
    const btnStatus = document.getElementById("btn-view-status");
    if (!btnList || !btnDiff || !btnStatus) return;

    // Reset styles for all three buttons
    [btnList, btnDiff, btnStatus].forEach(b => {
        b.style.backgroundColor = "var(--color-purple-dark)";
        b.style.borderColor = "var(--border-color)";
        b.style.color = "var(--text-secondary)";
    });

    // Set active button styles
    let activeBtn;
    if (state.marchasViewMode === "list") {
        activeBtn = btnList;
    } else if (state.marchasViewMode === "difficulty") {
        activeBtn = btnDiff;
    } else if (state.marchasViewMode === "status") {
        activeBtn = btnStatus;
    }

    if (activeBtn) {
        activeBtn.style.backgroundColor = "var(--color-purple-dark)";
        activeBtn.style.borderColor = "var(--color-gold)";
        activeBtn.style.color = "var(--color-gold)";
    }
}

function renderRehearsalMarchasWidget() {
    const card = document.getElementById("rehearsal-marchas-card");
    if (card) {
        const date = state.currentDate;
        const sessionInfo = state.sessionTypes[date];
        const isGeneralRehearsal = sessionInfo && sessionInfo.type === "ensayo" && !isSectionRehearsal(sessionInfo);
        
        if (!isGeneralRehearsal) {
            card.classList.add("hidden");
            return;
        } else {
            card.classList.remove("hidden");
        }
    }

    const select = document.getElementById("select-add-marcha-today");
    const listDiv = document.getElementById("rehearsal-marchas-list");
    if (!select || !listDiv) return;

    const date = state.currentDate;
    const playedToday = state.playedMarchas[date] || [];

    // Populate dropdown
    select.innerHTML = `<option value="" disabled selected>Selecciona marcha ensayada...</option>`;
    
    // Sort repertoire alphabetically
    const sortedRepertoire = [...(state.marchas || [])].sort((a, b) => a.title.localeCompare(b.title));
    
    sortedRepertoire.forEach(m => {
        // Only show marchas not already added today
        if (!playedToday.includes(m.id)) {
            const option = document.createElement("option");
            option.value = m.id;
            if (m.composer && m.composer.trim() !== "" && m.composer.toLowerCase() !== "anónimo" && m.composer.toLowerCase() !== "anonimo") {
                option.innerText = `${m.title} (${m.composer})`;
            } else {
                option.innerText = m.title;
            }
            select.appendChild(option);
        }
    });

    // Populate list of badges
    listDiv.innerHTML = "";

    if (playedToday.length === 0) {
        listDiv.innerHTML = `<span class="text-muted" style="font-size: 0.85rem; font-style: italic;">No se han registrado marchas para el día de hoy. Elige una del repertorio y añádela.</span>`;
        return;
    }

    playedToday.forEach(mId => {
        const marcha = (state.marchas || []).find(m => m.id === mId);
        const name = marcha ? marcha.title : "Marcha Desconocida";
        
        const badge = document.createElement("div");
        badge.className = "marcha-tag";
        badge.innerHTML = `
            <span>${name}</span>
            <button class="marcha-tag-delete" title="Quitar marcha" data-id="${mId}">&times;</button>
        `;

        badge.querySelector(".marcha-tag-delete").addEventListener("click", () => {
            state.playedMarchas[date] = state.playedMarchas[date].filter(id => id !== mId);
            dbSavePlayedMarchas(date, state.playedMarchas[date]);
            
            renderRehearsalMarchasWidget();
            renderMarchasList();
            showToast("Marcha quitada de la sesión de hoy", "warning");
        });

        listDiv.appendChild(badge);
    });
}

// ==========================================================================
// MODAL: HISTORIAL DE ENSAYOS DE UNA MARCHA
// ==========================================================================
function openMarchaHistoryModal(marchId) {
    const m = state.marchas.find(item => item.id === marchId);
    if (!m) return;

    document.getElementById("marcha-history-repertoire-info").innerText = m.title;

    const datesPlayed = Object.keys(state.playedMarchas || {}).filter(date => {
        const isRehearsal = !state.sessionTypes[date] || state.sessionTypes[date].type === "ensayo";
        return isRehearsal && state.playedMarchas[date].includes(marchId);
    }).sort((a, b) => b.localeCompare(a));

    const tbody = document.getElementById("marcha-history-table-body");
    const emptyState = document.getElementById("marcha-history-empty");
    const tableCard = tbody.closest(".card-table");
    tbody.innerHTML = "";

    if (datesPlayed.length === 0) {
        emptyState.classList.remove("hidden");
        tableCard.classList.add("hidden");
    } else {
        emptyState.classList.add("hidden");
        tableCard.classList.remove("hidden");
        
        datesPlayed.forEach(date => {
            const dayRecord = state.attendance[date] || {};
            const sessionInfo = state.sessionTypes[date];
            const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
            const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
            
            let present = 0;
            let total = 0;
            
            state.musicians.forEach(mus => {
                if (isSpecialRehearsal && !convocated.includes(mus.instrument)) return;
                total++;
                if (dayRecord[mus.id] && dayRecord[mus.id].status === "present") {
                    present++;
                }
            });
            
            const ratio = total > 0 ? Math.round((present / total) * 100) : 0;
            
            let labelText = "General";
            if (sessionInfo) {
                const sub = sessionInfo.subtype;
                if (sub === "trompetas1") labelText = "Trompetas 1ª";
                else if (sub === "bajos") labelText = "Bajos";
                else if (sub === "trompetas2y3") labelText = "Trompetas 2ª y 3ª";
                else if (sub === "cornetas") labelText = "Cornetas";
                else if (sub === "percusion") labelText = "Percusión";
                else if (sub === "voces") labelText = "Voces";
                else if (sub === "primeras") labelText = "Primeras";
            }
            
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="white-space: nowrap; font-weight: 600;">${formatDateSpanish(date)}</td>
                <td style="white-space: nowrap;">
                    <span class="musician-count-badge" style="font-size: 0.8rem; background-color: var(--bg-primary); border-color: var(--border-color); display: inline-block;">
                        ${labelText}
                    </span>
                </td>
                <td style="white-space: nowrap; font-weight: 600; color: var(--color-gold);">${ratio}%</td>
            `;
            tbody.appendChild(tr);
        });
    }

    document.getElementById("modal-marcha-history").classList.add("active");
}

// ==========================================================================
// SECCIÓN: CALENDARIO MENSUAL Y OBJETIVOS
// ==========================================================================
function renderCalendar() {
    const grid = document.getElementById("calendar-days-grid");
    const monthYearHeader = document.getElementById("calendar-month-year");
    if (!grid || !monthYearHeader) return;

    grid.innerHTML = "";

    // Inicializar fecha del calendario si no está definida
    if (state.calendarYear === undefined || state.calendarMonth === undefined) {
        const today = new Date();
        state.calendarYear = today.getFullYear();
        state.calendarMonth = today.getMonth();
    }

    const year = state.calendarYear;
    const month = state.calendarMonth;

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    monthYearHeader.innerText = `${monthNames[month]} ${year}`;

    // Obtener primer día del mes y total de días
    const firstDay = new Date(year, month, 1);
    // Ajustar para empezar en Lunes (0=Lunes, 6=Domingo)
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;

    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // Fecha de hoy para destacar
    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDay = today.getDate();

    // Array para acumular las 42 celdas de días
    const cells = [];

    // 1. Días del mes anterior (relleno)
    let prevYear = year;
    let prevMonth = month - 1;
    if (prevMonth === -1) {
        prevMonth = 11;
        prevYear--;
    }
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayNum = prevMonthTotalDays - i;
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day-card other-month";
        dayCell.innerHTML = `<span class="calendar-day-number">${dayNum}</span>`;
        const prevMonthStr = String(prevMonth + 1).padStart(2, '0');
        const prevDayStr = String(dayNum).padStart(2, '0');
        dayCell.setAttribute("data-date", `${prevYear}-${prevMonthStr}-${prevDayStr}`);
        cells.push(dayCell);
    }

    // 2. Días del mes actual
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day-card";
        
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateKey = `${year}-${monthStr}-${dayStr}`;
        
        dayCell.setAttribute("data-date", dateKey);
        
        if (isThisMonth && day === todayDay) {
            dayCell.classList.add("today");
        }

        dayCell.innerHTML = `<span class="calendar-day-number">${day}</span>`;

        // Buscar todas las sesiones creadas para este día
        const daySessions = Object.keys(state.sessionTypes)
            .filter(key => key.startsWith(dateKey))
            .map(key => ({ key, ...state.sessionTypes[key] }));
            
        const hasActuacion = daySessions.some(session => session.type === "actuacion");
        if (hasActuacion) {
            dayCell.classList.add("has-actuacion");
        }
            
        daySessions.forEach(session => {
            const tag = document.createElement("div");
            tag.className = "calendar-session-tag";
            
            // Evento click al tag para ver estadísticas del ensayo/actuación
            tag.addEventListener("click", (e) => {
                e.stopPropagation(); // Evitar abrir configuración rápida del día
                if (session.type === "actuacion") {
                    openActuacionDetailModal(session.key);
                } else if (session.type === "ensayo") {
                    openRehearsalDetailModal(session.key);
                }
            });
            
            if (session.type === "actuacion") {
                tag.classList.add("calendar-session-actuacion");
                tag.innerText = `⭐ ${session.name || 'Actuación'}`;
            } else if (session.type === "ensayo") {
                const sub = session.subtype;
                if (sub === "trompetas1") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Trompetas 1ª`;
                } else if (sub === "bajos") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Bajos`;
                } else if (sub === "trompetas2y3") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Trompetas 2ª y 3ª`;
                } else if (sub === "cornetas") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Cornetas`;
                } else if (sub === "percusion") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Percusión`;
                } else if (sub === "voces") {
                    const count = session.convocatedVoices ? session.convocatedVoices.length : 0;
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Voces (${count})`;
                } else if (sub === "primeras") {
                    tag.classList.add("calendar-session-ensayo-voces");
                    tag.innerText = `👥 Primeras`;
                } else {
                    tag.classList.add("calendar-session-ensayo-general");
                    tag.innerText = `🎺 General`;
                }
            }
            dayCell.appendChild(tag);
        });

        // Evento click para planificar sesión (Añadir nueva sesión)
        dayCell.addEventListener("click", () => {
            state.isAddingNewSession = true;
            state.currentDate = dateKey;
            document.getElementById("attendance-date").value = dateKey;
            
            const modalQuickSession = document.getElementById("modal-quick-session");
            document.getElementById("quick-session-title").innerText = `Configurar Sesión - ${formatDateSpanish(dateKey)}`;
            
            // Reset modal values for a fresh new session
            document.getElementById("quick-session-actuacion-name").value = "";
            document.getElementById("quick-session-type").value = "ensayo-general";
            if (document.getElementById("quick-session-location")) {
                document.getElementById("quick-session-location").value = "Parking";
            }
            
            // Hide actuation name field by default
            const actuacionGroup = document.getElementById("quick-session-actuacion-group");
            actuacionGroup.classList.add("hidden");
            
            const locationGroup = document.getElementById("quick-session-location-group");
            if (locationGroup) {
                locationGroup.classList.remove("hidden");
            }
            
            modalQuickSession.classList.add("active");
        });

        cells.push(dayCell);
    }

    // 3. Días del mes siguiente (relleno para completar las 6 semanas / 42 celdas)
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 12) {
        nextMonth = 0;
        nextYear++;
    }
    const gridCellCount = cells.length;
    const paddingNeeded = 42 - gridCellCount;
    for (let day = 1; day <= paddingNeeded; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day-card other-month";
        dayCell.innerHTML = `<span class="calendar-day-number">${day}</span>`;
        const nextMonthStr = String(nextMonth + 1).padStart(2, '0');
        const nextDayStr = String(day).padStart(2, '0');
        dayCell.setAttribute("data-date", `${nextYear}-${nextMonthStr}-${nextDayStr}`);
        cells.push(dayCell);
    }

    // 4. Renderizar las semanas agregando el botón de descarga en la 8ª columna
    for (let w = 0; w < 6; w++) {
        for (let d = 0; d < 7; d++) {
            grid.appendChild(cells[w * 7 + d]);
        }
        
        const firstDayCell = cells[w * 7];
        const lastDayCell = cells[w * 7 + 6];
        const startDate = firstDayCell.getAttribute("data-date");
        const endDate = lastDayCell.getAttribute("data-date");
        
        const downloadCell = document.createElement("div");
        downloadCell.className = "calendar-download-week-card";
        downloadCell.style.cssText = "display: flex; align-items: center; justify-content: center; background-color: var(--bg-secondary); border: 1px dashed var(--border-color); border-radius: 6px; padding: 4px; box-sizing: border-box; min-height: 50px;";
        downloadCell.innerHTML = `
            <button class="btn-download-week" data-start="${startDate}" data-end="${endDate}" title="Ver Resumen Semanal" style="background: none; border: none; cursor: pointer; color: var(--color-gold); padding: 8px; display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; transition: var(--transition-fast);">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </button>
        `;
        
        const btn = downloadCell.querySelector(".btn-download-week");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            openWeeklyReportModal(startDate, endDate, w + 1);
        });
        
        // Efecto hover
        btn.addEventListener("mouseenter", () => {
            btn.style.color = "var(--text-primary)";
            btn.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.color = "var(--color-gold)";
            btn.style.backgroundColor = "transparent";
        });
        
        grid.appendChild(downloadCell);
    }

    // Enlazar eventos de navegación una sola vez
    if (!window.calendarEventsBound) {
        window.calendarEventsBound = true;
        
        document.getElementById("btn-calendar-prev").addEventListener("click", () => {
            state.calendarMonth--;
            if (state.calendarMonth === -1) {
                state.calendarMonth = 11;
                state.calendarYear--;
            }
            renderCalendar();
        });

        document.getElementById("btn-calendar-next").addEventListener("click", () => {
            state.calendarMonth++;
            if (state.calendarMonth === 12) {
                state.calendarMonth = 0;
                state.calendarYear++;
            }
            renderCalendar();
        });

        document.getElementById("btn-calendar-today").addEventListener("click", () => {
            const today = new Date();
            state.calendarYear = today.getFullYear();
            state.calendarMonth = today.getMonth();
            renderCalendar();
        });

        const yearSelect = document.getElementById("weekly-goals-year-select");
        if (yearSelect) {
            yearSelect.addEventListener("change", () => {
                renderWeeklyGoalsList();
            });
        }
    }
}

// ==========================================================================
// OBJETIVOS SEMANALES Y PLANIFICACIÓN DE REPERTORIO
// ==========================================================================
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

function getWeeksGroupedByMonth(year) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const grouped = {};
    months.forEach(m => grouped[m] = []);

    // Empezar el 1 de Enero
    let d = new Date(year, 0, 1);
    
    // Retroceder al lunes de la semana que contiene el 1 de Enero
    const dayOfWeek = d.getDay(); // 0 = Domingo, 1 = Lunes...
    const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    d = new Date(year, 0, diff);

    const end = new Date(year + 1, 0, 7);
    while (d < end) {
        const monday = new Date(d);
        const sunday = new Date(d);
        sunday.setDate(monday.getDate() + 6);

        const monthName = months[monday.getMonth()];
        
        if (monday.getFullYear() === year || sunday.getFullYear() === year) {
            const weekKey = `${monday.getFullYear()}_W${String(getWeekNumber(monday)).padStart(2, '0')}`;
            grouped[monthName].push({
                key: weekKey,
                fullLabel: `Semana del ${monday.getDate()} al ${sunday.getDate()} de ${months[sunday.getMonth()]}`
            });
        }
        d.setDate(d.getDate() + 7);
    }
    return grouped;
}

function renderWeeklyGoalsList() {
    const container = document.getElementById("weekly-goals-container");
    if (!container) return;
    
    const yearSelect = document.getElementById("weekly-goals-year-select");
    const year = parseInt(yearSelect.value) || new Date().getFullYear();
    
    container.innerHTML = "";
    
    const weeksGrouped = getWeeksGroupedByMonth(year);
    
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    monthNames.forEach(month => {
        const weeks = weeksGrouped[month];
        if (!weeks || weeks.length === 0) return;
        
        const monthGroup = document.createElement("div");
        monthGroup.style.marginBottom = "15px";
        monthGroup.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: var(--color-gold); font-size: 0.95rem; text-transform: uppercase; border-left: 3px solid var(--color-gold); padding-left: 8px; line-height: 1; font-family: inherit;">${month}</h4>
            <div class="weeks-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
        `;
        
        const weeksListContainer = monthGroup.querySelector(".weeks-list");
        
        weeks.forEach(week => {
            const weekRow = document.createElement("div");
            weekRow.className = "week-goal-row";
            weekRow.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background-color: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 6px; gap: 15px; flex-wrap: wrap;";
            
            const goals = state.weeklyGoals[week.key] || [];
            
            let badgesHtml = "";
            if (goals.length === 0) {
                badgesHtml = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic;">Sin objetivos de repertorio</span>`;
            } else {
                goals.forEach(marchaId => {
                    const marcha = state.marchas.find(m => m.id === marchaId);
                    const name = marcha ? marcha.title : marchaId;
                    badgesHtml += `
                        <span class="badge" style="background-color: rgba(212, 175, 55, 0.1); color: var(--color-gold); border: 1px solid rgba(212, 175, 55, 0.2); font-size: 0.72rem; padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 6px; margin: 2px;">
                            ${name}
                            <button class="btn-delete-week-goal" data-week="${week.key}" data-marcha-id="${marchaId}" style="background: none; border: none; padding: 0; color: var(--color-absent); cursor: pointer; font-size: 0.9rem; font-weight: bold; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; line-height: 1;">&times;</button>
                        </span>
                    `;
                });
            }
            
            const availableMarchas = state.marchas
                .filter(m => !goals.includes(m.id))
                .sort((a, b) => a.title.localeCompare(b.title));
                
            let selectOptions = `<option value="">+ Añadir marcha...</option>`;
            availableMarchas.forEach(m => {
                selectOptions += `<option value="${m.id}">${m.title}</option>`;
            });
            
            weekRow.innerHTML = `
                <div style="flex: 0 0 220px; font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${week.fullLabel}</div>
                <div class="week-goals-badges-container" style="flex: 1; display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
                    ${badgesHtml}
                </div>
                <div style="flex: 0 0 160px; text-align: right;">
                    <select class="add-weekly-goal-select" data-week="${week.key}" style="font-size: 0.8rem; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-color); background-color: var(--bg-primary); color: var(--text-primary); width: 100%; box-sizing: border-box; cursor: pointer;">
                        ${selectOptions}
                    </select>
                </div>
            `;
            
            weekRow.querySelectorAll(".btn-delete-week-goal").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const weekKey = btn.getAttribute("data-week");
                    const marchaId = btn.getAttribute("data-marcha-id");
                    removeWeeklyGoal(weekKey, marchaId);
                });
            });
            
            const selectEl = weekRow.querySelector(".add-weekly-goal-select");
            selectEl.addEventListener("change", () => {
                const selectedMarchaId = selectEl.value;
                if (!selectedMarchaId) return;
                const weekKey = selectEl.getAttribute("data-week");
                addWeeklyGoal(weekKey, selectedMarchaId);
            });
            
            weeksListContainer.appendChild(weekRow);
        });
        
        container.appendChild(monthGroup);
    });
}

function addWeeklyGoal(weekKey, marchaId) {
    if (!state.weeklyGoals) {
        state.weeklyGoals = {};
    }
    if (!state.weeklyGoals[weekKey]) {
        state.weeklyGoals[weekKey] = [];
    }
    if (!state.weeklyGoals[weekKey].includes(marchaId)) {
        state.weeklyGoals[weekKey].push(marchaId);
        dbSaveWeeklyGoal(weekKey, state.weeklyGoals[weekKey]);
        renderWeeklyGoalsList();
        showToast("Objetivo de repertorio añadido", "success");
    }
}

function removeWeeklyGoal(weekKey, marchaId) {
    if (!state.weeklyGoals || !state.weeklyGoals[weekKey]) return;
    state.weeklyGoals[weekKey] = state.weeklyGoals[weekKey].filter(id => id !== marchaId);
    dbSaveWeeklyGoal(weekKey, state.weeklyGoals[weekKey]);
    renderWeeklyGoalsList();
    showToast("Objetivo de repertorio eliminado", "info");
}

function dbSaveWeeklyGoal(weekKey, goalsArray) {
    saveStateToLocalStorage();
    if (!isCloudActive()) return;
    const db = firebase.firestore();
    if (goalsArray.length === 0) {
        db.collection("weeklyGoals").doc(weekKey).delete()
            .catch(err => console.error("Error al borrar objetivo semanal:", err));
    } else {
        db.collection("weeklyGoals").doc(weekKey).set({ goals: goalsArray })
            .catch(err => console.error("Error al guardar objetivo semanal:", err));
    }
}

// ==========================================================================
// SECCIÓN: NOTAS DE LA DIRECCIÓN DE MARCHAS
// ==========================================================================
let currentNotesMarchaId = null;

function openMarchaNotesModal(marchaId) {
    const marcha = state.marchas.find(m => m.id === marchaId);
    if (!marcha) return;

    currentNotesMarchaId = marchaId;
    
    document.getElementById("marcha-notes-subtitle").innerText = marcha.title;
    document.getElementById("textarea-marcha-notes").value = marcha.notes || "";
    
    document.getElementById("modal-marcha-notes").classList.add("active");
}

function closeMarchaNotesModal() {
    currentNotesMarchaId = null;
    document.getElementById("modal-marcha-notes").classList.remove("active");
}

function saveMarchaNotes() {
    if (!currentNotesMarchaId) return;
    
    const notesText = document.getElementById("textarea-marcha-notes").value.trim();
    const marcha = state.marchas.find(m => m.id === currentNotesMarchaId);
    if (marcha) {
        marcha.notes = notesText;
        dbSaveMarcha(marcha);
        showToast("Notas de la dirección guardadas", "success");
    }
    
    closeMarchaNotesModal();
}

// ==========================================================================
// GENERACIÓN DE IMAGEN RESUMEN SEMANAL (CANVAS CLIENT-SIDE)
// ==========================================================================
// ==========================================================================
// SECCIÓN: RESUMEN SEMANAL (MODAL E IMAGEN DE GRUPO)
// ==========================================================================
function getWeekKeyForDateString(dateStr) {
    const parts = dateStr.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7; // Lunes=0, Domingo=6
    target.setDate(target.getDate() - dayNr + 3); // Thursday
    const year = target.getFullYear();
    const weekNo = getWeekNumber(d);
    return `${year}_W${String(weekNo).padStart(2, '0')}`;
}

function openWeeklyReportModal(startDate, endDate, weekNumber) {
    // 1. Obtener clave semanal y marchas planificadas
    const weekKey = getWeekKeyForDateString(startDate);
    const goals = state.weeklyGoals[weekKey] || [];
    const marchasTitles = goals.map(id => {
        const m = state.marchas.find(x => x.id === id);
        return m ? m.title : id;
    });

    // 2. Recopilar sesiones de la semana con su información detallada
    const dateKeysInWeek = [];
    const start = new Date(startDate);
    for (let i = 0; i < 7; i++) {
        const temp = new Date(start);
        temp.setDate(start.getDate() + i);
        const y = temp.getFullYear();
        const m = String(temp.getMonth() + 1).padStart(2, '0');
        const d = String(temp.getDate()).padStart(2, '0');
        dateKeysInWeek.push(`${y}-${m}-${d}`);
    }

    let totalPresent = 0;
    let totalConvocados = 0;
    const weekSessions = [];

    const sectionPresents = {};
    const sectionConvocados = {};

    dateKeysInWeek.forEach(dateKey => {
        const daySessions = Object.keys(state.sessionTypes)
            .filter(key => key.startsWith(dateKey))
            .map(key => ({ key, ...state.sessionTypes[key] }));

        daySessions.forEach(session => {
            const attRecord = state.attendance[session.key] || {};
            const isSpecial = isSectionRehearsal(session);
            const convocatedVoices = isSpecial ? (session.convocatedVoices || []) : [];

            let presents = 0;
            let convocados = 0;

            state.musicians.forEach(mus => {
                if (isSpecial && !convocatedVoices.includes(mus.instrument)) return;
                
                convocados++;
                const att = attRecord[mus.id] || { status: "absent" };
                const isPresent = att.status === "present";
                if (isPresent) presents++;

                const section = mus.instrument;
                if (!sectionPresents[section]) sectionPresents[section] = 0;
                if (!sectionConvocados[section]) sectionConvocados[section] = 0;

                sectionConvocados[section]++;
                if (isPresent) sectionPresents[section]++;
            });

            if (convocados > 0) {
                totalPresent += presents;
                totalConvocados += convocados;
            }

            weekSessions.push({
                key: session.key,
                name: session.name,
                type: session.type,
                subtype: session.subtype,
                presents,
                convocados
            });
        });
    });

    const attendancePct = totalConvocados > 0 ? Math.round((totalPresent / totalConvocados) * 100) : null;

    let bestSection = "N/A";
    let bestRatio = -1;
    Object.keys(sectionConvocados).forEach(sec => {
        if (sectionConvocados[sec] >= 2) {
            const ratio = sectionPresents[sec] / sectionConvocados[sec];
            if (ratio > bestRatio) {
                bestRatio = ratio;
                bestSection = sec;
            }
        }
    });

    const bestSectionLabel = bestRatio >= 0 ? `${bestSection} (${Math.round(bestRatio * 100)}%)` : "Ninguna registrada";
    const finalMarchas = marchasTitles.length > 0 ? marchasTitles : ["Sin objetivos de repertorio planificados"];

    // Calcular asistencia por voces
    const voicesAttendance = [];
    Object.keys(sectionConvocados).forEach(sec => {
        const presentsCount = sectionPresents[sec] || 0;
        const convocadosCount = sectionConvocados[sec] || 0;
        if (convocadosCount > 0) {
            const pctVal = Math.round((presentsCount / convocadosCount) * 100);
            voicesAttendance.push({ name: sec, pct: pctVal, presents: presentsCount, convocados: convocadosCount });
        }
    });
    voicesAttendance.sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name));

    // Validar si hay actividad antes de abrir
    if (weekSessions.length === 0 && goals.length === 0) {
        showToast("No hay ensayos, actuaciones ni objetivos de repertorio en esta semana.", "info");
        return;
    }

    // 3. Rellenar los campos del Modal
    document.getElementById("weekly-report-dates").innerText = `Semana del ${formatDateLabel(startDate)} al ${formatDateLabel(endDate)}`;
    document.getElementById("weekly-report-pct").innerText = attendancePct !== null ? `${attendancePct}%` : "Sin ensayos";
    document.getElementById("weekly-report-best").innerText = bestRatio >= 0 ? bestSectionLabel : "N/A";

    // Rellenar lista de sesiones realizadas
    const sessionsListContainer = document.getElementById("weekly-report-sessions-list");
    sessionsListContainer.innerHTML = "";
    if (weekSessions.length === 0) {
        sessionsListContainer.innerHTML = `<p class="text-muted" style="font-size: 0.8rem; font-style: italic; margin: 5px 0;">No se celebraron ensayos ni actuaciones esta semana.</p>`;
    } else {
        weekSessions.forEach(s => {
            const pct = s.convocados > 0 ? Math.round((s.presents / s.convocados) * 100) : 0;
            const dateStr = s.key.substring(0, 10);
            
            let typeLabel = "Ensayo General";
            if (s.type === "actuacion") {
                typeLabel = "⭐ Actuación";
            } else if (s.subtype === "trompetas1") {
                typeLabel = "👥 Ensayo Voz (Trompetas 1ª)";
            } else if (s.subtype === "bajos") {
                typeLabel = "👥 Ensayo Voz (Bajos)";
            } else if (s.subtype === "trompetas2y3") {
                typeLabel = "👥 Ensayo Voz (Trompetas 2ª y 3ª)";
            } else if (s.subtype === "cornetas") {
                typeLabel = "👥 Ensayo Voz (Cornetas)";
            } else if (s.subtype === "percusion") {
                typeLabel = "👥 Ensayo Voz (Percusión)";
            } else if (s.subtype === "voces") {
                typeLabel = "👥 Ensayo Voces";
            } else if (s.subtype === "primeras") {
                typeLabel = "👥 Ensayo Voz (Primeras)";
            }

            const labelText = s.name ? `${s.name} (${typeLabel})` : typeLabel;
            
            const sessionRow = document.createElement("div");
            sessionRow.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 6px; font-size: 0.82rem; margin-bottom: 6px;";
            sessionRow.innerHTML = `
                <div style="text-align: left;">
                    <strong style="color: var(--color-gold);">${formatDateSpanish(dateStr)}</strong> - ${labelText}
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Componentes: ${s.presents} presentes de ${s.convocados} convocados</div>
                </div>
                <div style="font-weight: 600; font-size: 0.88rem; color: ${pct >= 80 ? 'var(--color-present)' : (pct >= 50 ? 'var(--color-justified)' : 'var(--color-absent)')};">
                    ${pct}%
                </div>
            `;
            sessionsListContainer.appendChild(sessionRow);
        });
    }

    // Rellenar lista de asistencia por voces
    const voicesListContainer = document.getElementById("weekly-report-voices-list");
    if (voicesListContainer) {
        voicesListContainer.innerHTML = "";
        if (voicesAttendance.length === 0) {
            voicesListContainer.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; margin: 5px 0; display: block;">Sin datos de voces</span>`;
        } else {
            voicesAttendance.forEach(v => {
                const badge = document.createElement("span");
                badge.className = "badge";
                const pctColor = v.pct >= 80 ? 'var(--color-present)' : (v.pct >= 50 ? 'var(--color-justified)' : 'var(--color-absent)');
                const pctBg = v.pct >= 80 ? 'rgba(46, 204, 113, 0.1)' : (v.pct >= 50 ? 'rgba(241, 196, 15, 0.1)' : 'rgba(231, 76, 60, 0.1)');
                badge.style.cssText = `background-color: ${pctBg}; color: ${pctColor}; border: 1px solid ${pctColor}33; font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; display: inline-flex; align-items: center; margin: 2px; font-weight: 500;`;
                badge.innerText = `${v.name}: ${v.pct}%`;
                voicesListContainer.appendChild(badge);
            });
        }
    }

    // Rellenar lista de objetivos de repertorio
    const repertoireContainer = document.getElementById("weekly-report-repertoire-list");
    repertoireContainer.innerHTML = "";
    if (goals.length === 0) {
        repertoireContainer.innerHTML = `<span class="text-muted" style="font-size: 0.8rem; font-style: italic; margin-top: 5px; display: block;">Sin objetivos planificados</span>`;
    } else {
        goals.forEach(marchaId => {
            const m = state.marchas.find(x => x.id === marchaId);
            const name = m ? m.title : marchaId;
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.style.cssText = "background-color: rgba(212, 175, 55, 0.1); color: var(--color-gold); border: 1px solid rgba(212, 175, 55, 0.2); font-size: 0.75rem; padding: 4px 10px; border-radius: 4px; display: inline-flex; align-items: center; margin: 2px;";
            badge.innerText = name;
            repertoireContainer.appendChild(badge);
        });
    }

    // 4. Configurar botón de descarga de imagen
    const btnDownload = document.getElementById("btn-download-report-image");
    const newBtn = btnDownload.cloneNode(true);
    btnDownload.parentNode.replaceChild(newBtn, btnDownload);

    newBtn.addEventListener("click", () => {
        drawWeeklySummaryCanvas(startDate, endDate, weekNumber, attendancePct, bestSectionLabel, finalMarchas, weekSessions, voicesAttendance);
    });

    // 5. Mostrar Modal
    const modal = document.getElementById("modal-weekly-report");
    modal.classList.add("active");

    // Configurar cierres seguros
    const btnClose = document.getElementById("btn-close-weekly-report");
    const closeHandler = () => {
        modal.classList.remove("active");
        btnClose.removeEventListener("click", closeHandler);
        modal.removeEventListener("click", overlayCloseHandler);
    };
    const overlayCloseHandler = (e) => {
        if (e.target === modal) {
            closeHandler();
        }
    };
    
    btnClose.addEventListener("click", closeHandler);
    modal.addEventListener("click", overlayCloseHandler);
}

function drawWeeklySummaryCanvas(startDate, endDate, weekNumber, attendancePct, bestSectionLabel, marchasTitles, weekSessions, voicesAttendance) {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");

    // 1. Fondo degradado premium (granate/vino a negro)
    const grad = ctx.createLinearGradient(0, 0, 0, 1080);
    grad.addColorStop(0, "#2c060c");
    grad.addColorStop(0.5, "#1b0206");
    grad.addColorStop(1, "#0a0002");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // 2. Bordes elegantes dorados y granas
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#4d0a14";
    ctx.strokeRect(20, 20, 1040, 1040);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#D4AF37";
    ctx.strokeRect(30, 30, 1020, 1020);

    // Ornamentos de esquinas
    drawCornerOrnaments(ctx);

    // 3. Encabezado principal
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 44px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("RESUMEN SEMANAL DE ENSAYOS", 540, 110);

    const dateRangeStr = `Semana del ${formatDateLabel(startDate)} al ${formatDateLabel(endDate)}`;
    ctx.font = "500 24px 'Outfit', sans-serif";
    ctx.fillStyle = "#EAEAEA";
    ctx.fillText(dateRangeStr.toUpperCase(), 540, 165);

    drawDecorativeLine(ctx, 340, 740, 200);

    // 4. Panel Izquierdo: Métricas
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
    ctx.lineWidth = 1;
    roundRect(ctx, 80, 250, 420, 720, 16, true, true);

    ctx.font = "bold 26px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("MÉTRICAS SEMANALES", 290, 300);

    if (attendancePct !== null) {
        // Círculo de porcentaje de asistencia
        const cx = 290;
        const cy = 415;
        const radius = 65;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, radius, -0.5 * Math.PI, (-0.5 + 2 * (attendancePct / 100)) * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#D4AF37";
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.font = "bold 42px 'Outfit', sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${attendancePct}%`, cx, cy - 3);

        ctx.font = "600 13px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText("ASISTENCIA", cx, cy + 26);
    } else {
        ctx.font = "italic 22px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText("Sin ensayos", 290, 400);
        ctx.fillText("registrados", 290, 435);
    }

    ctx.font = "600 18px 'Outfit', sans-serif";
    ctx.fillStyle = "#EAEAEA";
    ctx.fillText("SECCIÓN LÍDER DE LA SEMANA", 290, 535);

    ctx.font = "bold 24px 'Outfit', sans-serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText(bestSectionLabel, 290, 575);

    drawDecorativeLine(ctx, 210, 370, 620);
 
    ctx.font = "bold 16px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("PARTICIPACIÓN POR VOCES", 290, 660);
 
    // Dibujar todas las voces en dos columnas compactas
    const allVoices = voicesAttendance || [];
    if (allVoices.length === 0) {
        ctx.font = "italic 16px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("Sin datos de voces", 290, 760);
    } else {
        const colWidth = 170;
        const colGap = 40;
        const startX = 100;
        
        allVoices.forEach((v, idx) => {
            const isLeft = idx % 2 === 0;
            const colX = isLeft ? startX : (startX + colWidth + colGap);
            const rowIdx = Math.floor(idx / 2);
            const rowY = 695 + rowIdx * 45;
 
            // Evitar desbordar la caja
            if (rowY + 25 > 950) return; 
 
            // Nombre de la voz a la izquierda de la columna (truncar si es largo)
            ctx.textAlign = "left";
            ctx.font = "600 13px 'Outfit', sans-serif";
            ctx.fillStyle = "#EAEAEA";
            
            const maxNameWidth = colWidth - 45;
            let displayName = v.name;
            if (ctx.measureText(displayName).width > maxNameWidth) {
                while (ctx.measureText(displayName + "...").width > maxNameWidth && displayName.length > 0) {
                    displayName = displayName.slice(0, -1);
                }
                displayName = displayName.trim() + "...";
            }
            ctx.fillText(displayName, colX, rowY);
 
            // Porcentaje a la derecha de la columna
            ctx.textAlign = "right";
            ctx.font = "bold 13px 'Outfit', sans-serif";
            ctx.fillStyle = v.pct >= 80 ? "#2ECC71" : (v.pct >= 50 ? "#F1C40F" : "#E74C3C");
            ctx.fillText(`${v.pct}%`, colX + colWidth, rowY);
 
            // Barra de progreso abajo
            const barY = rowY + 8;
            ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
            roundRect(ctx, colX, barY, colWidth, 5, 2.5, true, false);
 
            const fillWidth = Math.round(colWidth * (v.pct / 100));
            if (fillWidth > 0) {
                ctx.fillStyle = v.pct >= 80 ? "#2ECC71" : (v.pct >= 50 ? "#F1C40F" : "#E74C3C");
                roundRect(ctx, colX, barY, fillWidth, 5, 2.5, true, false);
            }
        });
    }
 
    ctx.textAlign = "center";
    ctx.font = "italic 16px 'Outfit', sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillText("Suena Yacente", 790, 945);

    // 5. Panel Derecho: Sesiones realizadas y Objetivos (Espacio compartido)
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
    ctx.lineWidth = 1;
    roundRect(ctx, 580, 250, 420, 720, 16, true, true);

    // Cabecera superior: Sesiones Realizadas
    ctx.font = "bold 24px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("SESIONES DE LA SEMANA", 790, 300);

    // Listar sesiones
    let startY = 360;
    const realSessions = weekSessions || [];
    if (realSessions.length === 0) {
        ctx.textAlign = "center";
        ctx.font = "italic 18px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("Sin sesiones registradas", 790, 440);
    } else {
        realSessions.forEach((s, idx) => {
            if (idx < 4) { // Máximo 4 para el espacio superior
                const dateStr = s.key.substring(0, 10);
                const formattedDate = formatDateLabel(dateStr);
                
                let typeLabel = "Ensayo General";
                if (s.type === "actuacion") {
                    typeLabel = "⭐ Actuación";
                } else if (s.subtype === "trompetas1") {
                    typeLabel = "Ensayo Trompetas 1ª";
                } else if (s.subtype === "bajos") {
                    typeLabel = "Ensayo Bajos";
                } else if (s.subtype === "trompetas2y3") {
                    typeLabel = "Ensayo Trompetas 2ª y 3ª";
                } else if (s.subtype === "cornetas") {
                    typeLabel = "Ensayo Cornetas";
                } else if (s.subtype === "percusion") {
                    typeLabel = "Ensayo Percusión";
                } else if (s.subtype === "voces") {
                    typeLabel = "Ensayo Voces";
                } else if (s.subtype === "primeras") {
                    typeLabel = "Ensayo Primeras";
                }
                const labelText = s.name ? s.name : typeLabel;
                
                // Texto de Fecha y Sesión a la izquierda
                ctx.textAlign = "left";
                ctx.font = "bold 17px 'Outfit', sans-serif";
                ctx.fillStyle = "#D4AF37";
                ctx.fillText(formattedDate.toUpperCase(), 610, startY);
                
                ctx.font = "500 17px 'Outfit', sans-serif";
                ctx.fillStyle = "#FFFFFF";
                
                // Truncar si es largo
                const maxLabelWidth = 220;
                let displayLabel = labelText;
                if (ctx.measureText(displayLabel).width > maxLabelWidth) {
                    while (ctx.measureText(displayLabel + "...").width > maxLabelWidth && displayLabel.length > 0) {
                        displayLabel = displayLabel.slice(0, -1);
                    }
                    displayLabel = displayLabel.trim() + "...";
                }
                ctx.fillText(` - ${displayLabel}`, 665, startY);
                
                // Porcentaje a la derecha
                ctx.textAlign = "right";
                const pct = s.convocados > 0 ? Math.round((s.presents / s.convocados) * 100) : 0;
                ctx.font = "bold 17px 'Outfit', sans-serif";
                ctx.fillStyle = pct >= 80 ? "#2ECC71" : (pct >= 50 ? "#F1C40F" : "#E74C3C");
                ctx.fillText(`${pct}%`, 970, startY);
                
                startY += 50;
            }
        });
    }

    // Separador decorativo intermedio a la altura y=575
    drawDecorativeLine(ctx, 610, 970, 580);

    // Cabecera inferior: Objetivos Semanales
    ctx.textAlign = "center";
    ctx.font = "bold 24px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("OBJETIVOS SEMANALES", 790, 630);

    // Listar objetivos de repertorio
    ctx.textAlign = "left";
    let startGoalsY = 690;
    const realGoals = marchasTitles.filter(t => t !== "Sin objetivos de repertorio planificados");

    if (realGoals.length === 0) {
        ctx.textAlign = "center";
        ctx.font = "italic 18px 'Outfit', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fillText("Sin objetivos planificados", 790, 780);
    } else {
        realGoals.forEach((title, idx) => {
            if (idx < 4) { // Máximo 4 en el espacio inferior
                ctx.fillStyle = "#D4AF37";
                ctx.fillRect(610, startGoalsY - 8, 8, 8);
                
                ctx.font = "500 17px 'Outfit', sans-serif";
                ctx.fillStyle = "#FFFFFF";
                
                const maxTitleWidth = 320;
                let displayTitle = title;
                if (ctx.measureText(displayTitle).width > maxTitleWidth) {
                    while (ctx.measureText(displayTitle + "...").width > maxTitleWidth && displayTitle.length > 0) {
                        displayTitle = displayTitle.slice(0, -1);
                    }
                    displayTitle = displayTitle.trim() + "...";
                }
                
                ctx.fillText(displayTitle, 635, startGoalsY);
                startGoalsY += 50;
            }
        });
    }

    // 6. Pie de página
    ctx.textAlign = "center";
    ctx.font = "600 16px 'Outfit', sans-serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("AGRUPACIÓN MUSICAL CRISTO YACENTE", 540, 1025);

    // Descargar imagen
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Resumen_Semana_${weekNumber}_Yacente.png`;
    link.href = dataUrl;
    link.click();
    showToast("Imagen de resumen descargada con éxito", "success");
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function drawDecorativeLine(ctx, x1, x2, y) {
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const cx = (x1 + x2) / 2;
    ctx.fillStyle = "#D4AF37";
    ctx.beginPath();
    ctx.moveTo(cx, y - 6);
    ctx.lineTo(cx + 6, y);
    ctx.lineTo(cx, y + 6);
    ctx.lineTo(cx - 6, y);
    ctx.closePath();
    ctx.fill();
}

function drawCornerOrnaments(ctx) {
    const size = 20;
    const offset = 35;
    const width = 1080;
    const height = 1080;

    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 2;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(offset, offset + size);
    ctx.lineTo(offset, offset);
    ctx.lineTo(offset + size, offset);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(width - offset, offset + size);
    ctx.lineTo(width - offset, offset);
    ctx.lineTo(width - offset - size, offset);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(offset, height - offset - size);
    ctx.lineTo(offset, height - offset);
    ctx.lineTo(offset + size, height - offset);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(width - offset, height - offset - size);
    ctx.lineTo(width - offset, height - offset);
    ctx.lineTo(width - offset - size, height - offset);
    ctx.stroke();
}

function formatDateLabel(dateStr) {
    const parts = dateStr.split('-');
    const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    const day = parseInt(parts[2], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    return `${day} ${month}`;
}

// ==========================================================================
// SIMULADOR DE FORMACIÓN (CONCIERTO Y DESFILE)
// ==========================================================================

let simActiveMode = "concierto"; // "concierto" o "desfile"
let simSelectedSeatId = null; // ID de la silla activa para asignación rápida
let simEditPositionsMode = false; // Permite arrastrar las sillas en Concierto
let simCustomConcertPositions = {}; // Coordenadas personalizadas: { 'seat-concert-1': { x, y } }
let simParadeCols = 4; // Agrupación en desfile (2, 3, 4, 5 o 6 puestos por fila)
let simParadeColsMap = {}; // Cantidad específica de puestos por fila/columna en desfile

const SECTION_COLORS = {
    "Dirección": { bg: "#d4af37", border: "#ffe695", text: "#000000", class: "sec-direccion" },
    "Trompetas 1ª": { bg: "#b03a2e", border: "#ec7063", text: "#ffffff", class: "sec-trompetas" },
    "Trompetas 2ª": { bg: "#b03a2e", border: "#ec7063", text: "#ffffff", class: "sec-trompetas" },
    "Trompetas 3ª": { bg: "#b03a2e", border: "#ec7063", text: "#ffffff", class: "sec-trompetas" },
    "Fliscornos": { bg: "#ca6f1e", border: "#f5b041", text: "#ffffff", class: "sec-fliscornos" },
    "Trompas": { bg: "#884ea0", border: "#af7ac5", text: "#ffffff", class: "sec-trompas" },
    "Trombones": { bg: "#2471a3", border: "#5dade2", text: "#ffffff", class: "sec-trombones" },
    "Bombardinos": { bg: "#17a589", border: "#48c9b0", text: "#ffffff", class: "sec-bombardinos" },
    "Tubas": { bg: "#1b263b", border: "#415a77", text: "#ffffff", class: "sec-tubas" },
    "Cornetas": { bg: "#7b1e3f", border: "#bd4871", text: "#ffffff", class: "sec-cornetas" },
    "Tambores": { bg: "#1e8449", border: "#2ecc71", text: "#ffffff", class: "sec-tambores" },
    "Bombos": { bg: "#283747", border: "#566573", text: "#ffffff", class: "sec-bombos" },
    "Platos": { bg: "#7d6608", border: "#f1c40f", text: "#ffffff", class: "sec-platos" }
};

function getSectionClass(instrument) {
    const sec = SECTION_COLORS[instrument];
    return sec ? sec.class : "sec-default";
}

function setupSimulator() {
    // Botones del panel de ajustes para abrir el simulador
    const btnConcierto = document.getElementById("btn-sim-concierto");
    const btnDesfile = document.getElementById("btn-sim-desfile");
    
    if (btnConcierto) {
        btnConcierto.addEventListener("click", () => openSimulator("concierto"));
    }
    if (btnDesfile) {
        btnDesfile.addEventListener("click", () => openSimulator("desfile"));
    }
    
    // Botón cerrar modal
    const btnClose = document.getElementById("btn-close-sim-modal");
    if (btnClose) {
        btnClose.addEventListener("click", closeSimulator);
    }
    
    // Botones de acción del simulador
    const btnAutofill = document.getElementById("btn-sim-autofill");
    if (btnAutofill) {
        btnAutofill.addEventListener("click", autofillSimulator);
    }
    
    const btnClear = document.getElementById("btn-sim-clear");
    if (btnClear) {
        btnClear.addEventListener("click", clearSimulator);
    }
    
    const btnSave = document.getElementById("btn-sim-save");
    if (btnSave) {
        btnSave.addEventListener("click", saveSimulator);
    }
    
    const btnDownload = document.getElementById("btn-sim-download");
    if (btnDownload) {
        btnDownload.addEventListener("click", downloadSimulatorImage);
    }
    
    // Añadir fila de desfile
    const btnSimAddLine = document.getElementById("btn-sim-add-line");
    if (btnSimAddLine) {
        btnSimAddLine.addEventListener("click", () => {
            if (!Array.isArray(state.formacionDesfile)) {
                state.formacionDesfile = [];
            }
            state.formacionDesfile.push([]);
            renderSimulatorSeats();
            renderSimulatorRoster();
            updateSimulatorOccupancy();
        });
    }
    
    // Añadir fila de concierto
    const btnSimAddConcertLine = document.getElementById("btn-sim-add-concert-line");
    if (btnSimAddConcertLine) {
        btnSimAddConcertLine.addEventListener("click", () => {
            if (!Array.isArray(state.formacionConcierto)) {
                state.formacionConcierto = [];
            }
            state.formacionConcierto.push([]);
            renderSimulatorSeats();
            renderSimulatorRoster();
            updateSimulatorOccupancy();
        });
    }
    
    // Búsqueda y filtrado en la barra lateral
    const searchInput = document.getElementById("sim-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", renderSimulatorRoster);
    }
    
    // Registrar zona de soltado en la barra lateral para desasignar (wrapper y listado)
    const rosterWrapper = document.querySelector(".simulator-roster-wrapper");
    const rosterList = document.getElementById("simulator-roster-list");
    
    const handleRosterDrop = (e) => {
        e.preventDefault();
        const musicianId = e.dataTransfer.getData("text/plain");
        const sourceType = e.dataTransfer.getData("source-type");
        const sourceLine = e.dataTransfer.getData("source-line");
        
        if (sourceType === "seat" && sourceLine !== undefined) {
            if (sourceLine === "director") {
                state.directorConcierto = null;
                renderSimulatorSeats();
                renderSimulatorRoster();
                updateSimulatorOccupancy();
            } else {
                const lineIdx = parseInt(sourceLine, 10);
                if (!isNaN(lineIdx)) {
                    if (simActiveMode === "concierto") {
                        if (state.formacionConcierto[lineIdx]) {
                            state.formacionConcierto[lineIdx] = state.formacionConcierto[lineIdx].filter(id => id !== musicianId);
                        }
                    } else {
                        if (state.formacionDesfile[lineIdx]) {
                            state.formacionDesfile[lineIdx] = state.formacionDesfile[lineIdx].filter(id => id !== musicianId);
                        }
                    }
                    renderSimulatorSeats();
                    renderSimulatorRoster();
                    updateSimulatorOccupancy();
                }
            }
        }
    };
    
    if (rosterWrapper) {
        rosterWrapper.addEventListener("dragover", (e) => e.preventDefault());
        rosterWrapper.addEventListener("drop", handleRosterDrop);
    }
    if (rosterList) {
        rosterList.addEventListener("dragover", (e) => e.preventDefault());
        rosterList.addEventListener("drop", handleRosterDrop);
    }
    
    const filterSelect = document.getElementById("sim-filter-instrument");
    if (filterSelect) {
        filterSelect.addEventListener("change", renderSimulatorRoster);
    }
    
    // Popover quick-select search y cierre
    const popoverSearch = document.getElementById("popover-search-input");
    if (popoverSearch) {
        popoverSearch.addEventListener("input", renderPopoverMusicians);
    }
    
    const btnClosePopover = document.getElementById("btn-close-popover");
    if (btnClosePopover) {
        btnClosePopover.addEventListener("click", hidePopover);
    }
    
    const btnPopoverVaciar = document.getElementById("btn-popover-vaciar");
    if (btnPopoverVaciar) {
        btnPopoverVaciar.addEventListener("click", () => {
            if (simSelectedSeatId) {
                assignMusicianToSeat(simSelectedSeatId, null);
                hidePopover();
            }
        });
    }
    
    // Cerrar popover si se hace click fuera
    document.addEventListener("click", (e) => {
        const popover = document.getElementById("sim-quick-select");
        const modal = document.getElementById("modal-simulator");
        
        if (!modal || !modal.classList.contains("active")) return;
        
        if (popover && !popover.classList.contains("hidden")) {
            if (!popover.contains(e.target) && !e.target.closest(".sim-seat")) {
                hidePopover();
            }
        }
    });
}

function openSimulator(mode) {
    simActiveMode = mode;
    simSelectedSeatId = null;
    simEditPositionsMode = false;
    
    hidePopover();
    
    // Configurar títulos y visibilidad según el modo
    const title = document.getElementById("simulator-title");
    const subtitle = document.getElementById("simulator-subtitle");
    const conductor = document.getElementById("sim-conductor-podium");
    const street = document.getElementById("sim-parade-street");
    const stageBg = document.getElementById("sim-concert-stage");
    
    const paradeControls = document.getElementById("sim-parade-controls");
    const concertControls = document.getElementById("sim-concert-controls");
    
    // Cargar configuraciones guardadas de Desfile
    const storedDesfile = localStorage.getItem("yacente_formacion_desfile");
    state.formacionDesfile = storedDesfile ? JSON.parse(storedDesfile) : {};
    if (!Array.isArray(state.formacionDesfile)) {
        state.formacionDesfile = Array.from({ length: 8 }, () => []);
    }
    
    // Cargar configuraciones guardadas de Concierto con soporte de migración
    const storedConcierto = localStorage.getItem("yacente_formacion_concierto");
    let parsedConcierto = null;
    try {
        parsedConcierto = storedConcierto ? JSON.parse(storedConcierto) : null;
    } catch (e) {
        console.error("Error parsing storedConcierto in openSimulator", e);
    }
    if (parsedConcierto && !Array.isArray(parsedConcierto)) {
        state.formacionConcierto = Array.from({ length: 4 }, () => []);
        let count = 0;
        Object.entries(parsedConcierto).forEach(([seatId, musicianId]) => {
            if (musicianId) {
                const targetRow = count % 4;
                state.formacionConcierto[targetRow].push(musicianId);
                count++;
            }
        });
    } else if (Array.isArray(parsedConcierto)) {
        state.formacionConcierto = parsedConcierto;
    } else {
        state.formacionConcierto = Array.from({ length: 4 }, () => []);
    }
    state.directorConcierto = localStorage.getItem("yacente_director_concierto") || null;
    
    if (mode === "concierto") {
        title.innerText = "Simulador de Formación: Concierto";
        subtitle.innerText = ""; // Sin subtítulo por petición del usuario
        if (conductor) conductor.classList.add("hidden");
        if (street) street.classList.add("hidden");
        if (stageBg) stageBg.classList.remove("hidden");
        
        if (paradeControls) paradeControls.classList.add("hidden");
        if (concertControls) concertControls.classList.remove("hidden");
    } else {
        title.innerText = "Simulador de Formación: Desfile";
        subtitle.innerText = "Formación en calle (organización horizontal compacta)";
        if (conductor) conductor.classList.add("hidden");
        if (street) street.classList.remove("hidden");
        if (stageBg) stageBg.classList.add("hidden");
        
        if (paradeControls) paradeControls.classList.remove("hidden");
        if (concertControls) concertControls.classList.add("hidden");
    }
    
    populateSimulatorFilterOptions();
    renderSimulatorRoster();
    renderSimulatorSeats();
    updateSimulatorOccupancy();
    
    // Mostrar modal
    const modal = document.getElementById("modal-simulator");
    modal.classList.add("active");
}

function closeSimulator() {
    const modal = document.getElementById("modal-simulator");
    modal.classList.remove("active");
    hidePopover();
}

function getActiveFormationMap() {
    return simActiveMode === "concierto" ? state.formacionConcierto : state.formacionDesfile;
}

function updateSimulatorOccupancy() {
    const totalSeats = state.musicians.length || 23;
    let occupiedCount = 0;
    
    if (simActiveMode === "concierto") {
        if (Array.isArray(state.formacionConcierto)) {
            occupiedCount = state.formacionConcierto.flat().length;
        }
        if (state.directorConcierto) {
            occupiedCount += 1;
        }
    } else {
        if (Array.isArray(state.formacionDesfile)) {
            occupiedCount = state.formacionDesfile.flat().length;
        }
    }
    
    const countBadge = document.getElementById("simulator-occupancy");
    if (countBadge) {
        countBadge.innerText = `Puestos: ${occupiedCount} / ${totalSeats}`;
    }
}

function populateSimulatorFilterOptions() {
    const filterSelect = document.getElementById("sim-filter-instrument");
    if (!filterSelect) return;
    
    const sections = [...new Set(state.musicians.map(m => m.instrument))].sort();
    
    filterSelect.innerHTML = `<option value="all">Todas las secciones</option>`;
    sections.forEach(sec => {
        const option = document.createElement("option");
        option.value = sec;
        option.innerText = sec;
        filterSelect.appendChild(option);
    });
}

function renderSimulatorRoster() {
    const rosterList = document.getElementById("simulator-roster-list");
    if (!rosterList) return;
    
    rosterList.innerHTML = "";
    
    const searchVal = document.getElementById("sim-search-input").value.toLowerCase();
    const filterVal = document.getElementById("sim-filter-instrument").value;
    
    let assignedMusicianIds = [];
    if (simActiveMode === "concierto") {
        if (Array.isArray(state.formacionConcierto)) {
            assignedMusicianIds = state.formacionConcierto.flat();
        }
        if (state.directorConcierto) {
            assignedMusicianIds.push(state.directorConcierto);
        }
    } else {
        if (Array.isArray(state.formacionDesfile)) {
            assignedMusicianIds = state.formacionDesfile.flat();
        }
    }
    
    const filteredMusicians = state.musicians.filter(m => {
        const isAssigned = assignedMusicianIds.includes(m.id);
        if (isAssigned) return false;
        
        const matchesSearch = m.name.toLowerCase().includes(searchVal) || m.role.toLowerCase().includes(searchVal);
        const matchesFilter = filterVal === "all" || m.instrument === filterVal;
        return matchesSearch && matchesFilter;
    });
    
    if (filteredMusicians.length === 0) {
        rosterList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; font-style: italic; padding: 20px 0;">No se encontraron músicos</div>`;
        return;
    }
    
    filteredMusicians.forEach(m => {
        const isAssigned = assignedMusicianIds.includes(m.id);
        
        const card = document.createElement("div");
        card.className = `sim-musician-card ${isAssigned ? 'assigned' : ''}`;
        card.setAttribute("draggable", !isAssigned);
        card.setAttribute("data-musician-id", m.id);
        
        card.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 2px; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">
                <span style="font-weight: 600; color: #fff; font-size: 0.76rem;">${m.name}</span>
                <span style="font-size: 0.65rem; color: var(--text-muted);">${m.instrument} - ${m.role}</span>
            </div>
            ${isAssigned ? `
                <span style="color: var(--color-gold); font-weight: bold; margin-left: 8px;">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
            ` : ''}
        `;
        
        if (!isAssigned) {
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", m.id);
                e.dataTransfer.setData("source-type", "roster");
                card.style.opacity = "0.5";
            });
            
            card.addEventListener("dragend", () => {
                card.style.opacity = "1";
            });
            
            card.addEventListener("click", () => {
                if (simSelectedSeatId) {
                    assignMusicianToSeat(simSelectedSeatId, m.id);
                    hidePopover();
                }
            });
        }
        
        rosterList.appendChild(card);
    });
}

function createParadeSeatDOM(musicianId, lineIndex, seatIndex, x, y, container) {
    const m = state.musicians.find(mus => mus.id === musicianId);
    if (!m) return;
    
    const seat = document.createElement("div");
    seat.id = `seat-parade-${lineIndex}-${seatIndex}`;
    seat.className = "sim-seat occupied";
    
    const secClass = getSectionClass(m.instrument);
    seat.classList.add(secClass);
    
    seat.style.position = "absolute";
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    seat.style.width = "34px";
    seat.style.height = "34px";
    seat.style.fontSize = "0.6rem";
    
    const shortName = getShortName(m.name);
    seat.innerHTML = `<span class="seat-name">${shortName}</span>`;
    seat.setAttribute("title", `${m.name} (${m.instrument} - ${m.role})`);
    
    // Arrastre del asiento
    seat.setAttribute("draggable", "true");
    seat.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", musicianId);
        e.dataTransfer.setData("source-type", "seat");
        e.dataTransfer.setData("source-line", lineIndex.toString());
        seat.classList.add("dragging");
    });
    seat.addEventListener("dragend", () => {
        seat.classList.remove("dragging");
    });
    
    // Permitir soltar sobre este asiento para intercambiar o reemplazar
    seat.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    seat.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.add("drag-over");
    });
    seat.addEventListener("dragleave", (e) => {
        e.stopPropagation();
        seat.classList.remove("drag-over");
    });
    seat.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.remove("drag-over");
        
        const draggedMusicianId = e.dataTransfer.getData("text/plain");
        const sourceType = e.dataTransfer.getData("source-type");
        const sourceLineStr = e.dataTransfer.getData("source-line");
        
        if (!draggedMusicianId || draggedMusicianId === musicianId) return;
        
        if (sourceType === "seat" && sourceLineStr !== undefined) {
            const sourceLine = parseInt(sourceLineStr, 10);
            
            // Buscar la posición del músico arrastrado en la línea de origen
            const sourceSeatIdx = state.formacionDesfile[sourceLine].indexOf(draggedMusicianId);
            
            if (sourceSeatIdx !== -1) {
                // Intercambiar músicos en los dos puestos
                state.formacionDesfile[lineIndex][seatIndex] = draggedMusicianId;
                state.formacionDesfile[sourceLine][sourceSeatIdx] = musicianId;
            }
        } else if (sourceType === "roster") {
            // Reemplazar músico en este puesto (quitar de otra fila si estaba)
            for (let i = 0; i < state.formacionDesfile.length; i++) {
                state.formacionDesfile[i] = state.formacionDesfile[i].filter(id => id !== draggedMusicianId);
            }
            // Asignar al puesto objetivo
            state.formacionDesfile[lineIndex][seatIndex] = draggedMusicianId;
        }
        
        renderSimulatorSeats();
        renderSimulatorRoster();
        updateSimulatorOccupancy();
    });
    
    // Clic para eliminar componente
    seat.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`¿Deseas quitar a ${m.name} de esta fila?`)) {
            state.formacionDesfile[lineIndex].splice(seatIndex, 1);
            renderSimulatorSeats();
            renderSimulatorRoster();
            updateSimulatorOccupancy();
        }
    });
    
    container.appendChild(seat);
}

function createConcertSeatDOM(musicianId, lineIndex, seatIndex, x, y, container) {
    const m = state.musicians.find(mus => mus.id === musicianId);
    if (!m) return;
    
    const seat = document.createElement("div");
    seat.id = `seat-concert-${lineIndex}-${seatIndex}`;
    seat.className = "sim-seat occupied";
    
    const secClass = getSectionClass(m.instrument);
    seat.classList.add(secClass);
    
    seat.style.position = "absolute";
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    seat.style.width = "42px";
    seat.style.height = "42px";
    
    const shortName = getShortName(m.name);
    seat.innerHTML = `<span class="seat-name">${shortName}</span>`;
    seat.setAttribute("title", `${m.name} (${m.instrument} - ${m.role})`);
    
    // Arrastre del asiento
    seat.setAttribute("draggable", "true");
    seat.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", musicianId);
        e.dataTransfer.setData("source-type", "seat");
        e.dataTransfer.setData("source-line", lineIndex.toString());
        seat.classList.add("dragging");
    });
    seat.addEventListener("dragend", () => {
        seat.classList.remove("dragging");
    });
    
    // Permitir soltar sobre este asiento para intercambiar o reemplazar
    seat.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    seat.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.add("drag-over");
    });
    seat.addEventListener("dragleave", (e) => {
        e.stopPropagation();
        seat.classList.remove("drag-over");
    });
    seat.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.remove("drag-over");
        
        const draggedMusicianId = e.dataTransfer.getData("text/plain");
        const sourceType = e.dataTransfer.getData("source-type");
        const sourceLineStr = e.dataTransfer.getData("source-line");
        
        if (!draggedMusicianId || draggedMusicianId === musicianId) return;
        
        if (sourceType === "seat" && sourceLineStr !== undefined) {
            const sourceLine = parseInt(sourceLineStr, 10);
            
            // Buscar la posición del músico arrastrado en la línea de origen
            const sourceSeatIdx = state.formacionConcierto[sourceLine].indexOf(draggedMusicianId);
            
            if (sourceSeatIdx !== -1) {
                // Intercambiar músicos en los dos puestos
                state.formacionConcierto[lineIndex][seatIndex] = draggedMusicianId;
                state.formacionConcierto[sourceLine][sourceSeatIdx] = musicianId;
            }
        } else if (sourceType === "roster") {
            // Reemplazar músico en este puesto (quitar de otra fila si estaba)
            for (let i = 0; i < state.formacionConcierto.length; i++) {
                state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== draggedMusicianId);
            }
            // Asignar al puesto objetivo
            state.formacionConcierto[lineIndex][seatIndex] = draggedMusicianId;
        }
        
        renderSimulatorSeats();
        renderSimulatorRoster();
        updateSimulatorOccupancy();
    });
    
    // Clic para eliminar componente
    seat.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`¿Deseas quitar a ${m.name} de esta fila?`)) {
            state.formacionConcierto[lineIndex].splice(seatIndex, 1);
            renderSimulatorSeats();
            renderSimulatorRoster();
            updateSimulatorOccupancy();
        }
    });
    
    container.appendChild(seat);
}

function createDirectorSeatDOM(musicianId, x, y, container) {
    const seat = document.createElement("div");
    seat.id = "seat-director";
    seat.className = "sim-seat director-seat";
    seat.style.position = "absolute";
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    seat.style.width = "60px";
    seat.style.height = "36px";
    
    if (musicianId) {
        const m = state.musicians.find(mus => mus.id === musicianId);
        if (m) {
            seat.classList.add("occupied");
            const shortName = getShortName(m.name);
            seat.innerHTML = `<span class="seat-name" style="color: #000; font-weight: 800;">${shortName}</span>`;
            seat.setAttribute("title", `Director: ${m.name} (${m.instrument})`);
            
            // Arrastre del director
            seat.setAttribute("draggable", "true");
            seat.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", musicianId);
                e.dataTransfer.setData("source-type", "seat");
                e.dataTransfer.setData("source-line", "director");
                seat.classList.add("dragging");
            });
            seat.addEventListener("dragend", () => {
                seat.classList.remove("dragging");
            });
        }
    } else {
        seat.innerHTML = `<span class="seat-name" style="font-size: 0.65rem; color: #d4af37; font-weight: bold; pointer-events: none;">DIRECTOR</span>`;
        seat.setAttribute("title", "Arrastra un músico aquí para asignarlo como Director");
    }
    
    // Permitir soltar sobre el podio
    seat.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    seat.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.add("drag-over");
    });
    seat.addEventListener("dragleave", (e) => {
        e.stopPropagation();
        seat.classList.remove("drag-over");
    });
    seat.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        seat.classList.remove("drag-over");
        
        const draggedMusicianId = e.dataTransfer.getData("text/plain");
        const sourceType = e.dataTransfer.getData("source-type");
        const sourceLineStr = e.dataTransfer.getData("source-line");
        
        if (!draggedMusicianId || draggedMusicianId === musicianId) return;
        
        // Quitar de cualquier otra posición en concierto
        for (let i = 0; i < state.formacionConcierto.length; i++) {
            state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== draggedMusicianId);
        }
        
        if (sourceType === "seat" && sourceLineStr !== undefined) {
            if (sourceLineStr !== "director") {
                const sourceLine = parseInt(sourceLineStr, 10);
                const sourceSeatIdx = state.formacionConcierto[sourceLine].indexOf(draggedMusicianId);
                
                if (sourceSeatIdx !== -1) {
                    if (musicianId) {
                        // Swap: colocar director actual en la silla de origen
                        state.formacionConcierto[sourceLine][sourceSeatIdx] = musicianId;
                    }
                }
            }
        }
        
        // Asignar como nuevo director
        state.directorConcierto = draggedMusicianId;
        
        renderSimulatorSeats();
        renderSimulatorRoster();
        updateSimulatorOccupancy();
    });
    
    // Quitar director con click
    if (musicianId) {
        seat.addEventListener("click", (e) => {
            e.stopPropagation();
            const m = state.musicians.find(mus => mus.id === musicianId);
            if (m && confirm(`¿Deseas quitar a ${m.name} del puesto de director?`)) {
                state.directorConcierto = null;
                renderSimulatorSeats();
                renderSimulatorRoster();
                updateSimulatorOccupancy();
            }
        });
    }
    
    container.appendChild(seat);
}

function renderSimulatorSeats() {
    const seatsContainer = document.getElementById("simulator-seats-container");
    if (!seatsContainer) return;
    
    seatsContainer.innerHTML = "";
    const formationMap = getActiveFormationMap();
    
    if (simActiveMode === "concierto") {
        // Modo Concierto: Forzar tamaño exacto de 800x480px y centrado absoluto para evitar cortes visuales
        seatsContainer.style.width = "800px";
        seatsContainer.style.height = "480px";
        seatsContainer.style.left = "50%";
        seatsContainer.style.top = "50%";
        seatsContainer.style.transform = "translate(-50%, -50%)";
        
        const concertStage = document.getElementById("sim-concert-stage");
        if (concertStage) {
            concertStage.style.width = "800px";
            concertStage.style.height = "480px";
            concertStage.style.left = "50%";
            concertStage.style.top = "50%";
            concertStage.style.transform = "translate(-50%, -50%)";
        }
        
        // Limpiar arcos SVG viejos y renderizar los nuevos
        const stageArcsSvg = document.querySelector(".stage-arcs");
        if (stageArcsSvg) {
            stageArcsSvg.innerHTML = "";
        }
        
        const X_c = 400;
        const Y_c = 420;
        
        const numRows = state.formacionConcierto.length;
        
        for (let r = 0; r < numRows; r++) {
            const R = 175 + r * 65;
            const theta_start = 195 - r * 3;
            const theta_end = 345 + r * 3;
            
            const rad_start = theta_start * Math.PI / 180;
            const rad_end = theta_end * Math.PI / 180;
            
            const x_start = X_c + R * Math.cos(rad_start);
            const y_start = Y_c + R * Math.sin(rad_start);
            const x_end = X_c + R * Math.cos(rad_end);
            const y_end = Y_c + R * Math.sin(rad_end);
            
            const pathD = `M ${x_start.toFixed(2)} ${y_start.toFixed(2)} A ${R} ${R} 0 0 1 ${x_end.toFixed(2)} ${y_end.toFixed(2)}`;
            
            if (stageArcsSvg) {
                // Crear camino de guía visual
                const guidePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                guidePath.setAttribute("d", pathD);
                guidePath.setAttribute("fill", "none");
                guidePath.setAttribute("stroke", "rgba(212, 175, 55, 0.12)");
                guidePath.setAttribute("stroke-width", "2");
                guidePath.setAttribute("stroke-dasharray", "6,6");
                guidePath.style.pointerEvents = "none";
                stageArcsSvg.appendChild(guidePath);
                
                // Crear camino de drop zone interactivo grueso
                const dropZonePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                dropZonePath.setAttribute("d", pathD);
                dropZonePath.setAttribute("fill", "none");
                dropZonePath.setAttribute("stroke", "transparent");
                dropZonePath.setAttribute("stroke-width", "24");
                dropZonePath.setAttribute("class", "concert-arc-drop-zone");
                dropZonePath.setAttribute("data-line-index", r.toString());
                dropZonePath.style.pointerEvents = "stroke";
                
                // Eventos de drag y drop en la drop zone del SVG
                dropZonePath.addEventListener("dragover", (e) => {
                    e.preventDefault();
                });
                dropZonePath.addEventListener("dragenter", () => {
                    dropZonePath.classList.add("drag-over");
                });
                dropZonePath.addEventListener("dragleave", () => {
                    dropZonePath.classList.remove("drag-over");
                });
                dropZonePath.addEventListener("drop", (e) => {
                    e.preventDefault();
                    dropZonePath.classList.remove("drag-over");
                    
                    const musicianId = e.dataTransfer.getData("text/plain");
                    const sourceType = e.dataTransfer.getData("source-type");
                    const sourceLine = e.dataTransfer.getData("source-line");
                    
                    if (!musicianId) return;
                    
                    // Quitar del origen
                    if (sourceLine === "director") {
                        state.directorConcierto = null;
                    } else {
                        for (let i = 0; i < state.formacionConcierto.length; i++) {
                            state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== musicianId);
                        }
                    }
                    // Añadir al destino
                    state.formacionConcierto[r].push(musicianId);
                    
                    renderSimulatorSeats();
                    renderSimulatorRoster();
                    updateSimulatorOccupancy();
                });
                
                stageArcsSvg.appendChild(dropZonePath);
            }
            
            // Botón de eliminar fila si está vacía
            if (state.formacionConcierto[r].length === 0 && state.formacionConcierto.length > 1) {
                const btnDelLine = document.createElement("button");
                btnDelLine.className = "btn-del-line";
                btnDelLine.style.position = "absolute";
                btnDelLine.style.left = `${x_end - 9}px`;
                btnDelLine.style.top = `${y_end - 9}px`;
                btnDelLine.innerHTML = "&times;";
                btnDelLine.title = "Eliminar fila vacía";
                btnDelLine.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.formacionConcierto.splice(r, 1);
                    renderSimulatorSeats();
                    renderSimulatorRoster();
                    updateSimulatorOccupancy();
                });
                seatsContainer.appendChild(btnDelLine);
            }
            
            // Renderizar los músicos del arco de forma equidistante
            const N = state.formacionConcierto[r].length;
            for (let i = 0; i < N; i++) {
                const musicianId = state.formacionConcierto[r][i];
                
                let angleDeg = 270; // Por defecto centrado
                if (N > 1) {
                    angleDeg = theta_start + i * ((theta_end - theta_start) / (N - 1));
                }
                
                const angleRad = angleDeg * (Math.PI / 180);
                const x = X_c + R * Math.cos(angleRad) - 21;
                const y = Y_c + R * Math.sin(angleRad) - 21;
                
                createConcertSeatDOM(musicianId, r, i, x, y, seatsContainer);
            }
        }
        
        // Renderizar el podio / asiento del director
        createDirectorSeatDOM(state.directorConcierto, 370, 334, seatsContainer);
    } else {
        // Modo Desfile: Grid de líneas verticales interactivas por arrastre
        const L = state.formacionDesfile.length;
        
        // Espaciado horizontal fijo (más compacto por petición del usuario)
        const colSpacing = 52;
        const startX = 60;
        const containerWidth = startX + L * colSpacing + 80;
        
        // Resetear centrado de modo concierto
        seatsContainer.style.left = "0";
        seatsContainer.style.top = "0";
        seatsContainer.style.transform = "none";
        seatsContainer.style.width = `${containerWidth}px`;
        seatsContainer.style.height = "100%";
        
        // Ajustar fondo de la calle
        const streetBg = document.getElementById("sim-parade-street");
        if (streetBg) {
            streetBg.style.width = `${containerWidth}px`;
        }
        
        // Renderizar las líneas (filas) de desfile
        for (let c = 0; c < L; c++) {
            const x = startX + c * colSpacing;
            
            const lineDropZone = document.createElement("div");
            lineDropZone.className = "sim-parade-line";
            lineDropZone.style.left = `${x - 20}px`; // centrado en x
            lineDropZone.style.top = "72px";
            lineDropZone.style.width = "40px";
            lineDropZone.style.height = "336px";
            lineDropZone.setAttribute("data-line-index", c);
            
            // Eje punteado visual
            const axis = document.createElement("div");
            axis.className = "line-axis";
            lineDropZone.appendChild(axis);
            
            // Eventos de arrastre sobre la fila
            lineDropZone.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            lineDropZone.addEventListener("dragenter", () => {
                lineDropZone.classList.add("active-drop-zone");
            });
            lineDropZone.addEventListener("dragleave", () => {
                lineDropZone.classList.remove("active-drop-zone");
            });
            lineDropZone.addEventListener("drop", (e) => {
                e.preventDefault();
                lineDropZone.classList.remove("active-drop-zone");
                
                const musicianId = e.dataTransfer.getData("text/plain");
                const sourceType = e.dataTransfer.getData("source-type");
                const sourceLine = e.dataTransfer.getData("source-line");
                
                if (!musicianId) return;
                
                // Evitar duplicados quitando al músico de su antigua fila
                for (let i = 0; i < state.formacionDesfile.length; i++) {
                    state.formacionDesfile[i] = state.formacionDesfile[i].filter(id => id !== musicianId);
                }
                
                // Añadir a la fila destino
                state.formacionDesfile[c].push(musicianId);
                
                renderSimulatorSeats();
                renderSimulatorRoster();
                updateSimulatorOccupancy();
            });
            
            // Botón de eliminar fila si está vacía
            if (state.formacionDesfile[c].length === 0 && state.formacionDesfile.length > 1) {
                const btnDelLine = document.createElement("button");
                btnDelLine.className = "btn-del-line";
                btnDelLine.innerHTML = "&times;";
                btnDelLine.title = "Eliminar fila vacía";
                btnDelLine.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.formacionDesfile.splice(c, 1);
                    renderSimulatorSeats();
                    renderSimulatorRoster();
                    updateSimulatorOccupancy();
                });
                lineDropZone.appendChild(btnDelLine);
            }
            
            seatsContainer.appendChild(lineDropZone);
            
            // Renderizar los músicos asignados de forma equidistante en esta línea
            const N = state.formacionDesfile[c].length;
            for (let r = 0; r < N; r++) {
                const musicianId = state.formacionDesfile[c][r];
                
                let seatY = 223; // Centrado vertical (240 - 17)
                if (N > 1) {
                    seatY = 90 + r * (266 / (N - 1));
                }
                
                createParadeSeatDOM(musicianId, c, r, x - 17, seatY, seatsContainer);
            }
        }
    }
}

function createSeatDOM(seatId, seatNumber, x, y, container, formationMap) {
    const seat = document.createElement("div");
    seat.id = seatId;
    seat.className = "sim-seat";
    seat.style.left = `${x}px`;
    seat.style.top = `${y}px`;
    
    // Comprobar ocupación
    const musicianId = formationMap[seatId];
    const m = musicianId ? state.musicians.find(x => x.id === musicianId) : null;
    
    // Si es desfile, aplicar diseño más compacto para que quepa en pantalla
    if (simActiveMode === "desfile") {
        seat.style.width = "34px";
        seat.style.height = "34px";
        seat.style.fontSize = "0.6rem";
    }
    
    if (m) {
        seat.classList.add("occupied");
        const secClass = getSectionClass(m.instrument);
        seat.classList.add(secClass);
        
        const shortName = getShortName(m.name);
        seat.innerHTML = `<span class="seat-name">${shortName}</span>`;
        seat.setAttribute("title", `${m.name} (${m.instrument} - ${m.role})`);
    } else {
        if (simActiveMode === "desfile") {
            seat.innerHTML = `
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span class="seat-num" style="font-size: 0.5rem; margin-top: 0;">${seatNumber}</span>
            `;
        } else {
            seat.innerHTML = `
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span class="seat-num">${seatNumber}</span>
            `;
        }
        seat.setAttribute("title", `Puesto ${seatNumber} (Vacío)`);
    }
    
    if (simSelectedSeatId === seatId) {
        seat.classList.add("active-seat");
    }
    
    // Habilitar arrastre libre de la silla en modo de edición (Concierto)
    if (simEditPositionsMode && simActiveMode === "concierto") {
        seat.classList.add("editable-seat");
        seat.style.cursor = "move";
        
        seat.addEventListener("mousedown", (e) => handleSeatDragStart(e, seatId));
        seat.addEventListener("touchstart", (e) => handleSeatDragStart(e, seatId), { passive: false });
    } else {
        // Eventos estándar de asignación e interactividad
        seat.addEventListener("click", (e) => {
            e.stopPropagation();
            selectSeat(seatId, e);
        });
        
        seat.addEventListener("dragover", (e) => {
            e.preventDefault();
            seat.classList.add("drag-over");
        });
        
        seat.addEventListener("dragleave", () => {
            seat.classList.remove("drag-over");
        });
        
        seat.addEventListener("drop", (e) => {
            e.preventDefault();
            seat.classList.remove("drag-over");
            
            const draggedMusicianId = e.dataTransfer.getData("text/plain");
            if (draggedMusicianId) {
                assignMusicianToSeat(seatId, draggedMusicianId);
            }
        });
    }
    
    container.appendChild(seat);
}

// Drag & Drop físico para mover sillas en modo Concierto
let dragSeatId = null;
let dragStartX = 0;
let dragStartY = 0;
let seatStartLeft = 0;
let seatStartTop = 0;

function handleSeatDragStart(e, seatId) {
    if (!simEditPositionsMode || simActiveMode !== "concierto") return;
    e.stopPropagation();
    e.preventDefault();
    
    dragSeatId = seatId;
    const seatEl = document.getElementById(seatId);
    if (!seatEl) return;
    
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    
    dragStartX = clientX;
    dragStartY = clientY;
    seatStartLeft = parseInt(seatEl.style.left, 10) || 0;
    seatStartTop = parseInt(seatEl.style.top, 10) || 0;
    
    document.addEventListener("mousemove", handleSeatDragMove);
    document.addEventListener("mouseup", handleSeatDragEnd);
    document.addEventListener("touchmove", handleSeatDragMove, { passive: false });
    document.addEventListener("touchend", handleSeatDragEnd);
}

function handleSeatDragMove(e) {
    if (!dragSeatId) return;
    e.preventDefault();
    
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStartX;
    const deltaY = clientY - dragStartY;
    
    const newLeft = seatStartLeft + deltaX;
    const newTop = seatStartTop + deltaY;
    
    // Limitar al contenedor (800x480px, restando 42px del diámetro del botón)
    const clampedLeft = Math.max(0, Math.min(758, newLeft));
    const clampedTop = Math.max(0, Math.min(438, newTop));
    
    const seatEl = document.getElementById(dragSeatId);
    if (seatEl) {
        seatEl.style.left = `${clampedLeft}px`;
        seatEl.style.top = `${clampedTop}px`;
    }
}

function handleSeatDragEnd(e) {
    if (!dragSeatId) return;
    
    const seatEl = document.getElementById(dragSeatId);
    if (seatEl) {
        const finalLeft = parseInt(seatEl.style.left, 10);
        const finalTop = parseInt(seatEl.style.top, 10);
        simCustomConcertPositions[dragSeatId] = { x: finalLeft, y: finalTop };
    }
    
    dragSeatId = null;
    document.removeEventListener("mousemove", handleSeatDragMove);
    document.removeEventListener("mouseup", handleSeatDragEnd);
    document.removeEventListener("touchmove", handleSeatDragMove);
    document.removeEventListener("touchend", handleSeatDragEnd);
}

function getShortName(name) {
    const parts = name.split(" ");
    if (parts.length >= 2) {
        return `${parts[0][0]}. ${parts[1]}`;
    }
    return name.substring(0, 7);
}

function selectSeat(seatId, event) {
    if (simSelectedSeatId) {
        const oldSeat = document.getElementById(simSelectedSeatId);
        if (oldSeat) oldSeat.classList.remove("active-seat");
    }
    
    simSelectedSeatId = seatId;
    
    const seatElement = document.getElementById(seatId);
    if (seatElement) {
        seatElement.classList.add("active-seat");
    }
    
    showPopover(event);
}

function showPopover(event) {
    const popover = document.getElementById("sim-quick-select");
    if (!popover) return;
    
    let clientX = event.clientX;
    let clientY = event.clientY;
    
    const popoverWidth = 240;
    const popoverHeight = 310;
    
    if (clientX + popoverWidth > window.innerWidth) {
        clientX = window.innerWidth - popoverWidth - 20;
    }
    if (clientY + popoverHeight > window.innerHeight) {
        clientY = window.innerHeight - popoverHeight - 20;
    }
    
    popover.style.left = `${clientX}px`;
    popover.style.top = `${clientY}px`;
    popover.classList.remove("hidden");
    
    const searchInput = document.getElementById("popover-search-input");
    if (searchInput) {
        searchInput.value = "";
    }
    
    renderPopoverMusicians();
}

function hidePopover() {
    const popover = document.getElementById("sim-quick-select");
    if (popover) {
        popover.classList.add("hidden");
    }
    
    if (simSelectedSeatId) {
        const seatElement = document.getElementById(simSelectedSeatId);
        if (seatElement) {
            seatElement.classList.remove("active-seat");
        }
        simSelectedSeatId = null;
    }
}

function renderPopoverMusicians() {
    const listContainer = document.getElementById("popover-musicians-list");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";
    
    const searchVal = document.getElementById("popover-search-input").value.toLowerCase();
    
    const formationMap = getActiveFormationMap();
    const assignedMusicianIds = Object.values(formationMap);
    
    const freeMusicians = state.musicians.filter(m => {
        const isFree = !assignedMusicianIds.includes(m.id);
        const matchesSearch = m.name.toLowerCase().includes(searchVal) || m.instrument.toLowerCase().includes(searchVal);
        return isFree && matchesSearch;
    });
    
    if (freeMusicians.length === 0) {
        listContainer.innerHTML = `<span style="font-size: 0.72rem; color: var(--text-muted); padding: 8px; display: block; font-style: italic;">No hay músicos libres</span>`;
        return;
    }
    
    freeMusicians.forEach(m => {
        const item = document.createElement("div");
        item.className = "popover-item";
        item.innerHTML = `
            <span style="font-weight: 600;">${m.name}</span>
            <span style="font-size: 0.65rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 3px;">${m.instrument}</span>
        `;
        
        item.addEventListener("click", () => {
            if (simSelectedSeatId) {
                assignMusicianToSeat(simSelectedSeatId, m.id);
                hidePopover();
            }
        });
        
        listContainer.appendChild(item);
    });
}

function assignMusicianToSeat(seatId, musicianId) {
    const map = getActiveFormationMap();
    
    if (musicianId) {
        Object.keys(map).forEach(key => {
            if (map[key] === musicianId) {
                map[key] = null;
            }
        });
    }
    
    map[seatId] = musicianId;
    
    renderSimulatorSeats();
    renderSimulatorRoster();
    updateSimulatorOccupancy();
}

function clearSimulator() {
    if (confirm("¿Estás seguro de que deseas vaciar todas las posiciones de esta formación?")) {
        if (simActiveMode === "concierto") {
            state.formacionConcierto = state.formacionConcierto.map(() => []);
            state.directorConcierto = null;
        } else {
            state.formacionDesfile = state.formacionDesfile.map(() => []);
        }
        
        renderSimulatorSeats();
        renderSimulatorRoster();
        updateSimulatorOccupancy();
        showToast("Formación vaciada", "info");
    }
}

function saveSimulator() {
    const key = simActiveMode === "concierto" ? "yacente_formacion_concierto" : "yacente_formacion_desfile";
    const map = getActiveFormationMap();
    
    localStorage.setItem(key, JSON.stringify(map));
    
    if (simActiveMode === "concierto") {
        if (state.directorConcierto) {
            localStorage.setItem("yacente_director_concierto", state.directorConcierto);
        } else {
            localStorage.removeItem("yacente_director_concierto");
        }
    }
    
    if (isCloudActive()) {
        const db = firebase.firestore();
        if (simActiveMode === "concierto") {
            db.collection("config").doc("formacion_concierto").set({
                mapStr: JSON.stringify(map),
                director: state.directorConcierto || null
            }).catch(err => {
                console.error("Error al guardar formación de concierto en Firebase:", err);
                showToast("Error al guardar en la nube", "danger");
            });
        } else {
            db.collection("config").doc("formacion_desfile").set({
                mapStr: JSON.stringify(map)
            }).catch(err => {
                console.error("Error al guardar formación de desfile en Firebase:", err);
                showToast("Error al guardar en la nube", "danger");
            });
        }
    }
    
    showToast("Formación guardada correctamente", "success");
}

function autofillSimulator() {
    if (simActiveMode === "concierto") {
        const numRows = state.formacionConcierto.length;
        state.formacionConcierto = Array.from({ length: numRows }, () => []);
        
        const sectionPriority = {
            "Dirección": 1,
            "Fliscornos": 2,
            "Trompas": 3,
            "Trompetas 1ª": 4,
            "Trompetas 2ª": 5,
            "Trompetas 3ª": 6,
            "Trombones": 7,
            "Bombardinos": 8,
            "Tubas": 9,
            "Cornetas": 10,
            "Tambores": 11,
            "Bombos": 12,
            "Platos": 13
        };
        
        const sortedMusicians = [...state.musicians].sort((a, b) => {
            const prioA = sectionPriority[a.instrument] || 99;
            const prioB = sectionPriority[b.instrument] || 99;
            return prioA - prioB || a.name.localeCompare(b.name);
        });
        
        let musIndex = 0;
        if (sortedMusicians.length > 0 && sortedMusicians[0].instrument === "Dirección") {
            state.directorConcierto = sortedMusicians[0].id;
            musIndex = 1;
        } else {
            state.directorConcierto = null;
        }
        
        for (let r = 0; r < numRows; r++) {
            const capacity = 12 + r * 2;
            for (let c = 0; c < capacity; c++) {
                if (musIndex >= sortedMusicians.length) break;
                state.formacionConcierto[r].push(sortedMusicians[musIndex].id);
                musIndex++;
            }
            if (musIndex >= sortedMusicians.length) break;
        }
    } else {
        // Modo Desfile: Rellenar las filas (de 4 en 4) desde la cabecera (derecha) hacia atrás (izquierda)
        const sectionPriority = {
            "Dirección": 1,
            "Cornetas": 2,
            "Trompetas 1ª": 3,
            "Trompetas 2ª": 4,
            "Trompetas 3ª": 5,
            "Fliscornos": 6,
            "Trompas": 7,
            "Trombones": 8,
            "Bombardinos": 9,
            "Tubas": 10,
            "Tambores": 11,
            "Bombos": 12,
            "Platos": 13
        };
        
        const sortedMusicians = [...state.musicians].sort((a, b) => {
            const prioA = sectionPriority[a.instrument] || 99;
            const prioB = sectionPriority[b.instrument] || 99;
            return prioA - prioB || a.name.localeCompare(b.name);
        });
        
        const N = sortedMusicians.length;
        const numCols = Math.max(8, Math.ceil(N / 4));
        
        state.formacionDesfile = Array.from({ length: numCols }, () => []);
        
        for (let i = 0; i < N; i++) {
            const colIdx = (numCols - 1) - Math.floor(i / 4);
            state.formacionDesfile[colIdx].push(sortedMusicians[i].id);
        }
    }
    
    renderSimulatorSeats();
    renderSimulatorRoster();
    updateSimulatorOccupancy();
    showToast("Colocación autocompletada por secciones", "success");
}

function downloadSimulatorImage() {
    const canvas = document.createElement("canvas");
    
    const formationMap = getActiveFormationMap();
    let canvasWidth = 1200;
    let canvasHeight = 800;
    
    if (simActiveMode === "desfile") {
        const L = state.formacionDesfile.length;
        const canvasColSpacing = 60;
        canvasWidth = L * canvasColSpacing + 200;
    }
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    
    // 1. Fondo degradado premium (granate/vino a negro)
    const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad.addColorStop(0, "#230409");
    grad.addColorStop(0.5, "#0f0103");
    grad.addColorStop(1, "#040001");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Bordes elegantes dorados
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#4d0a14";
    ctx.strokeRect(20, 20, canvasWidth - 40, canvasHeight - 40);
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#D4AF37";
    ctx.strokeRect(30, 30, canvasWidth - 60, canvasHeight - 60);
    
    // 2. Encabezado principal
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.font = "bold 34px 'Cinzel', serif";
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("AGRUPACIÓN MUSICAL CRISTO YACENTE", canvasWidth / 2, 70);
    
    ctx.font = "bold 20px 'Cinzel', serif";
    ctx.fillStyle = "#FFFFFF";
    const modeTitle = simActiveMode === "concierto" ? "DISPOSICIÓN EN ESCENARIO (CONCIERTO)" : "FORMACIÓN EN CALLE (DESFILE)";
    ctx.fillText(modeTitle, canvasWidth / 2, 115);
    
    // Separador decorativo
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2 - 200, 138);
    ctx.lineTo(canvasWidth / 2 + 200, 138);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    
    if (simActiveMode === "concierto") {
        ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
        ctx.lineWidth = 2.5;
        
        const X_c_html = 400;
        const Y_c_html = 420;
        
        const numRows = state.formacionConcierto.length;
        
        // Dibujar arcos concéntricos dinámicamente en el Canvas
        for (let r = 0; r < numRows; r++) {
            const R = 175 + r * 65;
            const theta_start = 195 - r * 3;
            const theta_end = 345 + r * 3;
            
            ctx.beginPath();
            for (let angle = theta_start; angle <= theta_end; angle += 2) {
                const angleRad = angle * (Math.PI / 180);
                const x_html = X_c_html + R * Math.cos(angleRad);
                const y_html = Y_c_html + R * Math.sin(angleRad);
                const canvas_x = 100 + (x_html / 800) * 1000;
                const canvas_y = 160 + (y_html / 480) * 520;
                
                if (angle === theta_start) {
                    ctx.moveTo(canvas_x, canvas_y);
                } else {
                    ctx.lineTo(canvas_x, canvas_y);
                }
            }
            ctx.stroke();
        }
        
        // Dibujar podio
        const dir_x_html = 370;
        const dir_y_html = 334;
        const canvas_dir_x = 100 + (dir_x_html / 800) * 1000;
        const canvas_dir_y = 160 + (dir_y_html / 480) * 520;
        const canvas_dir_w = 75;
        const canvas_dir_h = 39;
        
        const directorMus = state.directorConcierto ? state.musicians.find(m => m.id === state.directorConcierto) : null;
        if (directorMus) {
            const colors = SECTION_COLORS[directorMus.instrument] || { bg: "#d4af37", border: "#ffe893", text: "#000000" };
            ctx.fillStyle = colors.bg;
            roundRect(ctx, canvas_dir_x, canvas_dir_y, canvas_dir_w, canvas_dir_h, 4, true, false);
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = colors.border;
            ctx.stroke();
            
            ctx.fillStyle = colors.text;
            ctx.font = "bold 12px 'Outfit', sans-serif";
            const shortName = getShortName(directorMus.name);
            ctx.fillText(shortName, canvas_dir_x + canvas_dir_w / 2, canvas_dir_y + canvas_dir_h / 2);
        } else {
            ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
            roundRect(ctx, canvas_dir_x, canvas_dir_y, canvas_dir_w, canvas_dir_h, 4, true, false);
            
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#d4af37";
            ctx.setLineDash([4, 4]);
            roundRect(ctx, canvas_dir_x, canvas_dir_y, canvas_dir_w, canvas_dir_h, 4, false, true);
            ctx.setLineDash([]);
            
            ctx.fillStyle = "#d4af37";
            ctx.font = "bold 13px 'Cinzel', serif";
            ctx.fillText("DIRECTOR", canvas_dir_x + canvas_dir_w / 2, canvas_dir_y + canvas_dir_h / 2);
        }
        
        // Dibujar sillas
        for (let r = 0; r < numRows; r++) {
            const R = 175 + r * 65;
            const theta_start = 195 - r * 3;
            const theta_end = 345 + r * 3;
            
            const N = state.formacionConcierto[r].length;
            for (let i = 0; i < N; i++) {
                const musicianId = state.formacionConcierto[r][i];
                
                let angleDeg = 270;
                if (N > 1) {
                    angleDeg = theta_start + i * ((theta_end - theta_start) / (N - 1));
                }
                
                const angleRad = angleDeg * (Math.PI / 180);
                const x_html = X_c_html + R * Math.cos(angleRad);
                const y_html = Y_c_html + R * Math.sin(angleRad);
                
                const canvas_x = 100 + (x_html / 800) * 1000;
                const canvas_y = 160 + (y_html / 480) * 520;
                
                drawCanvasParadeSeat(ctx, canvas_x, canvas_y, musicianId, false);
            }
        }
    } else {
        // --- Modo Desfile Horizontal ---
        ctx.strokeStyle = "rgba(212, 175, 55, 0.1)";
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 8]);
        
        ctx.beginPath();
        ctx.moveTo(30, 220);
        ctx.lineTo(canvasWidth - 30, 220);
        ctx.moveTo(30, 580);
        ctx.lineTo(canvasWidth - 30, 580);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
        ctx.font = "bold 13px 'Cinzel', serif";
        ctx.fillText("COLA", 60, 400);
        ctx.fillText("FRENTE", canvasWidth - 60, 400);
        
        const L = state.formacionDesfile.length;
        const canvasColSpacing = 60;
        const startX = 130;
        
        for (let c = 0; c < L; c++) {
            const canvas_x = startX + c * canvasColSpacing;
            
            // Dibujar el eje de la fila
            ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(canvas_x, 240);
            ctx.lineTo(canvas_x, 560);
            ctx.stroke();
            ctx.setLineDash([]);
            
            const N = state.formacionDesfile[c].length;
            for (let r = 0; r < N; r++) {
                const musicianId = state.formacionDesfile[c][r];
                
                let canvas_y = 400;
                if (N > 1) {
                    canvas_y = 250 + r * (300 / (N - 1));
                }
                
                drawCanvasParadeSeat(ctx, canvas_x, canvas_y, musicianId, true);
            }
        }
    }
    
    drawSimulatorLegend(ctx, canvasWidth);
    
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Formacion_${simActiveMode === "concierto" ? "Concierto" : "Desfile"}_Yacente.png`;
    link.href = dataUrl;
    link.click();
    showToast("Imagen de la formación descargada con éxito", "success");
}

function drawCanvasSeat(ctx, x, y, seatId, seatNumber, formationMap, smallerRadius) {
    const musicianId = formationMap[seatId];
    const m = musicianId ? state.musicians.find(x => x.id === musicianId) : null;
    
    const r = smallerRadius ? 14 : 18;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    
    if (m) {
        const colors = SECTION_COLORS[m.instrument] || { bg: "#7f8c8d", border: "#707b7c", text: "#ffffff" };
        
        ctx.fillStyle = colors.bg;
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.border;
        ctx.stroke();
        
        ctx.fillStyle = colors.text;
        ctx.font = smallerRadius ? "bold 8px 'Outfit', sans-serif" : "bold 9px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const shortName = getShortName(m.name);
        ctx.fillText(shortName, x, y);
    } else {
        ctx.fillStyle = "rgba(20, 4, 7, 0.6)";
        ctx.fill();
        
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = "rgba(212, 175, 55, 0.5)";
        ctx.font = smallerRadius ? "8px 'Outfit', sans-serif" : "9px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(seatNumber.toString(), x, y);
    }
}

function drawCanvasParadeSeat(ctx, x, y, musicianId, smallerRadius) {
    const m = state.musicians.find(x => x.id === musicianId);
    const r = smallerRadius ? 14 : 18;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    
    if (m) {
        const colors = SECTION_COLORS[m.instrument] || { bg: "#7f8c8d", border: "#707b7c", text: "#ffffff" };
        
        ctx.fillStyle = colors.bg;
        ctx.fill();
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.border;
        ctx.stroke();
        
        ctx.fillStyle = colors.text;
        ctx.font = smallerRadius ? "bold 8px 'Outfit', sans-serif" : "bold 9px 'Outfit', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const shortName = getShortName(m.name);
        ctx.fillText(shortName, x, y);
    } else {
        ctx.fillStyle = "rgba(20, 4, 7, 0.6)";
        ctx.fill();
        
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function drawSimulatorLegend(ctx, canvasWidth) {
    const width = canvasWidth || 1200;
    const legendItems = [
        { label: "Dirección", color: "#d4af37" },
        { label: "Trompetas", color: "#b03a2e" },
        { label: "Cornetas", color: "#7b1e3f" },
        { label: "Fliscornos", color: "#ca6f1e" },
        { label: "Trombones", color: "#2471a3" },
        { label: "Tubas", color: "#1b263b" },
        { label: "Percusión", color: "#1e8449" }
    ];
    
    const startX = width / 2 - (legendItems.length * 85) / 2;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "10px 'Outfit', sans-serif";
    
    legendItems.forEach((item, idx) => {
        const itemX = startX + idx * 85;
        const itemY = 745;
        
        ctx.fillStyle = item.color;
        ctx.fillRect(itemX, itemY - 5, 10, 10);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(itemX, itemY - 5, 10, 10);
        
        ctx.fillStyle = "#EAEAEA";
        ctx.fillText(item.label, itemX + 15, itemY);
    });
}

// ==========================================================================
// PORTAL DE COMPONENTES / MÚSICOS (LÓGICA Y RENDERIZADO)
// ==========================================================================

function populateLoginMusicians() {
    const select = document.getElementById("login-musician-select");
    if (!select) return;
    
    // Guardar opción seleccionada actualmente
    const currentVal = select.value;
    
    select.innerHTML = '<option value="">-- Elige tu nombre --</option>';
    
    // Ordenar alfabéticamente
    const sorted = [...state.musicians].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(m => {
        const option = document.createElement("option");
        option.value = m.id;
        option.innerText = `${m.name} (${m.instrument})`;
        select.appendChild(option);
    });
    
    if (currentVal) select.value = currentVal;
}

function getMusicianMedalsData(musicianId) {
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return [];

    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    const currentStreak = calculateMusicianStreak(musicianId);
    
    let totalConvocated = 0;
    let attended = 0;
    let absent = 0;
    let justified = 0;
    let attendedPerformances = 0;
    let totalPerformances = 0;

    Object.keys(state.attendance).forEach(date => {
        if (date > todayStr) return;

        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (!record) return;

        const session = state.sessionTypes[date];

        if (record.status === "present") {
            attended++;
            totalConvocated++;
            if (session && session.type === "actuacion") {
                attendedPerformances++;
            }
        } else if (record.status === "absent") {
            totalConvocated++;
            if (record.justified) {
                justified++;
            } else {
                absent++;
            }
        }
        
        if (session && session.type === "actuacion") {
            totalPerformances++;
        }
    });
    
    const attendancePct = totalConvocated > 0 ? (attended / totalConvocated) * 100 : 100;

    // 6. Estudio musical
    let greenMarchas = 0;
    if (state.musicianMarchaStatuses) {
        Object.keys(state.musicianMarchaStatuses).forEach(k => {
            if (k.startsWith(`${musicianId}_`) && state.musicianMarchaStatuses[k] === "green") {
                greenMarchas++;
            }
        });
    }
    const totalMarchas = state.marchas.length || 75;
    let starsEstudio = 0;
    let descEstudio = "";
    let unlockedEstudio = false;
    let nextGoalEstudio = 50;
    if (greenMarchas >= totalMarchas && totalMarchas > 0) {
        starsEstudio = 3;
        descEstudio = `Oro conseguido: Domina las ${totalMarchas} marchas del repertorio.`;
        unlockedEstudio = true;
        nextGoalEstudio = totalMarchas;
    } else if (greenMarchas >= 70) {
        starsEstudio = 2;
        descEstudio = `Plata conseguido: Domina 70 marchas del repertorio. Domina todas (${totalMarchas}) para Oro.`;
        unlockedEstudio = true;
        nextGoalEstudio = totalMarchas;
    } else if (greenMarchas >= 50) {
        starsEstudio = 1;
        descEstudio = "Bronce conseguido: Domina 50 marchas del repertorio. Domina 70 para Plata.";
        unlockedEstudio = true;
        nextGoalEstudio = 70;
    } else {
        starsEstudio = 0;
        descEstudio = "Domina (verde) 50 marchas del repertorio para desbloquear Bronce.";
        unlockedEstudio = false;
        nextGoalEstudio = 50;
    }

    // 7. El clavo, Hasta en la sopa, God (Cálculo de asistencia perfecta mensual/consecutiva)
    const rehearsalDates = Object.keys(state.attendance)
        .filter(d => state.attendance[d] && state.attendance[d][musicianId] && state.sessionTypes[d] && state.sessionTypes[d].type === "ensayo")
        .sort();
        
    let clavoUnlocked = false;
    let sopaUnlocked = false;
    let godUnlocked = false;
    let maxConsecutiveMonths = 0;
    
    if (rehearsalDates.length > 0) {
        const parseMonth = (dStr) => {
            const [y, m] = dStr.split("-");
            return { year: parseInt(y, 10), month: parseInt(m, 10) };
        };
        
        const start = parseMonth(rehearsalDates[0]);
        const end = parseMonth(rehearsalDates[rehearsalDates.length - 1]);
        
        const allMonths = [];
        let currYear = start.year;
        let currMonth = start.month;
        
        while (currYear < end.year || (currYear === end.year && currMonth <= end.month)) {
            allMonths.push(`${currYear}-${currMonth.toString().padStart(2, '0')}`);
            currMonth++;
            if (currMonth > 12) {
                currMonth = 1;
                currYear++;
            }
        }
        
        const monthStats = allMonths.map(mStr => {
            const monthDates = rehearsalDates.filter(d => d.startsWith(mStr));
            let convocations = monthDates.length;
            let absences = 0;
            monthDates.forEach(d => {
                const rec = state.attendance[d][musicianId];
                if (rec && rec.status === "absent") {
                    absences++;
                }
            });
            return { month: mStr, convocations, absences };
        });
        
        clavoUnlocked = monthStats.some(ms => ms.convocations > 0 && ms.absences === 0);
        
        // Deslizar ventanas
        for (let i = 0; i < monthStats.length; i++) {
            if (i <= monthStats.length - 6) {
                const win = monthStats.slice(i, i + 6);
                if (!win.some(ms => ms.absences > 0) && win.some(ms => ms.convocations > 0)) {
                    sopaUnlocked = true;
                }
            }
            if (i <= monthStats.length - 12) {
                const win = monthStats.slice(i, i + 12);
                if (!win.some(ms => ms.absences > 0) && win.some(ms => ms.convocations > 0)) {
                    godUnlocked = true;
                }
            }
        }
        
        let currentStreak = 0;
        monthStats.forEach(ms => {
            if (ms.convocations > 0 && ms.absences === 0) {
                currentStreak++;
                if (currentStreak > maxConsecutiveMonths) {
                    maxConsecutiveMonths = currentStreak;
                }
            } else if (ms.convocations > 0) {
                currentStreak = 0;
            }
        });
    }

    // Doblete
    const performanceDateCounts = {};
    Object.keys(state.attendance).forEach(dateKey => {
        const record = state.attendance[dateKey][musicianId];
        const session = state.sessionTypes[dateKey];
        if (record && record.status === "present" && session && session.type === "actuacion") {
            const baseDate = dateKey.split("_")[0];
            performanceDateCounts[baseDate] = (performanceDateCounts[baseDate] || 0) + 1;
        }
    });
    const dobleteUnlocked = Object.values(performanceDateCounts).some(count => count >= 2);

    // Trotamundos (calculado automáticamente en base a actuaciones asistidas marcadas como viaje)
    let tripCount = 0;
    Object.keys(state.attendance).forEach(dateKey => {
        const record = state.attendance[dateKey][musicianId];
        const session = state.sessionTypes[dateKey];
        if (record && record.status === "present" && session && session.type === "actuacion" && session.isTrip === true) {
            tripCount++;
        }
    });
    let starsTrotamundos = 0;
    let descTrotamundos = "";
    let unlockedTrotamundos = false;
    let nextGoalTrotamundos = 10;
    if (tripCount >= 50) {
        starsTrotamundos = 3;
        descTrotamundos = "Oro conseguido: Completa 50 viajes fuera de la comunidad con la banda.";
        unlockedTrotamundos = true;
        nextGoalTrotamundos = 50;
    } else if (tripCount >= 25) {
        starsTrotamundos = 2;
        descTrotamundos = "Plata conseguido: Completa 25 viajes fuera de la ciudad con la banda. Consigue 50 para Oro.";
        unlockedTrotamundos = true;
        nextGoalTrotamundos = 50;
    } else if (tripCount >= 10) {
        starsTrotamundos = 1;
        descTrotamundos = "Bronce conseguido: Completa 10 viajes fuera de la ciudad con la banda. Consigue 25 para Plata.";
        unlockedTrotamundos = true;
        nextGoalTrotamundos = 25;
    } else {
        starsTrotamundos = 0;
        descTrotamundos = "Completa 10 viajes fuera de la ciudad con la banda para desbloquear Bronce.";
        unlockedTrotamundos = false;
        nextGoalTrotamundos = 10;
    }

    // Compañero de Ruta
    const rutaTrips = musician.badgeRutaTrips || 0;
    let starsRuta = 0;
    let descRuta = "";
    let unlockedRuta = false;
    let nextGoalRuta = 5;
    if (rutaTrips >= 20) {
        starsRuta = 3;
        descRuta = "Oro conseguido: Completa 20 viajes en bus con tus compañeros.";
        unlockedRuta = true;
        nextGoalRuta = 20;
    } else if (rutaTrips >= 10) {
        starsRuta = 2;
        descRuta = "Plata conseguido: Completa 10 viajes en bus con tus compañeros. Consigue 20 para Oro.";
        unlockedRuta = true;
        nextGoalRuta = 20;
    } else if (rutaTrips >= 5) {
        starsRuta = 1;
        descRuta = "Bronce conseguido: Completa 5 viajes en bus con tus compañeros. Consigue 10 para Plata.";
        unlockedRuta = true;
        nextGoalRuta = 10;
    } else {
        starsRuta = 0;
        descRuta = "Completa un 5 viajes en bus con tus compañeros para desbloquear Bronce.";
        unlockedRuta = false;
        nextGoalRuta = 5;
    }

    // Hermandad
    const hermandadEvents = musician.badgeHermandadEvents || 0;
    let starsHermandad = 0;
    let descHermandad = "";
    let unlockedHermandad = false;
    let nextGoalHermandad = 1;
    if (hermandadEvents >= 10) {
        starsHermandad = 3;
        descHermandad = "Oro conseguido: Acude a 10 convivencias o actividades extramusicales de la banda/cofradía.";
        unlockedHermandad = true;
        nextGoalHermandad = 10;
    } else if (hermandadEvents >= 5) {
        starsHermandad = 2;
        descHermandad = "Plata conseguido: Acude a 5 convivencias o actividades extramusicales. Acude a 10 para Oro.";
        unlockedHermandad = true;
        nextGoalHermandad = 10;
    } else if (hermandadEvents >= 1) {
        starsHermandad = 1;
        descHermandad = "Bronce conseguido: Acude a 1 convivencia o actividad extramusical. Acude a 5 para Plata.";
        unlockedHermandad = true;
        nextGoalHermandad = 5;
    } else {
        starsHermandad = 0;
        descHermandad = "Acude a una convivencia o actividad extramusical de la banda/cofradía para desbloquear Bronce.";
        unlockedHermandad = false;
        nextGoalHermandad = 1;
    }

    // Titular indiscutible
    const performancesByYear = {};
    Object.keys(state.attendance).forEach(dateKey => {
        const record = state.attendance[dateKey][musicianId];
        const session = state.sessionTypes[dateKey];
        if (record && session && session.type === "actuacion") {
            const year = dateKey.split("-")[0];
            if (!performancesByYear[year]) {
                performancesByYear[year] = { total: 0, attended: 0 };
            }
            performancesByYear[year].total++;
            if (record.status === "present") {
                performancesByYear[year].attended++;
            }
        }
    });
    
    let starsTitular = 0;
    let descTitular = "";
    let unlockedTitular = false;
    let maxTitularPct = 0;
    let hasPerformances = false;
    let hasPerfectYear = false;

    Object.keys(performancesByYear).forEach(y => {
        const stats = performancesByYear[y];
        if (stats.total > 0) {
            hasPerformances = true;
            const pct = (stats.attended / stats.total) * 100;
            if (pct > maxTitularPct) {
                maxTitularPct = pct;
            }
            if (stats.attended === stats.total) {
                hasPerfectYear = true;
            }
        }
    });

    if (hasPerformances) {
        if (hasPerfectYear) {
            starsTitular = 3;
            descTitular = "Oro conseguido: Asiste al 100% de actuaciones en un año.";
            unlockedTitular = true;
        } else if (maxTitularPct > 95) {
            starsTitular = 2;
            descTitular = "Plata conseguido: Asiste a >95% de las actuaciones en un año. Necesitas el 100% para conseguir Oro.";
            unlockedTitular = true;
        } else if (maxTitularPct > 90) {
            starsTitular = 1;
            descTitular = "Bronce conseguido: Asiste a >90% de las actuaciones en un año. Necesitas >95% para conseguir Plata.";
            unlockedTitular = true;
        } else {
            starsTitular = 0;
            descTitular = "Asiste a >90% de las actuaciones en un año para desbloquear Bronce.";
            unlockedTitular = false;
        }
    } else {
        starsTitular = 0;
        descTitular = "Asiste a >90% de las actuaciones en un año para desbloquear Bronce.";
        unlockedTitular = false;
    }

    // Capitán: Mayor asistencia entre tus compañeros de voz
    let capitanUnlocked = false;
    const peers = state.musicians.filter(m => m.instrument === musician.instrument);
    if (peers.length > 1) {
        let isHighest = true;
        peers.forEach(peer => {
            if (peer.id === musicianId) return;
            
            let pConvocated = 0;
            let pAttended = 0;
            Object.keys(state.attendance).forEach(date => {
                if (date > todayStr) return;
                const record = state.attendance[date] ? state.attendance[date][peer.id] : null;
                if (!record) return;
                if (record.status === "present") {
                    pAttended++;
                    pConvocated++;
                } else if (record.status === "absent") {
                    pConvocated++;
                }
            });
            const peerPct = pConvocated > 0 ? (pAttended / pConvocated) * 100 : 0;
            if (peerPct > attendancePct) {
                isHighest = false;
            }
        });
        if (isHighest && totalConvocated > 0) {
            capitanUnlocked = true;
        }
    } else {
        if (totalConvocated > 0) {
            capitanUnlocked = true;
        }
    }

    let starsRacha = 0;
    let descRacha = "";
    let unlockedRacha = false;
    if (currentStreak >= 20) {
        starsRacha = 3;
        descRacha = "Oro conseguido: Asiste a 20 ensayos consecutivos.";
        unlockedRacha = true;
    } else if (currentStreak >= 10) {
        starsRacha = 2;
        descRacha = "Plata conseguido: Asiste a 10 ensayos consecutivos. Consigue 20 para Oro.";
        unlockedRacha = true;
    } else if (currentStreak >= 5) {
        starsRacha = 1;
        descRacha = "Bronce conseguido: Asiste a 5 ensayos consecutivos. Consigue 10 para Plata.";
        unlockedRacha = true;
    } else {
        starsRacha = 0;
        descRacha = "Asiste a 5 ensayos consecutivos para desbloquear Bronce.";
        unlockedRacha = false;
    }

    let starsAsistencia = 0;
    let descAsistencia = "";
    let unlockedAsistencia = false;
    if (totalConvocated >= 5) {
        if (attendancePct >= 95) {
            starsAsistencia = 3;
            descAsistencia = "Oro conseguido: Asistencia superior al 95%. ¡Máximo compromiso!";
            unlockedAsistencia = true;
        } else if (attendancePct >= 90) {
            starsAsistencia = 2;
            descAsistencia = "Plata conseguido: Asistencia superior al 90%. Necesitas un 95% para conseguir Oro.";
            unlockedAsistencia = true;
        } else if (attendancePct >= 80) {
            starsAsistencia = 1;
            descAsistencia = "Bronce conseguido: Asistencia superior al 80%. Necesitas un 90% para conseguir Plata.";
            unlockedAsistencia = true;
        } else {
            starsAsistencia = 0;
            descAsistencia = "Consigue al menos un 80% de asistencia para desbloquear Bronce.";
            unlockedAsistencia = false;
        }
    } else {
        starsAsistencia = 0;
        descAsistencia = "Consigue al menos un 80% de asistencia para desbloquear Bronce (mín. 5 conv.).";
        unlockedAsistencia = false;
    }

    let starsVeterano = 0;
    let descVeterano = "";
    let unlockedVeterano = false;
    let nextGoalVeterano = 15;
    if (attended >= 100) {
        starsVeterano = 3;
        descVeterano = "Oro conseguido: Alcanza un total de 100 asistencias.";
        unlockedVeterano = true;
        nextGoalVeterano = 100;
    } else if (attended >= 50) {
        starsVeterano = 2;
        descVeterano = "Plata conseguido: Alcanza un total de 50 asistencias. Consigue 100 para Oro.";
        unlockedVeterano = true;
        nextGoalVeterano = 100;
    } else if (attended >= 15) {
        starsVeterano = 1;
        descVeterano = "Bronce conseguido: Alcanza un total de 15 asistencias. Consigue 50 para Plata.";
        unlockedVeterano = true;
        nextGoalVeterano = 50;
    } else {
        starsVeterano = 0;
        descVeterano = "Alcanza un total de 15 asistencias para desbloquear Bronce.";
        unlockedVeterano = false;
        nextGoalVeterano = 15;
    }

    return [
        { id: "racha", title: "Racha de Fuego", icon: "🔥", desc: descRacha, unlocked: unlockedRacha, stars: starsRacha, progressPct: Math.min((currentStreak / 20) * 100, 100), progressText: `${currentStreak}/20` },
        { id: "asistencia", title: "Asistencia Ejemplar", icon: "🏆", desc: descAsistencia, unlocked: unlockedAsistencia, stars: starsAsistencia, progressPct: Math.min(attendancePct, 100), progressText: `${Math.round(attendancePct)}% (mín. 5 conv.)` },
        { id: "veterano", title: "Paso firme", icon: "👣", desc: descVeterano, unlocked: unlockedVeterano, stars: starsVeterano, progressPct: Math.min((attended / nextGoalVeterano) * 100, 100), progressText: `${attended}/${nextGoalVeterano}` },
        { id: "comprometido", title: "Comprometido", icon: "📝", desc: "Cero ausencias injustificadas.", unlocked: absent === 0 && totalConvocated > 0, progressPct: (absent === 0 && totalConvocated > 0) ? 100 : 0, progressText: (absent === 0 && totalConvocated > 0) ? 'Sin faltas injustificadas' : `Faltas: ${absent}` },
        { id: "estudio", title: "Estudio musical", icon: "📚", desc: descEstudio, unlocked: unlockedEstudio, stars: starsEstudio, progressPct: Math.min((greenMarchas / nextGoalEstudio) * 100, 100), progressText: `${greenMarchas}/${nextGoalEstudio} dominada${greenMarchas === 1 ? '' : 's'}` },
        { id: "god", title: "Alma de la banda", icon: "👑", desc: "Asiste a todos los ensayos durante 1 año.", unlocked: godUnlocked, progressPct: godUnlocked ? 100 : Math.min((maxConsecutiveMonths / 12) * 100, 100), progressText: `${Math.min(maxConsecutiveMonths, 12)}/12 meses` },
        { id: "marea", title: "Contra viento y marea", icon: "⛈️", desc: "Ensaya bajo condiciones climáticas extremas.", unlocked: !!musician.badgeWeather, progressPct: !!musician.badgeWeather ? 100 : 0, progressText: !!musician.badgeWeather ? "¡Otorgado!" : "No otorgada" },
        { id: "doblete", title: "Doblete", icon: "👥", desc: "Toca en dos actuaciones el mismo día.", unlocked: dobleteUnlocked, progressPct: dobleteUnlocked ? 100 : 0, progressText: dobleteUnlocked ? "¡Conseguido!" : "0/2 salidas" },
        { id: "trotamundos", title: "Catador de paellas", icon: "✈️", desc: descTrotamundos, unlocked: unlockedTrotamundos, stars: starsTrotamundos, progressPct: Math.min((tripCount / nextGoalTrotamundos) * 100, 100), progressText: `${tripCount}/${nextGoalTrotamundos} viaje${tripCount === 1 ? '' : 's'}` },
        { id: "titular", title: "Titular indiscutible", icon: "🛡️", desc: descTitular, unlocked: unlockedTitular, stars: starsTitular, progressPct: maxTitularPct, progressText: unlockedTitular ? `${Math.round(maxTitularPct)}% anual conseguido` : `${Math.round(maxTitularPct)}% anual` },
        { id: "sangre_nueva", title: "Sangre nueva", icon: "🌱", desc: "Completado tu primer año en Yacente, bienvenido a esta familia.", unlocked: !!musician.badgeSangreNueva, progressPct: !!musician.badgeSangreNueva ? 100 : 0, progressText: !!musician.badgeSangreNueva ? "¡Otorgado!" : "No otorgada" },
        { id: "fiel_atril", title: "Fiel al atril", icon: "🎼", desc: "Cinco años de constancia que demuestran que la música y el grupo ya son parte de tu vida.", unlocked: !!musician.badgeFielAtril, progressPct: !!musician.badgeFielAtril ? 100 : 0, progressText: !!musician.badgeFielAtril ? "¡Otorgado!" : "No otorgada" },
        { id: "corazon_yacente", title: "Corazón de Yacente", icon: "❤️", desc: "Un hito de auténtica devoción. Diez años de ensayos, viajes y escenarios que te convierten en un pilar fundamental.", unlocked: !!musician.badgeCorazonYacente, progressPct: !!musician.badgeCorazonYacente ? 100 : 0, progressText: !!musician.badgeCorazonYacente ? "¡Otorgado!" : "No otorgada" },
        { id: "raices_profundas", title: "Raíces profundas", icon: "🌳", desc: "15 años en la agrupación. Toda una vida musical dedicada al proyecto. Un referente indiscutible al que los músicos más jóvenes pueden admirar.", unlocked: !!musician.badgeRaicesProfundas, progressPct: !!musician.badgeRaicesProfundas ? 100 : 0, progressText: !!musician.badgeRaicesProfundas ? "¡Otorgado!" : "No otorgada" },
        { id: "leyenda_viva", title: "Leyenda viva", icon: "👑", desc: "20 años en las filas. Tu lealtad representa la historia y el alma de Yacente.", unlocked: !!musician.badgeLeyendaViva, progressPct: !!musician.badgeLeyendaViva ? 100 : 0, progressText: !!musician.badgeLeyendaViva ? "¡Otorgado!" : "No otorgada" },
        { id: "ruta", title: "Compañero de Ruta", icon: "🚌", desc: descRuta, unlocked: unlockedRuta, stars: starsRuta, progressPct: Math.min((rutaTrips / nextGoalRuta) * 100, 100), progressText: `${rutaTrips}/${nextGoalRuta} viaje${rutaTrips === 1 ? '' : 's'}` },
        { id: "hermandad", title: "Hermandad", icon: "🤝", desc: descHermandad, unlocked: unlockedHermandad, stars: starsHermandad, progressPct: Math.min((hermandadEvents / nextGoalHermandad) * 100, 100), progressText: `${hermandadEvents}/${nextGoalHermandad} actividad${hermandadEvents === 1 ? '' : 'es'}` },
        { id: "agonia", title: "Agonía", icon: "🌹", desc: "Completa tu primer estación de penitencia con la banda.", unlocked: !!musician.badgeAgonia, progressPct: !!musician.badgeAgonia ? 100 : 0, progressText: !!musician.badgeAgonia ? "¡Otorgado!" : "No otorgada" },
        { id: "hasta_final", title: "Hasta el final", icon: "🏁", desc: "Completa todas las actuaciones de gloria de un año.", unlocked: !!musician.badgeHastaElFinal, progressPct: !!musician.badgeHastaElFinal ? 100 : 0, progressText: !!musician.badgeHastaElFinal ? "¡Otorgado!" : "No otorgada" },
        { id: "capitan", title: "Capitán", icon: "👨‍✈️", desc: "Mayor asistencia entre tus compañeros de voz.", unlocked: capitanUnlocked, progressPct: capitanUnlocked ? 100 : 0, progressText: capitanUnlocked ? "¡Líder de la sección!" : "Mayor asistencia requerida" },
        { id: "volver_ensayar", title: "Volver...a ensayar", icon: "⚠️", desc: "Tienes menos de un 50% de asistencia.", unlocked: attendancePct < 50 && totalConvocated > 0, progressPct: Math.min(attendancePct, 100), progressText: `${Math.round(attendancePct)}% de asistencia`, isNegative: true }
    ];
}

function calculateMusicianStreak(musicianId) {
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    const dates = Object.keys(state.attendance)
        .filter(d => {
            if (d > todayStr) return false; // Excluir futuros

            const session = state.sessionTypes[d];
            if (session && session.type !== "ensayo") return false;

            const record = state.attendance[d] ? state.attendance[d][musicianId] : null;
            if (!record) return false; // Si no hay registro, se ignora

            return true;
        })
        .sort((a, b) => b.localeCompare(a));
    
    let streak = 0;
    for (const date of dates) {
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (record && record.status === "present") {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

function renderComponentFicha() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) {
        showToast("Músico no encontrado. Iniciando cierre de sesión.", "error");
        logoutComponent();
        return;
    }
    
    const parts = musician.name.trim().split(" ");
    const initials = parts.map(p => p[0]).slice(0, 2).join("").toUpperCase();
    document.getElementById("comp-avatar-letters").innerText = initials;
    
    document.getElementById("comp-profile-name").innerText = musician.name;
    document.getElementById("comp-profile-details").innerText = `${musician.instrument} • ${musician.role || "Músico"}`;
    
    const currentStreak = calculateMusicianStreak(musicianId);
    document.getElementById("comp-streak-val").innerText = currentStreak;
    
    let totalConvocated = 0;
    let attended = 0;
    let absent = 0;
    let justified = 0;
    let attendedPerformances = 0;
    let totalPerformances = 0;

    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    Object.keys(state.attendance).forEach(date => {
        if (date > todayStr) return; // Excluir sesiones futuras de las estadísticas de asistencia

        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (!record) return; // Si no hay registro en la base de datos para este músico, no computa (igual que el director)

        const session = state.sessionTypes[date];

        if (record.status === "present") {
            attended++;
            totalConvocated++;
            if (session && session.type === "actuacion") {
                attendedPerformances++;
            }
        } else if (record.status === "absent") {
            totalConvocated++;
            if (record.justified) {
                justified++;
            } else {
                absent++;
            }
        }
        
        if (session && session.type === "actuacion") {
            totalPerformances++;
        }
    });
    
    const attendancePct = totalConvocated > 0 ? (attended / totalConvocated) * 100 : 100;

    // Poblar debug box
    const debugBox = document.getElementById("ficha-debug-box");
    if (debugBox) {
        const matchingRecords = Object.keys(state.attendance)
            .map(d => ({ date: d, status: state.attendance[d][musicianId] ? state.attendance[d][musicianId].status : 'none' }))
            .filter(x => x.status !== 'none');
        debugBox.innerHTML = `
            <strong>Diagnóstico de Asistencia:</strong><br>
            • ID de Músico: <code>${musicianId}</code> (Nombre: ${musician.name})<br>
            • Fecha de Hoy: <code>${todayStr}</code><br>
            • Convocados Computados: <strong>${totalConvocated}</strong> | Asistidos: <strong>${attended}</strong> | Faltas: <strong>${absent}</strong><br>
            • Porcentaje Computado: <strong>${Math.round(attendancePct)}%</strong><br>
            • Registros de Asistencia encontrados para este ID: <code>${JSON.stringify(matchingRecords)}</code>
        `;
    }
    
    document.getElementById("comp-stat-attended").innerText = attended;
    document.getElementById("comp-stat-absent").innerText = absent;
    document.getElementById("comp-stat-justified").innerText = justified;
    document.getElementById("comp-percentage-text").textContent = `${Math.round(attendancePct)}%`;
    
    const progressPath = document.getElementById("comp-progress-path");
    if (progressPath) {
        progressPath.setAttribute("stroke-dasharray", `${Math.round(attendancePct)}, 100`);
    }
    
    // --- EVALUAR MEDALLAS / INSIGNIAS ---
    const medalsData = getMusicianMedalsData(musicianId);
    medalsData.forEach(medal => {
        const medalCard = document.getElementById(`medal-${medal.id}`);
        if (medalCard) {
            if (medal.isNegative) {
                medalCard.className = `medal-card ${medal.unlocked ? 'negative-unlocked' : 'locked'}`;
            } else {
                let activeClasses = `medal-card ${medal.unlocked ? 'unlocked' : 'locked'}`;
                if (medal.unlocked && medal.stars > 0) {
                    activeClasses += ` unlocked-${medal.stars}star`;
                }
                medalCard.className = activeClasses;
            }
            const descEl = medalCard.querySelector(".medal-desc");
            if (descEl && medal.desc) {
                descEl.innerText = medal.desc;
            }
            const progressEl = medalCard.querySelector(".progress");
            if (progressEl) progressEl.style.width = `${medal.progressPct}%`;
            const textEl = medalCard.querySelector(".medal-progress-text");
            if (textEl) textEl.innerText = medal.progressText;

            // Render stars if the medal supports them
            let starsContainer = medalCard.querySelector(".medal-stars");
            if (medal.stars !== undefined) {
                if (!starsContainer) {
                    const iconWrapper = medalCard.querySelector(".medal-icon-wrapper");
                    if (iconWrapper) {
                        iconWrapper.style.position = "relative";
                        starsContainer = document.createElement("div");
                        starsContainer.className = "medal-stars";
                        iconWrapper.appendChild(starsContainer);
                    }
                }
                if (starsContainer) {
                    if (medal.stars > 0) {
                        let starsHTML = "";
                        for (let i = 1; i <= 3; i++) {
                            if (i <= medal.stars) {
                                starsHTML += '<span class="medal-star-icon filled">★</span>';
                            } else {
                                starsHTML += '<span class="medal-star-icon">★</span>';
                            }
                        }
                        starsContainer.innerHTML = starsHTML;
                        starsContainer.style.display = "flex";
                    } else {
                        starsContainer.style.display = "none";
                    }
                }
            } else {
                if (starsContainer) {
                    starsContainer.remove();
                }
            }
        }
    });

    // Contabilizar insignias positivas desbloqueadas, donde cada estrella cuenta como una insignia
    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);
    const unlockedInsigniasCount = hasVolverEnsayar ? 0 : medalsData.reduce((acc, m) => {
        if (!m.unlocked || m.isNegative) return acc;
        return acc + (m.stars || 1);
    }, 0);
    const insigniasValEl = document.getElementById("comp-insignias-val");
    if (insigniasValEl) {
        insigniasValEl.innerText = unlockedInsigniasCount;
    }
    const compInsigniasBadge = document.getElementById("comp-insignias-badge");
    if (compInsigniasBadge) {
        const iconEl = compInsigniasBadge.querySelector(".insignias-badge-icon");
        if (hasVolverEnsayar) {
            compInsigniasBadge.classList.add("alarm-red");
            if (iconEl) iconEl.innerText = "⚠️";
        } else {
            compInsigniasBadge.classList.remove("alarm-red");
            if (iconEl) iconEl.innerText = "🏅";
        }
    }

    // Notificaciones Card State Handling
    const notifCard = document.getElementById("comp-notifications-card");
    const notifStatus = document.getElementById("comp-notifications-status");
    const btnEnableNotif = document.getElementById("btn-comp-enable-notifications");
    
    if (notifCard && notifStatus && btnEnableNotif) {
        if (!("Notification" in window)) {
            notifStatus.innerText = "No soportado en este navegador.";
            btnEnableNotif.style.display = "none";
            notifCard.style.display = "flex";
        } else if (Notification.permission === "granted") {
            notifCard.style.display = "none";
        } else if (Notification.permission === "denied") {
            notifStatus.innerText = "Notificaciones bloqueadas. Por favor, habilítalas en la configuración de tu navegador para recibir avisos.";
            btnEnableNotif.innerText = "Bloqueado";
            btnEnableNotif.disabled = true;
            btnEnableNotif.className = "btn btn-secondary btn-sm";
            btnEnableNotif.style.opacity = "0.5";
            notifCard.style.display = "flex";
        } else {
            notifCard.style.display = "flex";
            notifStatus.innerText = "Habilita avisos de nuevos ensayos y actuaciones para los que estés convocado.";
            if (btnEnableNotif.tagName === "BUTTON") {
                // Avoid duplicating listeners by replacing with a clone
                const newBtn = btnEnableNotif.cloneNode(true);
                btnEnableNotif.parentNode.replaceChild(newBtn, btnEnableNotif);
                newBtn.addEventListener("click", () => {
                    Notification.requestPermission().then(permission => {
                        renderComponentFicha();
                        if (permission === "granted") {
                            showToast("¡Notificaciones de escritorio habilitadas!", "success");
                            registerDeviceToken(musicianId);
                        }
                    });
                });
            }
        }
    }

    // Actualizar badge de notificaciones
    updateNotificationsBadge();

    // Renderizar ranking de los 10 mejores
    renderComponenteRanking();
}

function renderComponenteRanking() {
    const container = document.getElementById("comp-ranking-container");
    if (!container) return;
    container.innerHTML = "";

    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    // Calcular estadísticas para todos los músicos
    const rankingData = state.musicians.map(musician => {
        const musicianId = musician.id;
        
        let totalConvocated = 0;
        let attended = 0;
        
        Object.keys(state.attendance).forEach(date => {
            if (date > todayStr) return;
            const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
            if (!record) return;
            
            totalConvocated++;
            if (record.status === "present") {
                attended++;
            }
        });
        
        const attendancePct = totalConvocated > 0 ? (attended / totalConvocated) * 100 : 100;
        const currentStreak = calculateMusicianStreak(musicianId);
        
        const medalsData = getMusicianMedalsData(musicianId);
        const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);
        const unlockedInsigniasCount = hasVolverEnsayar ? 0 : medalsData.reduce((acc, m) => {
            if (!m.unlocked || m.isNegative) return acc;
            return acc + (m.stars || 1);
        }, 0);
        
        return {
            name: musician.name,
            attendancePct,
            streak: currentStreak,
            badgesCount: unlockedInsigniasCount
        };
    });

    // Ordenar de mayor a menor porcentaje de asistencia, y luego por insignias/racha como criterio de desempate
    rankingData.sort((a, b) => {
        if (Math.round(b.attendancePct) !== Math.round(a.attendancePct)) {
            return b.attendancePct - a.attendancePct;
        }
        if (b.badgesCount !== a.badgesCount) {
            return b.badgesCount - a.badgesCount;
        }
        return b.streak - a.streak;
    });

    // Quedarse con los 10 mejores
    const top10 = rankingData.slice(0, 10);

    top10.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "comp-ranking-card";
        
        // Estilo especial para el top 3
        let rankBadgeClass = "rank-badge";
        if (index === 0) rankBadgeClass += " rank-gold";
        else if (index === 1) rankBadgeClass += " rank-silver";
        else if (index === 2) rankBadgeClass += " rank-bronze";
        
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                <div class="${rankBadgeClass}">${index + 1}</div>
                <div style="font-weight: 600; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary); flex: 1;">
                    ${item.name}
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 15px; flex-shrink: 0; font-weight: 500; font-size: 0.9rem;">
                <div style="color: var(--color-gold); font-family: 'Cinzel', serif; font-weight: bold;">
                    ${Math.round(item.attendancePct)}%
                </div>
                <div style="display: flex; align-items: center; gap: 4px; color: var(--text-secondary);" title="Racha de asistencia">
                    🔥 <span>${item.streak}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 4px; color: var(--text-secondary);" title="Insignias obtenidas">
                    🏅 <span>${item.badgesCount}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function populateHistoryFilters(dates) {
    const yearSelect = document.getElementById("filter-history-year");
    if (!yearSelect) return;
    
    // Get unique years
    const years = new Set();
    dates.forEach(d => {
        const parts = d.split("-");
        if (parts[0]) {
            years.add(parts[0]);
        }
    });
    const sortedYears = Array.from(years).sort((a, b) => b.localeCompare(a));
    
    // Check if options already match
    const currentOptions = Array.from(yearSelect.options)
        .map(opt => opt.value)
        .filter(val => val !== "all");
        
    const isSame = currentOptions.length === sortedYears.length && 
                  currentOptions.every((val, index) => val === sortedYears[index]);
                  
    if (!isSame) {
        const selectedYear = yearSelect.value || "all";
        yearSelect.innerHTML = '<option value="all">Años</option>';
        sortedYears.forEach(y => {
            const opt = document.createElement("option");
            opt.value = y;
            opt.innerText = y;
            yearSelect.appendChild(opt);
        });
        if (sortedYears.includes(selectedYear)) {
            yearSelect.value = selectedYear;
        } else {
            yearSelect.value = "all";
        }
    }
}

function renderComponentHistorial() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;
    
    const filterType = document.getElementById("filter-history-type").value;
    const filterYear = document.getElementById("filter-history-year") ? document.getElementById("filter-history-year").value : "all";
    const filterMonth = document.getElementById("filter-history-month") ? document.getElementById("filter-history-month").value : "all";
    const container = document.getElementById("componente-historial-lista");
    container.innerHTML = "";
    
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    // Obtener todas las fechas únicas de sessionTypes y attendance
    const allUniqueDates = Array.from(new Set([
        ...Object.keys(state.sessionTypes),
        ...Object.keys(state.attendance)
    ]));

    // Obtener todas las fechas en las que el músico está convocado o tiene registro (sólo pasadas)
    const allConvocatedDates = allUniqueDates.filter(date => {
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        return date <= todayStr && record !== null && record !== undefined;
    });
        
    populateHistoryFilters(allConvocatedDates);
    
    const dates = allConvocatedDates
        .filter(d => {
            const session = state.sessionTypes[d] || { type: "ensayo", subtype: "general", name: "Ensayo" };
            if (filterType !== "all" && session.type !== filterType) return false;
            
            const dateParts = d.split("-"); // [YYYY, MM, DD]
            if (filterYear !== "all" && dateParts[0] !== filterYear) return false;
            
            if (filterMonth !== "all") {
                const monthIndex = parseInt(dateParts[1], 10) - 1; // 0-11
                if (monthIndex.toString() !== filterMonth) return false;
            }
            
            return true;
        })
        .sort((a, b) => b.localeCompare(a));
        
    if (dates.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay registros de asistencia para el filtro seleccionado.</p>
            </div>
        `;
        return;
    }
    
    dates.forEach(date => {
        const session = state.sessionTypes[date] || { type: "ensayo", subtype: "general", name: "Ensayo" };
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        
        let badgeClass = "present";
        let badgeText = "Presente";

        if (record) {
            if (record.status === "absent") {
                if (record.justified) {
                    badgeClass = "justified";
                    badgeText = "Justificada";
                } else {
                    badgeClass = "absent";
                    badgeText = "Ausente";
                }
            }
        } else {
            // Sesiones pasadas sin registro cuentan como Ausente
            badgeClass = "absent";
            badgeText = "Ausente";
        }
        
        const typeClass = session.type === "ensayo" ? "ensayo" : "actuacion";
        
        let typeLabel = "";
        if (session.type === "ensayo") {
            const subtype = session.subtype || "general";
            if (subtype === "general") {
                typeLabel = "General";
            } else if (subtype === "trompetas1") {
                typeLabel = "Trompetas 1ª";
            } else if (subtype === "bajos") {
                typeLabel = "Bajos";
            } else if (subtype === "trompetas2y3") {
                typeLabel = "Trompetas 2ª y 3ª";
            } else if (subtype === "cornetas") {
                typeLabel = "Cornetas";
            } else if (subtype === "percusion") {
                typeLabel = "Percusión";
            } else if (subtype === "voces") {
                typeLabel = "Voces";
            } else if (subtype === "primeras") {
                typeLabel = "Primeras";
            } else {
                typeLabel = "Ensayo";
            }
        } else {
            typeLabel = "Actuación";
        }
        
        const sessionTitle = session.name || (session.type === "ensayo" ? typeLabel : "Actuación Oficial");
        
        const row = document.createElement("div");
        row.className = "comp-session-row";
        row.style.display = "flex";
        row.style.alignItems = "stretch";
        row.style.gap = "10px";
        row.style.width = "100%";
        
        const dateParts = date.split("-");
        const yr = dateParts[0];
        const moNum = parseInt(dateParts[1], 10);
        const dy = parseInt(dateParts[2], 10);
        const monthsAbbr = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        const moAbbr = monthsAbbr[moNum - 1] || "";
        
        row.innerHTML = `
            <div class="comp-date-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; width: 60px; min-width: 60px; padding: 6px; box-sizing: border-box; text-align: center; border-left: 3px solid var(--color-gold);">
                <div style="font-size: 1.35rem; font-weight: 700; color: var(--text-color); line-height: 1.1; font-family: 'Outfit', sans-serif;">${dy}</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; color: var(--color-gold); font-weight: 600; margin-top: 2px; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">${moAbbr}</div>
                <div style="font-size: 0.62rem; color: var(--text-muted); font-weight: 500; font-family: 'Outfit', sans-serif; margin-top: 1px;">${yr}</div>
            </div>
            <div class="comp-session-card" style="flex: 1; min-width: 0; margin: 0; display: flex; justify-content: space-between; align-items: center;">
                <div class="comp-session-meta">
                    <h4 class="comp-session-title">${sessionTitle}</h4>
                    <div class="comp-session-details">
                        ${session.type === "ensayo" ? `<span class="comp-session-location" style="font-size: 0.78rem; color: var(--text-muted); font-weight: 500; display: block; margin-top: 2px;">${session.location || "Parking"}</span>` : `<span class="comp-session-type ${typeClass}">${typeLabel}</span>`}
                    </div>
                </div>
                <div class="comp-session-status-row" style="display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0;">
                    <span class="comp-attendance-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
        `;
        
        container.appendChild(row);
    });
}

function renderComponentEventos() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;
    
    const container = document.getElementById("componente-eventos-lista");
    if (!container) return;
    container.innerHTML = "";
    
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    // Obtener todas las fechas únicas de sessionTypes y attendance
    const allUniqueDates = Array.from(new Set([
        ...Object.keys(state.sessionTypes),
        ...Object.keys(state.attendance)
    ]));

    // Obtener todas las fechas futuras en las que el músico está convocado
    const allFutureDates = allUniqueDates.filter(date => {
        if (date <= todayStr) return false;
        
        const session = state.sessionTypes[date] || { type: "ensayo", subtype: "general", name: "Ensayo" };
        const isSpecialRehearsal = session.type === "ensayo" && session.subtype !== "general" && session.convocatedVoices && session.convocatedVoices.length > 0;
        if (isSpecialRehearsal && !session.convocatedVoices.includes(musician.instrument)) {
            return false;
        }
        return true;
    });
        
    const dates = allFutureDates.sort((a, b) => a.localeCompare(b));
        
    if (dates.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay eventos programados próximamente.</p>
            </div>
        `;
        return;
    }
    
    dates.forEach(date => {
        const session = state.sessionTypes[date] || { type: "ensayo", subtype: "general", name: "Ensayo" };
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        
        let badgeClass = "pending clickable-badge";
        let badgeText = "Pendiente";

        if (record) {
            badgeText = "Preaviso";
            if (record.status === "present") {
                badgeClass = "present clickable-badge";
            } else if (record.status === "absent") {
                if (record.justified) {
                    badgeClass = "justified clickable-badge";
                } else {
                    badgeClass = "absent clickable-badge";
                }
            }
        }
        
        const typeClass = session.type === "ensayo" ? "ensayo" : "actuacion";
        
        let typeLabel = "";
        if (session.type === "ensayo") {
            const subtype = session.subtype || "general";
            if (subtype === "general") {
                typeLabel = "General";
            } else if (subtype === "trompetas1") {
                typeLabel = "Trompetas 1ª";
            } else if (subtype === "bajos") {
                typeLabel = "Bajos";
            } else if (subtype === "trompetas2y3") {
                typeLabel = "Trompetas 2ª y 3ª";
            } else if (subtype === "cornetas") {
                typeLabel = "Cornetas";
            } else if (subtype === "percusion") {
                typeLabel = "Percusión";
            } else if (subtype === "voces") {
                typeLabel = "Voces";
            } else if (subtype === "primeras") {
                typeLabel = "Primeras";
            } else {
                typeLabel = "Ensayo";
            }
        } else {
            typeLabel = "Actuación";
        }
        
        const sessionTitle = session.name || (session.type === "ensayo" ? typeLabel : "Actuación Oficial");
        
        const row = document.createElement("div");
        row.className = "comp-session-row";
        row.style.display = "flex";
        row.style.alignItems = "stretch";
        row.style.gap = "10px";
        row.style.width = "100%";
        
        const dateParts = date.split("-");
        const yr = dateParts[0];
        const moNum = parseInt(dateParts[1], 10);
        const dy = parseInt(dateParts[2], 10);
        const monthsAbbr = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        const moAbbr = monthsAbbr[moNum - 1] || "";
        
        row.innerHTML = `
            <div class="comp-date-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; width: 60px; min-width: 60px; padding: 6px; box-sizing: border-box; text-align: center; border-left: 3px solid var(--color-gold);">
                <div style="font-size: 1.35rem; font-weight: 700; color: var(--text-color); line-height: 1.1; font-family: 'Outfit', sans-serif;">${dy}</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; color: var(--color-gold); font-weight: 600; margin-top: 2px; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">${moAbbr}</div>
                <div style="font-size: 0.62rem; color: var(--text-muted); font-weight: 500; font-family: 'Outfit', sans-serif; margin-top: 1px;">${yr}</div>
            </div>
            <div class="comp-session-card" style="flex: 1; min-width: 0; margin: 0; display: flex; justify-content: space-between; align-items: center;">
                <div class="comp-session-meta">
                    <h4 class="comp-session-title">${sessionTitle}</h4>
                    <div class="comp-session-details">
                        ${session.type === "ensayo" ? `<span class="comp-session-location" style="font-size: 0.78rem; color: var(--text-muted); font-weight: 500; display: block; margin-top: 2px;">${session.location || "Parking"}</span>` : `<span class="comp-session-type ${typeClass}">${typeLabel}</span>`}
                    </div>
                </div>
                <div class="comp-session-status-row" style="display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0;">
                    <span class="comp-attendance-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
        `;
        
        const badge = row.querySelector(".comp-attendance-badge");
        if (badge) {
            badge.addEventListener("click", () => {
                openPreavisoModal(date);
            });
        }
        
        container.appendChild(row);
    });
}

function renderComponenteCalendario() {
    const grid = document.getElementById("comp-calendar-days-grid");
    const monthYearHeader = document.getElementById("comp-calendar-month-year");
    if (!grid || !monthYearHeader) return;

    grid.innerHTML = "";

    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return;

    // Inicializar fecha del calendario si no está definida
    if (state.compCalendarYear === undefined || state.compCalendarMonth === undefined) {
        const today = new Date();
        state.compCalendarYear = today.getFullYear();
        state.compCalendarMonth = today.getMonth();
    }

    const year = state.compCalendarYear;
    const month = state.compCalendarMonth;

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    monthYearHeader.innerText = `${monthNames[month]} ${year}`;

    // Obtener primer día del mes y total de días
    const firstDay = new Date(year, month, 1);
    // Ajustar para empezar en Lunes (0=Lunes, 6=Domingo)
    let startingDay = firstDay.getDay() - 1;
    if (startingDay === -1) startingDay = 6;

    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    // Fecha de hoy para destacar
    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDay = today.getDate();

    // Array para acumular las celdas de días
    const cells = [];

    // 1. Días del mes anterior (relleno)
    let prevYear = year;
    let prevMonth = month - 1;
    if (prevMonth === -1) {
        prevMonth = 11;
        prevYear--;
    }
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayNum = prevMonthTotalDays - i;
        const dayCell = document.createElement("div");
        dayCell.className = "comp-calendar-day-card other-month";
        dayCell.innerHTML = `<span class="comp-calendar-day-number">${dayNum}</span>`;
        cells.push(dayCell);
    }

    // 2. Días del mes actual
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "comp-calendar-day-card";
        
        const monthStr = String(month + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateKey = `${year}-${monthStr}-${dayStr}`;
        
        dayCell.setAttribute("data-date", dateKey);
        
        if (isThisMonth && day === todayDay) {
            dayCell.classList.add("today");
        }

        dayCell.innerHTML = `<span class="comp-calendar-day-number">${day}</span>`;

        // Buscar todas las sesiones creadas para este día en las que el músico esté convocado
        const daySessions = Object.keys(state.sessionTypes)
            .filter(key => key.startsWith(dateKey))
            .map(key => ({ key, ...state.sessionTypes[key] }))
            .filter(session => {
                const isSpecialRehearsal = session.type === "ensayo" && session.subtype !== "general" && session.convocatedVoices && session.convocatedVoices.length > 0;
                if (isSpecialRehearsal && !session.convocatedVoices.includes(musician.instrument)) {
                    return false;
                }
                return true;
            });

        if (daySessions.length > 0) {
            // Añadir manejador de click para preaviso
            dayCell.addEventListener("click", () => {
                openPreavisoModal(dateKey);
            });

            // Añadir contenedor de puntos indicadores
            const indicatorContainer = document.createElement("div");
            indicatorContainer.className = "comp-calendar-indicator-container";

            daySessions.forEach(session => {
                const dot = document.createElement("span");
                dot.className = "comp-calendar-dot";
                
                // Determinar estado de asistencia del músico
                const record = state.attendance[dateKey] ? state.attendance[dateKey][musicianId] : null;
                if (record) {
                    if (record.status === "present") {
                        dot.classList.add("present");
                        dot.title = `${session.name || 'Convocatoria'}: Asistiré`;
                    } else if (record.status === "absent") {
                        if (record.justified) {
                            dot.classList.add("justified");
                            dot.title = `${session.name || 'Convocatoria'}: Ausencia Justificada`;
                        } else {
                            dot.classList.add("absent");
                            dot.title = `${session.name || 'Convocatoria'}: Ausencia`;
                        }
                    }
                } else {
                    dot.classList.add("pending");
                    dot.title = `${session.name || 'Convocatoria'}: Pendiente`;
                }
                indicatorContainer.appendChild(dot);
            });
            dayCell.appendChild(indicatorContainer);
        }

        cells.push(dayCell);
    }

    // 3. Días del mes siguiente (relleno)
    const gridCellCount = cells.length;
    const paddingNeeded = 42 - gridCellCount;
    for (let day = 1; day <= paddingNeeded; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "comp-calendar-day-card other-month";
        dayCell.innerHTML = `<span class="comp-calendar-day-number">${day}</span>`;
        cells.push(dayCell);
    }

    // Renderizar
    cells.forEach(c => grid.appendChild(c));

    // Enlazar eventos de navegación una sola vez
    if (!window.compCalendarEventsBound) {
        window.compCalendarEventsBound = true;
        
        document.getElementById("btn-comp-calendar-prev").addEventListener("click", () => {
            state.compCalendarMonth--;
            if (state.compCalendarMonth === -1) {
                state.compCalendarMonth = 11;
                state.compCalendarYear--;
            }
            renderComponenteCalendario();
        });

        document.getElementById("btn-comp-calendar-next").addEventListener("click", () => {
            state.compCalendarMonth++;
            if (state.compCalendarMonth === 12) {
                state.compCalendarMonth = 0;
                state.compCalendarYear++;
            }
            renderComponenteCalendario();
        });

        document.getElementById("btn-comp-calendar-today").addEventListener("click", () => {
            const today = new Date();
            state.compCalendarYear = today.getFullYear();
            state.compCalendarMonth = today.getMonth();
            renderComponenteCalendario();
        });
    }
}

function renderComponentRepertorio() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const totalCount = state.marchas ? state.marchas.length : 0;
    const titleEl = document.querySelector("#section-componente-repertorio h3");
    if (titleEl) {
        titleEl.textContent = `Mi Repertorio (${totalCount})`;
    }
    
    const searchVal = document.getElementById("search-comp-marcha").value.toLowerCase().trim();
    const container = document.getElementById("componente-repertorio-lista");
    container.innerHTML = "";
    
    if (!state.marchas || state.marchas.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay marchas registradas en el repertorio general.</p>
            </div>
        `;
        return;
    }
    
    const filtered = state.marchas.filter(m => {
        const titleMatch = m.title && m.title.toLowerCase().includes(searchVal);
        const composer = m.composer || m.author || "";
        const composerMatch = composer.toLowerCase().includes(searchVal);
        return titleMatch || composerMatch;
    }).sort((a, b) => a.title.localeCompare(b.title));
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No se encontraron marchas que coincidan con la búsqueda.</p>
            </div>
        `;
        return;
    }
    
    if (!state.musicianMarchaStatuses) {
        state.musicianMarchaStatuses = {};
    }
    
    filtered.forEach(marcha => {
        const key = `${musicianId}_${marcha.id}`;
        const currentStatus = state.musicianMarchaStatuses[key] || "";
        const composerName = marcha.composer || marcha.author || "";
        
        const card = document.createElement("div");
        card.className = "comp-marcha-card";
        card.innerHTML = `
            <div class="comp-marcha-info">
                <h4 class="comp-marcha-title">${marcha.title}</h4>
                ${composerName ? `<span class="comp-marcha-composer">${composerName}</span>` : ""}
            </div>
            <button class="comp-status-btn-single status-${currentStatus || 'none'}" title="Cambiar dominio (Toca para alternar)"></button>
        `;
        
        const btn = card.querySelector(".comp-status-btn-single");
        btn.addEventListener("click", () => {
            let nextStatus = "";
            if (currentStatus === "") nextStatus = "red";
            else if (currentStatus === "red") nextStatus = "yellow";
            else if (currentStatus === "yellow") nextStatus = "green";
            else if (currentStatus === "green") nextStatus = "";
            
            updateMusicianMarchaStatus(musicianId, marcha.id, nextStatus);
        });
        
        container.appendChild(card);
    });
}

function updateMusicianMarchaStatus(musicianId, marchaId, status) {
    if (!state.musicianMarchaStatuses) {
        state.musicianMarchaStatuses = {};
    }
    const key = `${musicianId}_${marchaId}`;
    
    if (status === "") {
        delete state.musicianMarchaStatuses[key];
    } else {
        state.musicianMarchaStatuses[key] = status;
    }
    
    localStorage.setItem("harmonia_musician_marcha_statuses", JSON.stringify(state.musicianMarchaStatuses));
    
    if (isCloudActive()) {
        const db = firebase.firestore();
        if (status === "") {
            db.collection("musician_marcha_statuses").doc(key).delete()
                .catch(err => console.error("Error al borrar estado personal en la nube:", err));
        } else {
            db.collection("musician_marcha_statuses").doc(key).set({
                musicianId: musicianId,
                marchaId: marchaId,
                status: status
            }).catch(err => console.error("Error al guardar estado personal en la nube:", err));
        }
    }
    
    showToast("Dominio personal actualizado", "success");
    renderComponentRepertorio();
}

function logoutComponent() {
    stopCloudSync();
    sessionStorage.removeItem("yacente_authenticated");
    sessionStorage.removeItem("yacente_role");
    sessionStorage.removeItem("yacente_musician_id");
    localStorage.removeItem("yacente_authenticated");
    localStorage.removeItem("yacente_role");
    localStorage.removeItem("yacente_musician_id");
    document.body.classList.remove("component-portal");
    
    const mobNav = document.getElementById("component-mobile-nav");
    if (mobNav) mobNav.classList.add("hidden");
    
    const select = document.getElementById("login-musician-select");
    const pin = document.getElementById("login-musician-pin");
    if (select) select.value = "";
    if (pin) pin.value = "";
    
    showLockScreen();
    showToast("Sesión cerrada correctamente", "success");
}

function logoutAdmin() {
    stopCloudSync();
    sessionStorage.removeItem("yacente_authenticated");
    sessionStorage.removeItem("yacente_role");
    localStorage.removeItem("yacente_authenticated");
    localStorage.removeItem("yacente_role");
    
    document.body.classList.remove("component-portal");
    
    // Resetear campos del login
    const select = document.getElementById("login-musician-select");
    const pin = document.getElementById("login-musician-pin");
    if (select) select.value = "";
    if (pin) pin.value = "";
    document.getElementById("lock-password-input").value = "";
    
    showLockScreen();
    showToast("Sesión de administración cerrada", "success");
}

// ==========================================================================
// PREAVISO (RSVP) PORTAL MÚSICOS
// ==========================================================================
function openPreavisoModal(date) {
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;
    
    const eventDateObj = new Date(date + "T00:00:00");
    const todayDateObj = new Date(todayStr + "T00:00:00");
    const diffTime = eventDateObj.getTime() - todayDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
        showToast("Es demasiado tarde para avisar. Por favor, póngase en contacto con la dirección.", "error");
        return;
    }

    state.currentPreavisoDate = date;
    const dateText = document.getElementById("preaviso-date-text");
    if (dateText) {
        dateText.innerText = formatDateSpanish(date);
    }
    
    const musicianId = getAuthMusicianId();
    const record = (state.attendance[date] && musicianId) ? state.attendance[date][musicianId] : null;
    
    const reasonInput = document.getElementById("preaviso-reason-input");
    if (reasonInput) {
        reasonInput.value = "";
    }
    
    // Reset quick reason pills styling
    const pills = document.querySelectorAll("#modal-componente-preaviso .quick-reason-pill");
    pills.forEach(p => {
        p.style.backgroundColor = "rgba(255,255,255,0.02)";
        p.style.borderColor = "rgba(255,255,255,0.1)";
    });

    const justifiedCheckbox = document.getElementById("preaviso-justified-checkbox");
    if (justifiedCheckbox) {
        justifiedCheckbox.checked = true; // Default to true
    }

    if (record) {
        if (record.status === "present") {
            setActiveRsvpButton("present");
        } else if (record.status === "absent") {
            setActiveRsvpButton("absent");
            if (justifiedCheckbox) {
                justifiedCheckbox.checked = record.justified !== false;
            }
            if (reasonInput) {
                reasonInput.value = record.reason || "";
            }
            highlightQuickReasonPill(record.reason || "");
        } else {
            setActiveRsvpButton(null);
        }
    } else {
        setActiveRsvpButton(null);
    }
    
    const modal = document.getElementById("modal-componente-preaviso");
    if (modal) {
        modal.classList.add("active");
    }
}

function setActiveRsvpButton(status) {
    preavisoSelectedStatus = status;
    const btnPresent = document.getElementById("btn-rsvp-presente");
    const btnAbsent = document.getElementById("btn-rsvp-ausente");
    const container = document.getElementById("preaviso-justification-container");

    if (!btnPresent || !btnAbsent || !container) return;

    if (status === 'present') {
        btnPresent.style.backgroundColor = "var(--color-present)";
        btnPresent.style.color = "#FFFFFF";
        btnPresent.style.borderColor = "var(--color-present)";
        btnPresent.style.opacity = "1";
        
        btnAbsent.style.backgroundColor = "rgba(255,255,255,0.02)";
        btnAbsent.style.color = "var(--text-secondary)";
        btnAbsent.style.borderColor = "rgba(255,255,255,0.1)";
        btnAbsent.style.opacity = "0.5";
        
        container.classList.add("hidden");
    } else if (status === 'absent') {
        btnAbsent.style.backgroundColor = "var(--color-absent)";
        btnAbsent.style.color = "#FFFFFF";
        btnAbsent.style.borderColor = "var(--color-absent)";
        btnAbsent.style.opacity = "1";
        
        btnPresent.style.backgroundColor = "rgba(255,255,255,0.02)";
        btnPresent.style.color = "var(--text-secondary)";
        btnPresent.style.borderColor = "rgba(255,255,255,0.1)";
        btnPresent.style.opacity = "0.5";
        
        container.classList.remove("hidden");
    } else {
        btnPresent.style.backgroundColor = "rgba(255,255,255,0.02)";
        btnPresent.style.color = "var(--text-secondary)";
        btnPresent.style.borderColor = "rgba(255,255,255,0.1)";
        btnPresent.style.opacity = "1";
        
        btnAbsent.style.backgroundColor = "rgba(255,255,255,0.02)";
        btnAbsent.style.color = "var(--text-secondary)";
        btnAbsent.style.borderColor = "rgba(255,255,255,0.1)";
        btnAbsent.style.opacity = "1";
        
        container.classList.add("hidden");
    }
}

function highlightQuickReasonPill(value) {
    const pills = document.querySelectorAll("#modal-componente-preaviso .quick-reason-pill");
    pills.forEach(p => {
        if (p.getAttribute("data-value") === value) {
            p.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
            p.style.borderColor = "var(--color-gold)";
        } else {
            p.style.backgroundColor = "rgba(255,255,255,0.02)";
            p.style.borderColor = "rgba(255,255,255,0.1)";
        }
    });
}

function setupPreavisoEvents() {
    const modal = document.getElementById("modal-componente-preaviso");
    if (!modal) return;
    
    const btnClose = document.getElementById("btn-close-preaviso-modal");
    const btnCancel = document.getElementById("btn-cancel-preaviso");
    const btnSave = document.getElementById("btn-save-preaviso");
    const btnPresent = document.getElementById("btn-rsvp-presente");
    const btnAbsent = document.getElementById("btn-rsvp-ausente");
    const reasonInput = document.getElementById("preaviso-reason-input");
    const pills = document.querySelectorAll("#modal-componente-preaviso .quick-reason-pill");
    
    const closeModal = () => {
        modal.classList.remove("active");
    };
    
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);
    
    if (btnPresent) {
        btnPresent.addEventListener("click", () => {
            setActiveRsvpButton("present");
        });
    }
    
    if (btnAbsent) {
        btnAbsent.addEventListener("click", () => {
            setActiveRsvpButton("absent");
        });
    }
    
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            if (reasonInput) {
                reasonInput.value = pill.getAttribute("data-value");
            }
            const justifiedCheckbox = document.getElementById("preaviso-justified-checkbox");
            if (justifiedCheckbox) {
                justifiedCheckbox.checked = true;
            }
            pills.forEach(p => {
                p.style.backgroundColor = "rgba(255,255,255,0.02)";
                p.style.borderColor = "rgba(255,255,255,0.1)";
            });
            pill.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
            pill.style.borderColor = "var(--color-gold)";
        });
    });

    if (reasonInput) {
        reasonInput.addEventListener("input", () => {
            if (reasonInput.value.trim() !== "") {
                const justifiedCheckbox = document.getElementById("preaviso-justified-checkbox");
                if (justifiedCheckbox) {
                    justifiedCheckbox.checked = true;
                }
            }
        });
    }
    
    if (btnSave) {
        btnSave.addEventListener("click", () => {
            if (!preavisoSelectedStatus) {
                showToast("Por favor, selecciona una opción de asistencia.", "error");
                return;
            }
            
            const musicianId = getAuthMusicianId();
            if (!musicianId) {
                showToast("Sesión de músico no válida.", "error");
                return;
            }
            
            const date = state.currentPreavisoDate;
            if (!date) return;
            
            let recordObj = null;
            if (preavisoSelectedStatus === "present") {
                recordObj = {
                    status: "present",
                    justified: false,
                    reason: ""
                };
            } else {
                const justifiedCheckbox = document.getElementById("preaviso-justified-checkbox");
                const isJustified = justifiedCheckbox ? justifiedCheckbox.checked : true;
                const reason = reasonInput ? reasonInput.value.trim() : "";
                
                if (isJustified && reason === "") {
                    showToast("Por favor, introduce el motivo de tu ausencia.", "error");
                    return;
                }
                recordObj = {
                    status: "absent",
                    justified: isJustified,
                    reason: reason
                };
            }
            
            // Guardar local y en Firebase
            if (!state.attendance[date]) {
                state.attendance[date] = {};
            }
            state.attendance[date][musicianId] = recordObj;
            
            dbSaveAttendance(date, musicianId, recordObj);
            
            closeModal();
            showToast("Preaviso guardado correctamente.", "success");
            renderComponentEventos();
            renderComponenteCalendario();
            renderComponentHistorial();
        });
    }
}

function renderGeneralOverviewChart() {
    const container = document.getElementById("stats-ov-chart-container");
    if (!container) return;

    // 1. Gather all rehearsal sessions (only past ones, matching other stats)
    const rehearsalDates = Object.keys(state.attendance).filter(dateKey => {
        const session = state.sessionTypes[dateKey];
        const d = new Date();
        const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        const isPast = dateKey <= todayStr;
        return isPast && (!session || session.type === "ensayo");
    });

    // 2. Dynamic Season Dropdown Population
    const uniqueSeasons = Array.from(new Set(rehearsalDates.map(date => {
        const parts = date.split("-");
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        return m >= 9 ? `${y}-${y+1}` : `${y-1}-${y}`;
    }))).sort((a,b) => b.localeCompare(a));

    const ovYearSelect = document.getElementById("stats-ov-year-select");
    if (ovYearSelect) {
        const currentOptions = Array.from(ovYearSelect.options).map(o => o.value);
        const optionsMatch = currentOptions.length === uniqueSeasons.length && currentOptions.every((val, index) => val === uniqueSeasons[index]);
        if (!optionsMatch) {
            ovYearSelect.innerHTML = "";
            uniqueSeasons.forEach(season => {
                const opt = document.createElement("option");
                opt.value = season;
                opt.innerText = season;
                ovYearSelect.appendChild(opt);
            });
            if (uniqueSeasons.length > 0) {
                if (!uniqueSeasons.includes(state.statsOvSelectedSeason)) {
                    state.statsOvSelectedSeason = uniqueSeasons[0];
                }
                ovYearSelect.value = state.statsOvSelectedSeason;
            }
        }
    }

    if (rehearsalDates.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center; border-left: 2px solid var(--border-color); border-bottom: 2px solid var(--border-color); box-sizing: border-box; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay ensayos registrados de forma histórica para generar gráficos.</p>
            </div>
        `;
        return;
    }

    let chartData = []; // Array of { label: string, pct: number, count: number }

    if (state.statsOvMode === "years") {
        const yearsData = {};
        rehearsalDates.forEach(date => {
            const year = date.split("-")[0];
            if (!yearsData[year]) {
                yearsData[year] = { presents: 0, total: 0, count: 0 };
            }
            
            const dayRecord = state.attendance[date];
            state.musicians.forEach(m => {
                const r = dayRecord[m.id];
                if (r) {
                    yearsData[year].total++;
                    if (r.status === "present") {
                        yearsData[year].presents++;
                    }
                }
            });
            yearsData[year].count++;
        });

        const sortedYears = Object.keys(yearsData).sort((a,b) => a.localeCompare(b));
        sortedYears.forEach(year => {
            const data = yearsData[year];
            const pct = data.total > 0 ? Math.round((data.presents / data.total) * 100) : 0;
            chartData.push({ label: year, pct: pct, count: data.count });
        });
    } else {
        const selectedSeason = state.statsOvSelectedSeason || (() => {
            const today = new Date();
            const y = today.getFullYear();
            const m = today.getMonth() + 1;
            return m >= 9 ? `${y}-${y+1}` : `${y-1}-${y}`;
        })();
        
        const seasonParts = selectedSeason.split("-");
        const year1 = seasonParts[0];
        const year2 = seasonParts[1];

        const seasonMonths = [
            { label: "Sep", monthNum: 9, year: year1 },
            { label: "Oct", monthNum: 10, year: year1 },
            { label: "Nov", monthNum: 11, year: year1 },
            { label: "Dic", monthNum: 12, year: year1 },
            { label: "Ene", monthNum: 1, year: year2 },
            { label: "Feb", monthNum: 2, year: year2 },
            { label: "Mar", monthNum: 3, year: year2 },
            { label: "Abr", monthNum: 4, year: year2 },
            { label: "May", monthNum: 5, year: year2 },
            { label: "Jun", monthNum: 6, year: year2 },
            { label: "Jul", monthNum: 7, year: year2 },
            { label: "Ago", monthNum: 8, year: year2 }
        ];

        const monthsData = Array.from({ length: 12 }, () => ({ presents: 0, total: 0, count: 0 }));
        
        rehearsalDates.forEach(date => {
            const dateParts = date.split("-");
            const y = dateParts[0];
            const m = parseInt(dateParts[1], 10);
            
            const idx = seasonMonths.findIndex(sm => sm.year === y && sm.monthNum === m);
            if (idx !== -1) {
                const dayRecord = state.attendance[date];
                state.musicians.forEach(m => {
                    const r = dayRecord[m.id];
                    if (r) {
                        monthsData[idx].total++;
                        if (r.status === "present") {
                            monthsData[idx].presents++;
                        }
                    }
                });
                monthsData[idx].count++;
            }
        });

        seasonMonths.forEach((sm, idx) => {
            const data = monthsData[idx];
            const pct = data.total > 0 ? Math.round((data.presents / data.total) * 100) : 0;
            chartData.push({ label: sm.label, pct: pct, count: data.count });
        });
    }

    let barsHTML = "";
    chartData.forEach(item => {
        const heightPct = item.pct;
        const tooltip = `${item.label}: ${item.pct}% asistencia (${item.count} ensayo${item.count !== 1 ? 's' : ''})`;
        const displayValue = item.count > 0 ? `${item.pct}%` : "-";
        
        barsHTML += `
            <div class="chart-bar-wrapper" style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 32px; max-width: 60px; height: 100%; justify-content: flex-end; position: relative;">
                <span class="bar-value" style="font-size: 0.72rem; font-weight: 700; color: var(--color-gold); margin-bottom: 6px; z-index: 2; transition: opacity 0.2s;">
                    ${displayValue}
                </span>
                <div class="bar-fill" style="width: 60%; height: ${heightPct}%; background: linear-gradient(180deg, var(--color-gold) 0%, rgba(212, 175, 55, 0.4) 100%); border-radius: 4px 4px 0 0; transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: help; min-height: ${item.count > 0 ? '4px' : '0px'}" title="${tooltip}"></div>
                <span class="bar-label" style="position: absolute; bottom: -24px; font-size: 0.72rem; color: var(--text-color); font-weight: 600; white-space: nowrap; text-transform: capitalize;">
                    ${item.label}
                </span>
            </div>
        `;
    });

    const justifyStyle = state.statsOvMode === "years" ? "flex-start" : "space-around";
    const gapStyle = state.statsOvMode === "years" ? "24px" : "8px";
    const paddingLeftStyle = state.statsOvMode === "years" ? "16px" : "0px";

    container.innerHTML = `
        <div class="custom-vertical-chart" style="display: flex; height: 300px; width: 100%; border-bottom: 2px solid var(--border-color); border-left: 2px solid var(--border-color); position: relative; padding: 20px 10px 0 45px; box-sizing: border-box; font-family: 'Outfit', sans-serif;">
            <div class="y-axis" style="position: absolute; left: 0; top: 0; bottom: 30px; width: 35px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; font-size: 0.72rem; color: var(--text-muted); padding-right: 6px; box-sizing: border-box;">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>
            
            <div class="grid-lines" style="position: absolute; left: 35px; right: 0; top: 0; bottom: 30px; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; z-index: 0;">
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px solid var(--border-color); width: 100%;"></div>
            </div>

            <div class="bars-container" style="display: flex; flex: 1; justify-content: ${justifyStyle}; align-items: flex-end; height: 100%; z-index: 1; padding-bottom: 30px; padding-left: ${paddingLeftStyle}; box-sizing: border-box; gap: ${gapStyle};">
                ${barsHTML}
            </div>
        </div>
        <div style="height: 25px; width: 100%;"></div>
    `;
}

function getRehearsalSubtypeText(sub) {
    if (sub === "trompetas1") return "Trompetas 1ª";
    if (sub === "bajos") return "Bajos";
    if (sub === "trompetas2y3") return "Trompetas 2ª y 3ª";
    if (sub === "cornetas") return "Cornetas";
    if (sub === "percusion") return "Percusión";
    if (sub === "primeras") return "Primeras";
    if (sub === "voces") return "Voces";
    return "General";
}

function isMusicianConvocated(musicianId, sessionInfo) {
    if (!sessionInfo) return false;
    const musician = state.musicians.find(m => m.id === musicianId);
    if (!musician) return false;

    // Check if it is a section rehearsal
    const isSpecialRehearsal = sessionInfo.subtype && sessionInfo.subtype !== "general" && sessionInfo.convocatedVoices && sessionInfo.convocatedVoices.length > 0;
    if (isSpecialRehearsal) {
        return sessionInfo.convocatedVoices.includes(musician.instrument);
    }
    // General rehearsal or events are convocated for everyone
    return true;
}

function sendBrowserNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
        try {
            new Notification(title, {
                body: body,
                icon: "assets/logo.png"
            });
        } catch (e) {
            console.error("Error showing browser notification:", e);
        }
    }
}

function registerDeviceToken(musicianId) {
    if (!isCloudActive()) return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    
    try {
        const vapidKey = localStorage.getItem("yacente_vapid_key");
        if (!vapidKey) {
            console.warn("[FCM] VAPID Key no configurada. Omitiendo registro de dispositivo.");
            return;
        }
        
        const messaging = firebase.messaging();
        messaging.getToken({ vapidKey: vapidKey })
            .then((currentToken) => {
                if (currentToken) {
                    const db = firebase.firestore();
                    db.collection("musicianTokens").doc(musicianId).set({
                        tokens: firebase.firestore.FieldValue.arrayUnion(currentToken),
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true })
                    .then(() => console.log("[FCM] Token registrado correctamente en Firestore"))
                    .catch(err => console.error("[FCM] Error al guardar token en base de datos:", err));
                } else {
                    console.warn("[FCM] No se pudo obtener el token del navegador.");
                }
            })
            .catch((err) => {
                console.error("[FCM] Error al solicitar el token FCM:", err);
            });
    } catch (e) {
        console.error("[FCM] Mensajería no soportada o error de inicialización:", e);
    }
}

function sendPushNotificationToConvocated(sessionData, sessionDate) {
    if (!isCloudActive()) return;
    
    const serverKey = localStorage.getItem("yacente_fcm_server_key");
    if (!serverKey) {
        console.warn("[FCM] No se ha configurado la clave de servidor FCM, omitiendo envío de notificaciones push.");
        return;
    }
    
    const db = firebase.firestore();
    const formattedDate = formatDateShortSpanish(sessionDate);
    
    // 1. Obtener todos los músicos
    db.collection("musicians").get()
        .then((querySnapshot) => {
            const convocatedMusicians = [];
            querySnapshot.forEach((doc) => {
                const mus = doc.data();
                // Convocatoria
                if (isMusicianConvocated(mus.id, sessionData)) {
                    convocatedMusicians.push(mus.id);
                }
            });
            
            if (convocatedMusicians.length === 0) {
                console.log("[FCM] No hay músicos convocados para esta sesión.");
                return;
            }
            
            console.log(`[FCM] Se enviará notificación push a ${convocatedMusicians.length} músicos.`);
            
            // 2. Obtener tokens de dispositivo para los músicos convocados
            const tokenPromises = convocatedMusicians.map(mId => 
                db.collection("musicianTokens").doc(mId).get()
                    .then(doc => doc.exists ? (doc.data().tokens || []) : [])
                    .catch(err => {
                        console.error(`[FCM] Error leyendo tokens del músico ${mId}:`, err);
                        return [];
                    })
            );
            
            Promise.all(tokenPromises)
                .then((results) => {
                    // Planarizar y eliminar duplicados/vacíos
                    const allTokens = [...new Set(results.flat().filter(Boolean))];
                    if (allTokens.length === 0) {
                        console.log("[FCM] No hay tokens de dispositivos registrados para los músicos convocados.");
                        return;
                    }
                    
                    console.log(`[FCM] Enviando push a ${allTokens.length} dispositivos.`);
                    
                    // 3. Preparar payload
                    const title = sessionData.type === "actuacion" ? "Nueva Actuación Creada" : "Nuevo Ensayo Creado";
                    let body = "";
                    if (sessionData.type === "ensayo") {
                        const subtypeText = getRehearsalSubtypeText(sessionData.subtype);
                        const locationVal = sessionData.location || "Parking";
                        body = `${subtypeText} - ${formattedDate} (${locationVal})`;
                    } else {
                        body = `${sessionData.name || "Actuación"} - ${formattedDate}`;
                    }
                    
                    // 4. Enviar mediante la API legacy de FCM (lotes de 500 max)
                    const chunkSize = 500;
                    for (let i = 0; i < allTokens.length; i += chunkSize) {
                        const chunk = allTokens.slice(i, i + chunkSize);
                        
                        fetch("https://fcm.googleapis.com/fcm/send", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "key=" + serverKey
                            },
                            body: JSON.stringify({
                                registration_ids: chunk,
                                notification: {
                                    title: title,
                                    body: body,
                                    icon: "https://yacente.pages.dev/icons/icon-192-rounded.png",
                                    badge: "https://yacente.pages.dev/icons/icon-192-rounded.png",
                                    click_action: "https://yacente.pages.dev/"
                                }
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log("[FCM] Lote de notificaciones push enviado con éxito:", data);
                        })
                        .catch(err => {
                            console.error("[FCM] Error en la petición HTTP POST de FCM:", err);
                        });
                    }
                });
        })
        .catch(err => console.error("[FCM] Error obteniendo lista de músicos para notificaciones push:", err));
}

function updateNotificationsBadge() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
    const unseenCount = notifs.filter(n => !n.seen).length;
    
    const badge = document.getElementById("comp-notifications-badge-count");
    if (badge) {
        if (unseenCount > 0) {
            badge.innerText = unseenCount;
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    }
}

function renderComponentNotificationsList() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
    const container = document.getElementById("comp-notif-list-container");
    const countLabel = document.getElementById("comp-notif-count-label");
    
    if (!container) return;
    container.innerHTML = "";

    if (notifs.length === 0) {
        if (countLabel) countLabel.innerText = "No tienes notificaciones.";
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 10px;" class="text-muted">
                <span style="font-size: 2rem; display: block; margin-bottom: 10px;">📭</span>
                No hay notificaciones históricas.
            </div>
        `;
        return;
    }

    const unseenCount = notifs.filter(n => !n.seen).length;
    if (countLabel) {
        countLabel.innerText = unseenCount > 0 
            ? `Tienes ${unseenCount} notificación${unseenCount !== 1 ? 'es' : ''} sin leer.`
            : "No tienes notificaciones pendientes.";
    }

    notifs.forEach(notif => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `card-item ${notif.seen ? '' : 'unseen-item'}`;
        itemDiv.style.cssText = `
            padding: 14px;
            border-radius: 8px;
            background: ${notif.seen ? 'rgba(255,255,255,0.02)' : 'rgba(212, 175, 55, 0.05)'};
            border: 1px solid ${notif.seen ? 'var(--border-color)' : 'rgba(212, 175, 55, 0.35)'};
            display: flex;
            flex-direction: column;
            gap: 4px;
            transition: all 0.2s;
            position: relative;
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
        `;

        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; pointer-events: none;">
                <h4 style="margin: 0; font-size: 0.9rem; font-weight: 700; color: ${notif.seen ? 'var(--text-primary)' : 'var(--color-gold)'};">${notif.title}</h4>
                <span style="font-size: 0.72rem; color: var(--text-muted);">${new Date(notif.date).toLocaleDateString('es-ES', {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-color); pointer-events: none;">${notif.body}</p>
        `;

        // Swipe-to-delete gestures
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let hasMoved = false;

        const handleStart = (clientX) => {
            startX = clientX;
            isDragging = true;
            hasMoved = false;
            itemDiv.style.transition = 'none';
        };

        const handleMove = (clientX) => {
            if (!isDragging) return;
            const deltaX = clientX - startX;
            currentX = deltaX;
            if (Math.abs(deltaX) > 8) {
                hasMoved = true;
            }
            itemDiv.style.transform = `translateX(${deltaX}px)`;
            itemDiv.style.opacity = Math.max(0.1, 1 - Math.abs(deltaX) / (itemDiv.offsetWidth * 0.8));
        };

        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            itemDiv.style.transition = 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
            
            const threshold = itemDiv.offsetWidth * 0.35;
            if (Math.abs(currentX) > threshold) {
                const direction = currentX > 0 ? 1 : -1;
                itemDiv.style.transform = `translateX(${direction * 125}%)`;
                itemDiv.style.opacity = '0';
                
                setTimeout(() => {
                    itemDiv.style.maxHeight = itemDiv.offsetHeight + 'px';
                    itemDiv.style.transition = 'all 0.3s ease';
                    itemDiv.offsetHeight; // Reflow
                    itemDiv.style.maxHeight = '0';
                    itemDiv.style.padding = '0';
                    itemDiv.style.margin = '0';
                    itemDiv.style.border = 'none';
                    
                    setTimeout(() => {
                        const index = notifs.findIndex(n => n.id === notif.id);
                        if (index !== -1) {
                            notifs.splice(index, 1);
                            localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));
                            renderComponentNotificationsList();
                            updateNotificationsBadge();
                            showToast("Notificación eliminada", "info");
                        }
                    }, 300);
                }, 150);
            } else {
                itemDiv.style.transform = 'translateX(0)';
                itemDiv.style.opacity = '1';
            }
        };

        itemDiv.addEventListener("touchstart", (e) => {
            handleStart(e.touches[0].clientX);
        }, { passive: true });
        
        itemDiv.addEventListener("touchmove", (e) => {
            if (isDragging) {
                if (e.cancelable) e.preventDefault();
                handleMove(e.touches[0].clientX);
            }
        }, { passive: false });
        
        itemDiv.addEventListener("touchend", handleEnd);
        itemDiv.addEventListener("touchcancel", handleEnd);

        itemDiv.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Prevent text selection and drag start
            handleStart(e.clientX);
            const onMouseMove = (moveEvent) => handleMove(moveEvent.clientX);
            const onMouseUp = () => {
                handleEnd();
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // Click handler handles both mark-as-read and filters drag
        itemDiv.addEventListener("click", (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if (!notif.seen) {
                notif.seen = true;
                localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));
                renderComponentNotificationsList();
                updateNotificationsBadge();
            }
        });

        if (!notif.seen) {
            itemDiv.style.cursor = "pointer";
            itemDiv.title = "Hacer clic para marcar como leída o deslizar para eliminar";
        } else {
            itemDiv.style.cursor = "grab";
            itemDiv.title = "Deslizar para eliminar";
        }

        container.appendChild(itemDiv);
    });
}



