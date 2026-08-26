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
    actuacionRepertoire: {},
    marchaSeasonRemovals: {},
    notificationsClearedAt: null,
    marchasViewMode: "list",
    calendarGoals: {},
    weeklyGoals: {},
    formacionConcierto: [],
    formacionDesfile: [],
    directorConcierto: null,
    repertoireLinks: { youtube: "", spotify: "" },
    suggestions: [],
    rehearsalLocations: [],
    currentPreavisoDate: "",
    compCalendarYear: undefined,
    compCalendarMonth: undefined,
    statsOvMode: "years",
    statsOvSelectedSeason: (() => {
        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth() + 1;
        return m >= 9 ? `${y}-${y+1}` : `${y-1}-${y}`;
    })(),
    statsHeatmapSelectedSeason: null
};

let preavisoSelectedStatus = null;

// ==========================================================================
// HELPERS DE TEMPORADA (Septiembre de un año -> Agosto del siguiente)
// ==========================================================================
function getSeasonLabelForDate(dateStr) {
    const parts = (dateStr || "").split("-");
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (isNaN(y) || isNaN(m)) return null;
    return m >= 9 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

function getCurrentSeasonLabel() {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    return getSeasonLabelForDate(todayStr);
}

function getSeasonBounds(seasonLabel) {
    const parts = (seasonLabel || "").split("-");
    const year1 = parseInt(parts[0], 10);
    const year2 = parseInt(parts[1], 10);
    return { year1, year2 };
}

function isDateInSeason(dateStr, seasonLabel) {
    if (!seasonLabel || seasonLabel === "all") return true;
    const { year1, year2 } = getSeasonBounds(seasonLabel);
    if (isNaN(year1) || isNaN(year2)) return true;
    const parts = (dateStr || "").split("-");
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    return (y === year1 && m >= 9) || (y === year2 && m < 9);
}

function getSeasonMonthsArray(seasonLabel) {
    const { year1, year2 } = getSeasonBounds(seasonLabel);
    return [
        { label: "Sep", monthNum: 9, year: String(year1) },
        { label: "Oct", monthNum: 10, year: String(year1) },
        { label: "Nov", monthNum: 11, year: String(year1) },
        { label: "Dic", monthNum: 12, year: String(year1) },
        { label: "Ene", monthNum: 1, year: String(year2) },
        { label: "Feb", monthNum: 2, year: String(year2) },
        { label: "Mar", monthNum: 3, year: String(year2) },
        { label: "Abr", monthNum: 4, year: String(year2) },
        { label: "May", monthNum: 5, year: String(year2) },
        { label: "Jun", monthNum: 6, year: String(year2) },
        { label: "Jul", monthNum: 7, year: String(year2) },
        { label: "Ago", monthNum: 8, year: String(year2) }
    ];
}

// Devuelve las etiquetas de temporada ("YYYY-YYYY") presentes en un conjunto de fechas, más recientes primero.
// Incluye siempre la temporada actual para que el selector nunca aparezca vacío.
function getAvailableSeasons(dateKeys) {
    const seasons = new Set();
    (dateKeys || []).forEach(dateKey => {
        const rawDate = (dateKey || "").split("_")[0];
        const label = getSeasonLabelForDate(rawDate);
        if (label) seasons.add(label);
    });
    seasons.add(getCurrentSeasonLabel());
    return Array.from(seasons).sort().reverse();
}

// Rellena un <select> con las temporadas disponibles. Si allowAll es true añade una opción "Todas las temporadas".
function populateSeasonSelect(selectEl, dateKeys, allowAll, selectedValue) {
    if (!selectEl) return;
    const seasons = getAvailableSeasons(dateKeys);
    let optionsHtml = allowAll ? `<option value="all">Todas</option>` : "";
    optionsHtml += seasons.map(s => `<option value="${s}">${s}</option>`).join("");
    if (selectEl.innerHTML !== optionsHtml) {
        selectEl.innerHTML = optionsHtml;
    }
    const validValues = allowAll ? ["all", ...seasons] : seasons;
    if (selectedValue && validValues.includes(selectedValue)) {
        selectEl.value = selectedValue;
    } else {
        selectEl.value = allowAll ? "all" : (seasons.includes(getCurrentSeasonLabel()) ? getCurrentSeasonLabel() : seasons[0]);
    }
}

// Temporadas para la página de Repertorio: incluye todas las temporadas con ensayos/actuaciones
// programados (pasados o futuros), la temporada actual, y siempre una temporada más allá de la
// última que tenga algo programado (para poder preparar el repertorio de la próxima temporada).
function getRepertoireSeasonOptions() {
    const seasons = new Set();
    Object.keys(state.sessionTypes || {}).forEach(dateKey => {
        const rawDate = (dateKey || "").split("_")[0];
        const label = getSeasonLabelForDate(rawDate);
        if (label) seasons.add(label);
    });
    seasons.add(getCurrentSeasonLabel());

    const sorted = Array.from(seasons).sort();
    const lastSeason = sorted[sorted.length - 1];
    const { year1 } = getSeasonBounds(lastSeason);
    seasons.add(`${year1 + 1}-${year1 + 2}`);

    return Array.from(seasons).sort().reverse();
}

// Rellena el selector de temporada de la página de Repertorio. Nunca incluye "Todas": siempre
// debe haber una temporada concreta seleccionada.
function populateRepertoireSeasonSelect(selectEl, selectedValue) {
    if (!selectEl) return;
    const seasons = getRepertoireSeasonOptions();
    const optionsHtml = seasons.map(s => `<option value="${s}">${s}</option>`).join("");
    if (selectEl.innerHTML !== optionsHtml) {
        selectEl.innerHTML = optionsHtml;
    }
    if (selectedValue && seasons.includes(selectedValue)) {
        selectEl.value = selectedValue;
    } else {
        selectEl.value = seasons.includes(getCurrentSeasonLabel()) ? getCurrentSeasonLabel() : seasons[0];
    }
}

// Una marcha pertenece a una temporada si no fue creada en exclusiva para otra temporada distinta,
// y no ha sido retirada específicamente de esta temporada.
function isMarchaInSeason(marcha, season) {
    if (!marcha) return false;
    if (marcha.addedInSeason && marcha.addedInSeason !== season) return false;
    const removed = (state.marchaSeasonRemovals && state.marchaSeasonRemovals[season]) || [];
    return !removed.includes(marcha.id);
}

function getMarchasForSeason(season) {
    return (state.marchas || []).filter(m => isMarchaInSeason(m, season));
}

// Retira una marcha del repertorio de una temporada concreta sin afectar a las demás temporadas
// ni borrar la marcha ni su historial de ensayos/actuaciones.
function removeMarchaFromSeason(marchaId, season) {
    if (!state.marchaSeasonRemovals) state.marchaSeasonRemovals = {};
    if (!state.marchaSeasonRemovals[season]) state.marchaSeasonRemovals[season] = [];
    if (!state.marchaSeasonRemovals[season].includes(marchaId)) {
        state.marchaSeasonRemovals[season].push(marchaId);
    }
    dbSaveMarchaSeasonRemovals(state.marchaSeasonRemovals);
}

const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * 21; // ~131.95

function getAuthToken() {
    return sessionStorage.getItem("yacente_authenticated") === "true" || localStorage.getItem("yacente_authenticated") === "true";
}
function getAuthRole() {
    return sessionStorage.getItem("yacente_role") || localStorage.getItem("yacente_role") || null;
}
function getAuthMusicianId() {
    return sessionStorage.getItem("yacente_musician_id") || localStorage.getItem("yacente_musician_id");
}

// Un músico solo puede acceder a su versión de la app si la dirección le ha rellenado el
// "Nombre Completo" en Plantilla. Se usa tanto al iniciar sesión como al restaurar una sesión
// guardada en el dispositivo.
function isAuthenticatedMusicianAllowed() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return false;
    const musician = (state.musicians || []).find(m => String(m.id) === String(musicianId));
    return !!(musician && musician.fullName && musician.fullName.trim());
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

    const storedActuacionRepertoire = localStorage.getItem("harmonia_actuacion_repertoire");
    state.actuacionRepertoire = storedActuacionRepertoire ? JSON.parse(storedActuacionRepertoire) : {};

    const storedSuggestions = localStorage.getItem("harmonia_suggestions");
    state.suggestions = storedSuggestions ? JSON.parse(storedSuggestions) : [];

    const storedRepertoireLinks = localStorage.getItem("harmonia_repertoire_links");
    state.repertoireLinks = storedRepertoireLinks ? JSON.parse(storedRepertoireLinks) : { youtube: "", spotify: "" };

    const storedMarchaSeasonRemovals = localStorage.getItem("harmonia_marcha_season_removals");
    state.marchaSeasonRemovals = storedMarchaSeasonRemovals ? JSON.parse(storedMarchaSeasonRemovals) : {};

    state.notificationsClearedAt = localStorage.getItem("harmonia_notifications_cleared_at") || null;

    const storedRehearsalLocations = localStorage.getItem("harmonia_rehearsal_locations");
    if (storedRehearsalLocations) {
        try {
            state.rehearsalLocations = JSON.parse(storedRehearsalLocations);
        } catch(e) {
            state.rehearsalLocations = null;
        }
    }
    if (!state.rehearsalLocations || !Array.isArray(state.rehearsalLocations) || state.rehearsalLocations.length === 0) {
        state.rehearsalLocations = [
            { id: "loc_parking", name: "Parking", address: "Parking de la Sede" },
            { id: "loc_arrabal", name: "Arrabal", address: "Arrabal" },
            { id: "loc_sanblas", name: "San Blas", address: "San Blas" }
        ];
    }

    // Cargar formaciones del simulador
    const storedConcierto = localStorage.getItem("yacente_formacion_concierto");
    const storedDesfile = localStorage.getItem("yacente_formacion_desfile");
    state.formacionConcierto = parseConciertoFormacion(storedConcierto);
    state.formacionDesfile = parseDesfileFormacion(storedDesfile);
    state.directorConcierto = localStorage.getItem("yacente_director_concierto") || null;

    // Cargar credenciales de Firebase y Bloqueo de Pasado
    const storedFbConfig = localStorage.getItem("yacente_firebase_config");
    const storedFbHash = localStorage.getItem("yacente_firebase_hash");
    state.firebaseConfig = storedFbConfig ? JSON.parse(storedFbConfig) : null;
    state.firebasePasswordHash = storedFbHash || "";
    state.pastLockEnabled = localStorage.getItem("yacente_past_lock_enabled") === "true";

    // Intento de auto-recuperación de la configuración de la nube desde la caché si localStorage fue limpiado por el navegador
    if (!state.firebaseConfig && window.caches) {
        caches.open('fcm-config').then(cache => cache.match('/config.json'))
            .then(res => res ? res.json() : null)
            .then(async configObj => {
                if (configObj && configObj.apiKey && configObj.projectId) {
                    state.firebaseConfig = configObj;
                    localStorage.setItem("yacente_firebase_config", JSON.stringify(configObj));
                    console.log("Configuración de Firebase auto-recuperada desde caché");
                    await initFirebase();
                }
            }).catch(e => console.error("Error al auto-recuperar config Firebase:", e));
    }

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

    // Inicializar asistencia solo para dirección: este stub local rellena "Pasar Lista" con la
    // plantilla al vuelo para que la dirección pueda pasar lista de hoy sin crear antes un
    // ensayo formal. Para músicos no sirve para nada, y si su dispositivo pierde la conexión a
    // la nube, este stub vacío de "hoy" queda huérfano en su caché local y termina apareciendo
    // como un "Ensayo" fantasma en su pantalla de Eventos. Ver también renderComponentEventos().
    if (getAuthRole() !== "component") {
        initializeAttendanceForDate(today);
    }

    // Renderizar interfaz inicial
    const isAuthenticated = getAuthToken();
    const activeRole = getAuthRole();
    if (isAuthenticated && activeRole === "component" && !isCloudActive() && !isAuthenticatedMusicianAllowed()) {
        // Solo expulsamos inmediatamente en modo local estricto si falta el nombre completo.
        // Si hay nube activa, se mantiene la sesión abierta y startCloudSync() validará al descargar los datos reales de Firestore.
        sessionStorage.removeItem("yacente_authenticated");
        sessionStorage.removeItem("yacente_role");
        sessionStorage.removeItem("yacente_musician_id");
        localStorage.removeItem("yacente_authenticated");
        localStorage.removeItem("yacente_role");
        localStorage.removeItem("yacente_musician_id");
        setTimeout(() => {
            showLockScreen();
            const errorMsg = document.getElementById("lock-error-msg");
            if (errorMsg) {
                errorMsg.classList.remove("hidden");
                errorMsg.innerText = "Facilita los datos solicitados a la dirección para poder acceder a tu cuenta";
            }
        }, 0);
    } else if (isAuthenticated) {
        hideLockScreen();
        if (activeRole === "component") {
            document.body.classList.add("component-portal");
            const mobNav = document.getElementById("component-mobile-nav");
            if (mobNav) mobNav.classList.remove("hidden");
            renderActiveSection("section-componente-ficha");
        } else {
            document.body.classList.remove("component-portal");
            renderActiveSection("section-pasar-lista");
        }
    } else {
        showLockScreen();
    }
    // Si cualquiera de estos renders falla (p.ej. un dato inesperado en una sesión), no debe
    // impedir que se conecte la nube más abajo: eso dejaría la app entera inutilizable.
    try {
        populateLoginMusicians();
        renderAttendance();
        renderPlantillaTable();
        renderEnsayosList();
        renderActuacionesList();
        renderStatistics();
        renderMarchasList();
        renderRehearsalMarchasWidget();
        updateSuggestionsBadge();
        renderRepertoireLinksUI();
    } catch (err) {
        console.error("Error al renderizar la interfaz inicial:", err);
    }

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
    select.classList.add("hidden");
    select.style.display = "none";
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
    localStorage.setItem("harmonia_actuacion_repertoire", JSON.stringify(state.actuacionRepertoire || {}));
    localStorage.setItem("harmonia_marcha_season_removals", JSON.stringify(state.marchaSeasonRemovals || {}));
    if (state.notificationsClearedAt) {
        localStorage.setItem("harmonia_notifications_cleared_at", state.notificationsClearedAt);
    } else {
        localStorage.removeItem("harmonia_notifications_cleared_at");
    }
    localStorage.setItem("harmonia_calendar_goals", JSON.stringify(state.calendarGoals || {}));
    localStorage.setItem("harmonia_weekly_goals", JSON.stringify(state.weeklyGoals || {}));
    localStorage.setItem("harmonia_suggestions", JSON.stringify(state.suggestions || []));
    localStorage.setItem("harmonia_repertoire_links", JSON.stringify(state.repertoireLinks || { youtube: "", spotify: "" }));
    localStorage.setItem("harmonia_rehearsal_locations", JSON.stringify(state.rehearsalLocations || []));

    if (state.firebaseConfig) {
        localStorage.setItem("yacente_firebase_config", JSON.stringify(state.firebaseConfig));
        localStorage.setItem("yacente_firebase_hash", state.firebasePasswordHash);
    } else {
        localStorage.removeItem("yacente_firebase_config");
        localStorage.removeItem("yacente_firebase_hash");
    }
}

// Hash débil antiguo (solo se mantiene para poder migrar contraseñas ya guardadas con este esquema)
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Hash criptográfico real (SHA-256) para la contraseña de directiva
async function hashPassword(str) {
    const data = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Verifica una contraseña frente al hash guardado. Soporta hashes antiguos (hashString):
// si coincide con el esquema antiguo, se acepta y se devuelve el nuevo hash SHA-256
// para que el llamador lo guarde, migrando la cuenta de forma transparente.
async function verifyPassword(enteredPassword, storedHash) {
    if (!storedHash) return { valid: false, upgradedHash: null };
    const newHash = await hashPassword(enteredPassword);
    if (newHash === storedHash) return { valid: true, upgradedHash: null };
    if (hashString(enteredPassword) === storedHash) return { valid: true, upgradedHash: newHash };
    return { valid: false, upgradedHash: null };
}

// Comprobación de estado de la nube
function isCloudActive() {
    return state.firebaseConfig !== null;
}

// Bloqueo de Pasado (Inamovible)
const PAST_LOCK_MASTER_PASS = "arquero7777";

function isPastLockBlocked(dateStr) {
    if (!state.pastLockEnabled) return false;
    const targetDate = dateStr || state.currentDate;
    if (!targetDate) return false;
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;
    return targetDate < todayStr;
}

function isSessionConcluded(dateKey, sessionInfo = null) {
    if (!dateKey) return false;
    const rawDate = dateKey.split("_")[0];
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    if (rawDate < todayStr) return true; // Fechas anteriores a hoy ya han concluido
    if (rawDate > todayStr) return false; // Fechas futuras no han concluido

    // Es el día de hoy: comprobar si la hora de fin ha transcurrido
    const session = sessionInfo || (state && state.sessionTypes ? state.sessionTypes[dateKey] : null);
    if (!session || !session.time) return false; // Sin hora -> contabiliza desde el día siguiente

    const timeStr = String(session.time).trim();
    if (!timeStr.includes("-")) return false; // Sin hora fin especificada -> contabiliza desde el día siguiente

    const parts = timeStr.split("-");
    const endTimePart = parts[1] ? parts[1].trim() : "";
    if (!endTimePart) return false;

    const timeParts = endTimePart.split(":");
    if (timeParts.length < 2) return false;

    let endH = parseInt(timeParts[0], 10);
    const endM = parseInt(timeParts[1], 10) || 0;

    if (isNaN(endH)) return false;
    if (endH === 0 || endH === 24) {
        endH = 24; // 24:00 al final de la jornada
    }

    const currentTotalMin = dNow.getHours() * 60 + dNow.getMinutes();
    const endTotalMin = endH * 60 + endM;

    return currentTotalMin >= endTotalMin;
}

let unsubMusicians = null;
let unsubAttendance = null;
let unsubSessionTypes = null;
let unsubMarchas = null;
let unsubPlayedMarchas = null;
let unsubActuacionRepertoire = null;
let unsubWeeklyGoals = null;
let unsubMusicianMarchaStatuses = null;
let unsubFormacionConcierto = null;
let unsubFormacionDesfile = null;
let unsubAnnouncements = null;
let unsubDeletedNotifs = null;
let unsubSuggestions = null;
let unsubRepertoireLinks = null;
let unsubRehearsalLocations = null;
let unsubMarchaSeasonRemovals = null;
let unsubNotificationsClearedAt = null;

function getDeletedNotificationIds(musicianId) {
    if (!musicianId) return [];
    try {
        return JSON.parse(localStorage.getItem("yacente_deleted_notifications_" + musicianId) || "[]");
    } catch (e) {
        return [];
    }
}

function saveDeletedNotificationId(musicianId, notifId) {
    if (!musicianId || !notifId) return;
    const deletedKey = "yacente_deleted_notifications_" + musicianId;
    const deleted = getDeletedNotificationIds(musicianId);
    if (!deleted.includes(notifId)) {
        deleted.push(notifId);
        localStorage.setItem(deletedKey, JSON.stringify(deleted));
    }
    if (isCloudActive()) {
        try {
            const db = firebase.firestore();
            db.collection("musician_deleted_notifs").doc(musicianId).set({
                deletedIds: firebase.firestore.FieldValue.arrayUnion(notifId)
            }, { merge: true }).catch(err => console.error("Error al guardar notificación eliminada en Firestore:", err));
        } catch (e) {
            console.error("Error al guardar en Firestore:", e);
        }
    }
}


// Inicializa Firebase
// Garantiza una sesión anónima de Firebase Auth antes de tocar Firestore.
// Necesario para que las reglas de seguridad puedan exigir request.auth != null
// (sin esto, cualquiera con el apiKey podría acceder a Firestore sin pasar por la app).
async function ensureFirebaseAuth() {
    if (firebase.auth().currentUser) return;
    try {
        await firebase.auth().signInAnonymously();
    } catch (err) {
        console.error("Error al autenticar de forma anónima con Firebase:", err);
    }
}

async function initFirebase() {
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

        await ensureFirebaseAuth();

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
    const mobNav = document.getElementById("component-mobile-nav");
    if (mobNav) mobNav.classList.add("hidden");
}

// Oculta la pantalla de bloqueo
function hideLockScreen() {
    const lock = document.getElementById("lock-screen");
    if (lock) lock.classList.add("hidden");
    const activeRole = getAuthRole();
    const mobNav = document.getElementById("component-mobile-nav");
    if (activeRole === "component") {
        document.body.classList.add("component-portal");
        if (mobNav) mobNav.classList.remove("hidden");
    } else {
        document.body.classList.remove("component-portal");
        if (mobNav) mobNav.classList.add("hidden");
    }
}

// Escucha en tiempo real de Firestore
function startCloudSync() {
    if (!isCloudActive()) return;
    const db = firebase.firestore();
    
    // Detener escuchas previas si existen
    stopCloudSync();
    

    
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
            invalidateMusicianStatsCache();
            renderPlantillaTable();
            populateLoginMusicians();

            // Validar acceso del músico autenticado tras sincronizar la plantilla desde Firestore
            const activeRole = getAuthRole();
            if (activeRole === "component" && !isAuthenticatedMusicianAllowed()) {
                sessionStorage.removeItem("yacente_authenticated");
                sessionStorage.removeItem("yacente_role");
                sessionStorage.removeItem("yacente_musician_id");
                localStorage.removeItem("yacente_authenticated");
                localStorage.removeItem("yacente_role");
                localStorage.removeItem("yacente_musician_id");
                showLockScreen();
                const errorMsg = document.getElementById("lock-error-msg");
                if (errorMsg) {
                    errorMsg.classList.remove("hidden");
                    errorMsg.innerText = "Facilita los datos solicitados a la dirección para poder acceder a tu cuenta";
                }
                showToast("Acceso restringido: consulta con la dirección de la banda", "warning");
                return;
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
        invalidateMusicianStatsCache();
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
    // NOTA: isInitialSessionTypesLoad se basa en un flag PERSISTIDO (no en una variable en memoria),
    // porque este listener se vuelve a crear cada vez que se recarga la app o se reconecta la nube
    // (p.ej. al cerrar y reabrir la app en el móvil). Si dependiera solo de una variable local, cada
    // reconexión trataría su primer snapshot como "carga inicial" y suprimiría en silencio la
    // notificación de cualquier sesión creada justo en ese momento, aunque fuera realmente nueva.
    // El flag se guarda por músico (no global) para que un dispositivo compartido entre varios
    // músicos no trate el historial completo de sesiones como "nuevo" al cambiar de usuario.
    const sessionSyncFlagKey = "yacente_session_sync_done_" + (getAuthMusicianId() || "admin");
    let isInitialSessionTypesLoad = localStorage.getItem(sessionSyncFlagKey) !== "true";
    unsubSessionTypes = db.collection("sessionTypes").onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        const previousSessionTypes = state.sessionTypes; // para comparar campos antes de sobrescribir

        state.sessionTypes = {}; // Limpiar caché local para evitar datos huérfanos/demo
        snapshot.forEach(doc => {
            state.sessionTypes[doc.id] = doc.data();
        });
        localStorage.setItem("harmonia_session_types", JSON.stringify(state.sessionTypes));
        invalidateMusicianStatsCache();

        // Dispatch notifications if this is not the initial load and role is component
        if (!isInitialSessionTypesLoad) {
            changes.forEach(change => {
                if (change.type === "added" || change.type === "modified") {
                    const sessionData = change.doc.data();
                    const sessionKey = change.doc.id;

                    if (change.type === "modified" && sessionData.type === "ensayo") {
                        // En la edición de un ensayo solo se avisa a los músicos si cambia el lugar,
                        // la hora o el día (este último ya se detecta como "added" al cambiar de
                        // clave). El responsable es información solo para la directiva y no debe
                        // generar aviso.
                        const oldData = previousSessionTypes ? previousSessionTypes[sessionKey] : null;
                        if (!oldData) return;
                        const locationChanged = (oldData.location || "") !== (sessionData.location || "");
                        const timeChanged = (oldData.time || "") !== (sessionData.time || "");
                        if (!locationChanged && !timeChanged) return;
                    }

                    dispatchSessionNotification(sessionKey, sessionData, false, change.type === "modified");
                } else if (change.type === "removed") {
                    // change.doc.data() en un "removed" devuelve el último estado conocido antes de
                    // borrarse, así que sirve tal cual para saber a quién avisar y qué decía el ensayo.
                    const sessionData = change.doc.data();
                    const sessionKey = change.doc.id;
                    if (sessionData && sessionData.type === "ensayo") {
                        dispatchSessionNotification(sessionKey, sessionData, false, false, true);
                    }
                }
            });
        }

        if (isInitialSessionTypesLoad) {
            localStorage.setItem(sessionSyncFlagKey, "true");
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
        invalidateMusicianStatsCache();
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

    // Escucha de repertorios ordenados de actuaciones
    unsubActuacionRepertoire = db.collection("actuacionRepertoire").onSnapshot(snapshot => {
        state.actuacionRepertoire = {};
        snapshot.forEach(doc => {
            state.actuacionRepertoire[doc.id] = doc.data().marchas || [];
        });
        localStorage.setItem("harmonia_actuacion_repertoire", JSON.stringify(state.actuacionRepertoire));
        if (document.getElementById("modal-actuacion-detail").classList.contains("active") && state.activeDetailDate) {
            renderActuacionDetailRepertoire(state.activeDetailDate);
        }
        if (document.getElementById("modal-actuacion-repertoire").classList.contains("active")) {
            renderActuacionRepertoireModal();
        }
    }, err => {
        console.error("Error sync repertorio de actuación:", err);
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
        invalidateMusicianStatsCache();
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

    // Escucha de enlaces de playlists del repertorio completo
    unsubRepertoireLinks = db.collection("config").doc("repertoire_links").onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            state.repertoireLinks = { youtube: data.youtube || "", spotify: data.spotify || "" };
            localStorage.setItem("harmonia_repertoire_links", JSON.stringify(state.repertoireLinks));
            renderRepertoireLinksUI();
        }
    }, err => {
        console.error("Error sync enlaces de repertorio:", err);
    });

    // Escucha de retiradas de marchas del repertorio por temporada
    unsubMarchaSeasonRemovals = db.collection("config").doc("marcha_season_removals").onSnapshot(doc => {
        state.marchaSeasonRemovals = doc.exists ? (doc.data() || {}) : {};
        localStorage.setItem("harmonia_marcha_season_removals", JSON.stringify(state.marchaSeasonRemovals));
        if (document.getElementById("section-marchas").classList.contains("active")) {
            renderMarchasList();
        }
    }, err => {
        console.error("Error sync retiradas de repertorio por temporada:", err);
    });

    // Escucha de la fecha de "vaciado" de notificaciones (botón de Ajustes): cualquier
    // notificación con fecha anterior o igual a esta marca se considera obsoleta y se filtra,
    // en cualquier dispositivo, sin necesidad de tocar el caché local de cada músico uno a uno.
    unsubNotificationsClearedAt = db.collection("config").doc("notifications_reset").onSnapshot(doc => {
        state.notificationsClearedAt = doc.exists && doc.data() ? (doc.data().clearedAt || null) : null;
        if (state.notificationsClearedAt) {
            localStorage.setItem("harmonia_notifications_cleared_at", state.notificationsClearedAt);
        } else {
            localStorage.removeItem("harmonia_notifications_cleared_at");
        }
        updateNotificationsBadge();
        if (document.body.classList.contains("component-portal")) {
            renderComponentNotificationsList();
        }
    }, err => {
        console.error("Error sync vaciado de notificaciones:", err);
    });

    // Escucha de comunicados de la directiva
    unsubAnnouncements = db.collection("announcements").orderBy("date", "desc").limit(30).onSnapshot(snapshot => {
        const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        snapshot.docChanges().forEach(change => {
            const data = change.doc.data();
            const docId = change.doc.id;

            // Purga automática: eliminar comunicados caducados (+7 días) de Firestore
            const notifTime = data.date ? new Date(data.date).getTime() : 0;
            if (notifTime && !isNaN(notifTime) && (now - notifTime > ONE_WEEK_MS)) {
                db.collection("announcements").doc(docId).delete().catch(err => console.error("Error al purgar comunicado caducado en Firestore:", err));
                return;
            }

            if (change.type === "added") {
                const musicianId = getAuthMusicianId();
                if (!musicianId) return;

                const targetId = data.id || docId;
                const deletedIds = getDeletedNotificationIds(musicianId);
                if (deletedIds.includes(targetId)) return;

                const musician = (state.musicians || []).find(m => m.id === musicianId);
                const instrument = musician ? musician.instrument : null;

                if (data.targetSection === "all" || (instrument && data.targetSection === instrument)) {
                    const key = "yacente_notifications_" + musicianId;
                    let notifs = JSON.parse(localStorage.getItem(key) || "[]");
                    notifs = purgeExpiredNotifications(notifs);

                    const exists = notifs.some(n => n.id === targetId);
                    if (!exists) {
                        const newItem = {
                            id: targetId,
                            title: data.title,
                            body: data.body,
                            date: data.date || new Date().toISOString(),
                            seen: false,
                            type: "announcement"
                        };
                        notifs.unshift(newItem);
                        localStorage.setItem(key, JSON.stringify(notifs));
                        updateNotificationsBadge();
                        if (document.body.classList.contains("component-portal")) {
                            sendBrowserNotification(data.title, data.body);
                            renderComponentNotificationsList();
                        }
                    }
                }
            }
        });
    }, err => {
        console.error("Error sync comunicados:", err);
    });

    // Escucha de notificaciones eliminadas por el músico
    const currentMusId = getAuthMusicianId();
    if (currentMusId) {
        unsubDeletedNotifs = db.collection("musician_deleted_notifs").doc(currentMusId).onSnapshot(doc => {
            if (doc.exists && doc.data() && doc.data().deletedIds) {
                const cloudDeletedIds = doc.data().deletedIds || [];
                const deletedKey = "yacente_deleted_notifications_" + currentMusId;
                const localDeletedIds = JSON.parse(localStorage.getItem(deletedKey) || "[]");
                const merged = Array.from(new Set([...localDeletedIds, ...cloudDeletedIds]));
                localStorage.setItem(deletedKey, JSON.stringify(merged));

                const notifKey = "yacente_notifications_" + currentMusId;
                const localNotifs = JSON.parse(localStorage.getItem(notifKey) || "[]");
                const filteredNotifs = localNotifs.filter(n => !merged.includes(n.id));
                if (filteredNotifs.length !== localNotifs.length) {
                    localStorage.setItem(notifKey, JSON.stringify(filteredNotifs));
                    updateNotificationsBadge();
                    const notifModal = document.getElementById("modal-component-notifications");
                    if (notifModal && notifModal.classList.contains("active")) {
                        renderComponentNotificationsList();
                    }
                }
            }
        }, err => console.error("Error sync deleted notifs:", err));
    }

    // Escucha del buzón de sugerencias (directiva)
    unsubSuggestions = db.collection("suggestions").orderBy("date", "desc").limit(200).onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
            list.push({ ...doc.data(), docId: doc.id });
        });
        state.suggestions = list;
        updateSuggestionsBadge();

        const suggestionsSection = document.getElementById("section-otros-sugerencias");
        if (suggestionsSection && suggestionsSection.classList.contains("active")) {
            renderAdminSuggestionsList();
        }

        const mySuggestionsSection = document.getElementById("section-componente-sugerencias");
        if (mySuggestionsSection && mySuggestionsSection.classList.contains("active")) {
            renderComponentSugerenciasPage();
            renderMySuggestionHistory();
        }
    }, err => {
        console.error("Error sync sugerencias:", err);
    });

    // Escucha de lugares de ensayo (sincronización en tiempo real para directores y músicos)
    unsubRehearsalLocations = db.collection("settings").doc("rehearsalLocations").onSnapshot(doc => {
        if (doc.exists && doc.data() && Array.isArray(doc.data().list)) {
            state.rehearsalLocations = doc.data().list;
            saveStateToLocalStorage();
            renderRehearsalLocationOptions();
            renderAdminLugaresEnsayoList();
        }
    }, err => {
        console.error("Error sync lugares de ensayo:", err);
    });
}

// Detiene escuchas en tiempo real
function stopCloudSync() {
    if (unsubMusicians) { unsubMusicians(); unsubMusicians = null; }
    if (unsubAttendance) { unsubAttendance(); unsubAttendance = null; }
    if (unsubSessionTypes) { unsubSessionTypes(); unsubSessionTypes = null; }
    if (unsubMarchas) { unsubMarchas(); unsubMarchas = null; }
    if (unsubPlayedMarchas) { unsubPlayedMarchas(); unsubPlayedMarchas = null; }
    if (unsubActuacionRepertoire) { unsubActuacionRepertoire(); unsubActuacionRepertoire = null; }
    if (unsubWeeklyGoals) { unsubWeeklyGoals(); unsubWeeklyGoals = null; }
    if (unsubMusicianMarchaStatuses) { unsubMusicianMarchaStatuses(); unsubMusicianMarchaStatuses = null; }
    if (unsubFormacionConcierto) { unsubFormacionConcierto(); unsubFormacionConcierto = null; }
    if (unsubFormacionDesfile) { unsubFormacionDesfile(); unsubFormacionDesfile = null; }
    if (unsubAnnouncements) { unsubAnnouncements(); unsubAnnouncements = null; }
    if (unsubDeletedNotifs) { unsubDeletedNotifs(); unsubDeletedNotifs = null; }
    if (unsubSuggestions) { unsubSuggestions(); unsubSuggestions = null; }
    if (unsubRepertoireLinks) { unsubRepertoireLinks(); unsubRepertoireLinks = null; }
    if (unsubRehearsalLocations) { unsubRehearsalLocations(); unsubRehearsalLocations = null; }
    if (unsubMarchaSeasonRemovals) { unsubMarchaSeasonRemovals(); unsubMarchaSeasonRemovals = null; }
    if (unsubNotificationsClearedAt) { unsubNotificationsClearedAt(); unsubNotificationsClearedAt = null; }
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

    // Subir repertorios ordenados de actuaciones
    Object.keys(state.actuacionRepertoire || {}).forEach(date => {
        const ref = db.collection("actuacionRepertoire").doc(date);
        batch.set(ref, { marchas: state.actuacionRepertoire[date] });
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

    // Subir retiradas de repertorio por temporada
    const refMarchaSeasonRemovals = db.collection("config").doc("marcha_season_removals");
    batch.set(refMarchaSeasonRemovals, state.marchaSeasonRemovals || {});

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
    const storedActuacionRepertoire = localStorage.getItem("harmonia_actuacion_repertoire");

    state.musicians = storedMusicians ? JSON.parse(storedMusicians) : [];
    state.attendance = storedAttendance ? JSON.parse(storedAttendance) : {};
    state.sessionTypes = storedSessionTypes ? JSON.parse(storedSessionTypes) : {};
    state.marchas = storedMarchas ? JSON.parse(storedMarchas) : [];
    state.playedMarchas = storedPlayedMarchas ? JSON.parse(storedPlayedMarchas) : {};
    state.actuacionRepertoire = storedActuacionRepertoire ? JSON.parse(storedActuacionRepertoire) : {};
    
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
    if (isPastLockBlocked(date)) return;
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
    if (isPastLockBlocked(date)) return;
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("sessionTypes").doc(date).set(sessionTypeObj)
            .catch(err => console.error("Error al guardar tipo de sesión en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

function dbDeleteSession(date) {
    if (isPastLockBlocked(date)) return;

    // Al borrar una sesión (o al renombrar su clave al cambiar fecha/tipo) hay que arrastrar
    // también sus marchas ensayadas/repertorio: si no, quedan huérfanas y siguen contando en
    // estadísticas / apareciendo en el historial de una marcha aunque el ensayo ya no exista.
    delete state.playedMarchas[date];
    delete state.actuacionRepertoire[date];

    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("attendance").doc(date).delete()
            .catch(err => console.error("Error al borrar asistencia de sesión en nube:", err));
        db.collection("sessionTypes").doc(date).delete()
            .catch(err => console.error("Error al borrar tipo de sesión en nube:", err));
        db.collection("playedMarchas").doc(date).delete()
            .catch(err => console.error("Error al borrar marchas ensayadas en nube:", err));
        db.collection("actuacionRepertoire").doc(date).delete()
            .catch(err => console.error("Error al borrar repertorio de actuación en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}

// Purga entradas de playedMarchas/actuacionRepertoire cuya sesión ya no existe en sessionTypes.
// Antes de que dbDeleteSession limpiara también estos dos campos, borrar un ensayo/actuación
// dejaba su registro de marchas huérfano (contando en estadísticas y en el historial de una
// marcha aunque el evento ya no existiera). Esto sanea datos ya huérfanos de esa época.
function cleanupOrphanedMarchasRecords() {
    // Si hay nube configurada pero firebase.initializeApp() todavía no se ha ejecutado (p.ej.
    // durante el arranque, initApp() renderiza antes de llamar a initFirebase()), no tocamos
    // nada esta pasada: borrar solo en local se revertiría en cuanto llegue el primer snapshot
    // de Firestore con los huérfanos todavía presentes. Se reintentará en el próximo render.
    if (isCloudActive() && !(typeof firebase !== "undefined" && firebase.apps && firebase.apps.length > 0)) {
        return false;
    }

    let changed = false;

    Object.keys(state.playedMarchas || {}).forEach(date => {
        if (!state.sessionTypes[date]) {
            delete state.playedMarchas[date];
            changed = true;
            if (isCloudActive()) {
                firebase.firestore().collection("playedMarchas").doc(date).delete()
                    .catch(err => console.error("Error al purgar marchas ensayadas huérfanas en nube:", err));
            }
        }
    });

    Object.keys(state.actuacionRepertoire || {}).forEach(date => {
        if (!state.sessionTypes[date]) {
            delete state.actuacionRepertoire[date];
            changed = true;
            if (isCloudActive()) {
                firebase.firestore().collection("actuacionRepertoire").doc(date).delete()
                    .catch(err => console.error("Error al purgar repertorio de actuación huérfano en nube:", err));
            }
        }
    });

    if (changed && !isCloudActive()) {
        saveStateToLocalStorage();
    }
    return changed;
}

function dbDeleteSuggestionByAdmin(suggestion) {
    if (suggestion.deletedByMusician) {
        return dbHardDeleteSuggestion(suggestion);
    }
    if (isCloudActive() && suggestion.docId) {
        const db = firebase.firestore();
        return db.collection("suggestions").doc(suggestion.docId).update({ deletedByAdmin: true })
            .then(() => {
                suggestion.deletedByAdmin = true;
            })
            .catch(err => {
                console.error("Error al marcar sugerencia como eliminada por admin en nube:", err);
                throw err;
            });
    } else {
        suggestion.deletedByAdmin = true;
        saveStateToLocalStorage();
        return Promise.resolve();
    }
}

function dbDeleteSuggestionByMusician(suggestion) {
    if (suggestion.deletedByDirector || suggestion.deletedByAdmin) {
        return dbHardDeleteSuggestion(suggestion);
    }
    if (isCloudActive() && suggestion.docId) {
        const db = firebase.firestore();
        return db.collection("suggestions").doc(suggestion.docId).update({ deletedByMusician: true })
            .then(() => {
                suggestion.deletedByMusician = true;
            })
            .catch(err => {
                console.error("Error al marcar sugerencia como eliminada por músico en nube:", err);
                throw err;
            });
    } else {
        suggestion.deletedByMusician = true;
        saveStateToLocalStorage();
        return Promise.resolve();
    }
}

function dbHardDeleteSuggestion(suggestion) {
    if (isCloudActive() && suggestion.docId) {
        const db = firebase.firestore();
        return db.collection("suggestions").doc(suggestion.docId).delete()
            .then(() => {
                state.suggestions = (state.suggestions || []).filter(s => s.id !== suggestion.id && s.docId !== suggestion.docId);
            })
            .catch(err => {
                console.error("Error al eliminar sugerencia en nube:", err);
                throw err;
            });
    } else {
        state.suggestions = (state.suggestions || []).filter(s => s.id !== suggestion.id);
        saveStateToLocalStorage();
        return Promise.resolve();
    }
}

function dbDeleteSuggestion(suggestion, role = "admin") {
    if (role === "musician") {
        return dbDeleteSuggestionByMusician(suggestion);
    }
    return dbDeleteSuggestionByAdmin(suggestion);
}

function dbMarkAllSuggestionsRead() {
    const unread = (state.suggestions || []).filter(s => !s.read && !s.deletedByAdmin);
    if (unread.length === 0) return Promise.resolve();

    if (isCloudActive()) {
        const db = firebase.firestore();
        const batch = db.batch();
        unread.forEach(s => {
            if (s.docId) batch.update(db.collection("suggestions").doc(s.docId), { read: true });
        });
        return batch.commit().catch(err => console.error("Error al marcar sugerencias como leídas:", err));
    } else {
        unread.forEach(s => { s.read = true; });
        saveStateToLocalStorage();
        return Promise.resolve();
    }
}

function updateSuggestionsBadge() {
    const unreadCount = (state.suggestions || []).filter(s => !s.read && !s.deletedByAdmin).length;
    document.querySelectorAll(".suggestions-unread-badge").forEach(badge => {
        if (unreadCount > 0) {
            badge.innerText = unreadCount > 99 ? "99+" : String(unreadCount);
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    });
}

function dbSaveSuggestion(suggestion) {
    if (suggestion && suggestion.authorId && suggestion.date) {
        localStorage.setItem("yacente_last_suggestion_date_" + suggestion.authorId, suggestion.date);
    }
    if (isCloudActive()) {
        const db = firebase.firestore();
        return db.collection("suggestions").add(suggestion)
            .catch(err => {
                console.error("Error al guardar sugerencia en nube:", err);
                throw err;
            });
    } else {
        state.suggestions = state.suggestions || [];
        state.suggestions.unshift(suggestion);
        saveStateToLocalStorage();
        return Promise.resolve();
    }
}

function dbSaveRepertoireLinks(links) {
    state.repertoireLinks = links;
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("config").doc("repertoire_links").set(links)
            .catch(err => console.error("Error al guardar enlaces de repertorio en nube:", err));
    }
    renderRepertoireLinksUI();
}

function dbSaveMarchaSeasonRemovals(removals) {
    state.marchaSeasonRemovals = removals;
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("config").doc("marcha_season_removals").set(removals)
            .catch(err => console.error("Error al guardar retiradas de repertorio por temporada en nube:", err));
    }
}

function dbSaveNotificationsClearedAt(clearedAt) {
    state.notificationsClearedAt = clearedAt;
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("config").doc("notifications_reset").set({ clearedAt })
            .catch(err => console.error("Error al guardar vaciado de notificaciones en nube:", err));
    }
}

// Vacía el buzón de notificaciones de TODOS los músicos: borra los comunicados guardados en la
// nube (para que ningún dispositivo nuevo los vuelva a recibir) y marca una fecha de corte que
// oculta cualquier notificación anterior (comunicados ya cacheados localmente y avisos de
// ensayos/actuaciones de prueba), sin afectar a asistencia, repertorio ni al resto de datos.
function clearAllMusicianNotifications() {
    const clearedAt = new Date().toISOString();
    dbSaveNotificationsClearedAt(clearedAt);
    updateNotificationsBadge();
    if (document.body.classList.contains("component-portal")) {
        renderComponentNotificationsList();
    }

    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("announcements").get()
            .then(snapshot => {
                if (snapshot.empty) return;
                const batch = db.batch();
                snapshot.forEach(doc => batch.delete(doc.ref));
                return batch.commit();
            })
            .then(() => showToast("Notificaciones vaciadas para todos los músicos", "success"))
            .catch(err => {
                console.error("Error al vaciar comunicados en nube:", err);
                showToast("Se vació la marca de corte, pero hubo un error borrando comunicados en la nube", "warning");
            });
    } else {
        showToast("Notificaciones vaciadas (modo local)", "success");
    }
}

function renderRepertoireLinksUI() {
    const links = state.repertoireLinks || { youtube: "", spotify: "" };
    const youtubeUrl = (links.youtube || "").trim();
    const spotifyUrl = (links.spotify || "").trim();

    // Vista de director (section-marchas)
    const adminYoutubeLink = document.getElementById("admin-repertoire-youtube-link");
    const adminYoutubeLabel = document.getElementById("admin-repertoire-youtube-label");
    const adminSpotifyLink = document.getElementById("admin-repertoire-spotify-link");
    const adminSpotifyLabel = document.getElementById("admin-repertoire-spotify-label");

    if (adminYoutubeLink && adminYoutubeLabel) {
        if (youtubeUrl) {
            adminYoutubeLink.href = youtubeUrl;
            adminYoutubeLabel.innerText = "Playlist YouTube (repertorio completo)";
            adminYoutubeLink.style.opacity = "1";
        } else {
            adminYoutubeLink.href = "#";
            adminYoutubeLabel.innerText = "Sin playlist de YouTube configurada";
            adminYoutubeLink.style.opacity = "0.6";
        }
    }
    if (adminSpotifyLink && adminSpotifyLabel) {
        if (spotifyUrl) {
            adminSpotifyLink.href = spotifyUrl;
            adminSpotifyLabel.innerText = "Playlist Spotify (repertorio completo)";
            adminSpotifyLink.style.opacity = "1";
        } else {
            adminSpotifyLink.href = "#";
            adminSpotifyLabel.innerText = "Sin playlist de Spotify configurada";
            adminSpotifyLink.style.opacity = "0.6";
        }
    }

    // Vista de músico (section-componente-repertorio)
    const compContainer = document.getElementById("repertoire-playlists-comp-container");
    const compYoutubeLink = document.getElementById("comp-repertoire-youtube-link");
    const compSpotifyLink = document.getElementById("comp-repertoire-spotify-link");

    if (compContainer && compYoutubeLink && compSpotifyLink) {
        if (youtubeUrl || spotifyUrl) {
            compContainer.classList.remove("hidden");
        } else {
            compContainer.classList.add("hidden");
        }

        if (youtubeUrl) {
            compYoutubeLink.href = youtubeUrl;
            compYoutubeLink.classList.remove("hidden");
        } else {
            compYoutubeLink.classList.add("hidden");
        }
        if (spotifyUrl) {
            compSpotifyLink.href = spotifyUrl;
            compSpotifyLink.classList.remove("hidden");
        } else {
            compSpotifyLink.classList.add("hidden");
        }
    }
}

function dbSaveMarcha(marcha) {
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("marchas").doc(marcha.id).set(marcha)
            .catch(err => console.error("Error al guardar marcha en nube:", err));
    }
}

function dbDeleteMarcha(id) {
    if (state.pastLockEnabled) {
        showToast("Bloqueo de pasado activado, no se pueden eliminar marchas del repertorio.", "warning");
        return;
    }
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("marchas").doc(id).delete()
            .catch(err => console.error("Error al borrar marcha en nube:", err));
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

function dbSaveActuacionRepertoire(date, marchaIdsArray) {
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("actuacionRepertoire").doc(date).set({ marchas: marchaIdsArray })
            .catch(err => console.error("Error al guardar repertorio de actuación en nube:", err));
    } else {
        saveStateToLocalStorage();
    }
}



// Helper to format start and end time hour/min dropdowns into a string "19:30 - 21:00" or single time
function getFormattedTimeFromInputs(startHourId, startMinId, endHourId, endMinId) {
    const startH = document.getElementById(startHourId) ? document.getElementById(startHourId).value : "";
    const startM = document.getElementById(startMinId) ? document.getElementById(startMinId).value : "00";
    const endH = document.getElementById(endHourId) ? document.getElementById(endHourId).value : "";
    const endM = document.getElementById(endMinId) ? document.getElementById(endMinId).value : "00";

    const startTime = startH ? `${startH}:${startM}` : "";
    const endTime = endH ? `${endH}:${endM}` : "";

    if (startTime && endTime) return `${startTime} - ${endTime}`;
    if (startTime) return startTime;
    if (endTime) return endTime;
    return "";
}

function setTimeInputsFromValue(startHourId, startMinId, endHourId, endMinId, timeVal) {
    const startH = document.getElementById(startHourId);
    const startM = document.getElementById(startMinId);
    const endH = document.getElementById(endHourId);
    const endM = document.getElementById(endMinId);
    if (!startH || !startM || !endH || !endM) return;

    const str = timeVal || "";
    const parseSingle = (s) => {
        if (!s) return { h: "", m: "00" };
        const parts = s.trim().split(":");
        if (parts.length < 2) return { h: "", m: "00" };
        let h = parts[0].padStart(2, "0");
        if (h === "00") h = "24";
        else if (parseInt(h, 10) < 8) h = "08";
        const mNum = parseInt(parts[1], 10) || 0;
        const m = (mNum >= 15 && mNum < 45) ? "30" : "00";
        return { h, m };
    };

    if (str.includes("-")) {
        const parts = str.split("-");
        const s = parseSingle(parts[0]);
        const e = parseSingle(parts[1]);
        startH.value = s.h;
        startM.value = s.m;
        endH.value = e.h;
        endM.value = e.m;
    } else {
        const s = parseSingle(str);
        startH.value = s.h;
        startM.value = s.m;
        endH.value = "";
        endM.value = "00";
    }
}

// ==========================================================================
// CONTROLADORES DE EVENTOS
// ==========================================================================
function setupEventListeners() {
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
        const handleNav = (e) => {
            if (e.cancelable) e.preventDefault();
            if (item.classList.contains("btn-logout-component")) {
                logoutComponent();
            } else {
                const target = item.getAttribute("data-target");
                if (target) renderActiveSection(target);
            }
        };
        item.addEventListener("click", handleNav);
    });
    // Navegación táctil por deslizamiento (Swipe Gestures) para el portal de músicos
    setupComponentSwipeNavigation();

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

    // Navegación de Acceso Rápido a los paneles de Estadísticas
    document.addEventListener("click", (e) => {
        const quickBtn = e.target.closest(".btn-stats-quick-link");
        if (quickBtn) {
            const targetId = quickBtn.getAttribute("data-target");
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                if (targetEl.classList.contains("collapsed")) {
                    targetEl.classList.remove("collapsed");
                }
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });

    // Botón flotante 'Volver arriba' para la vista de estadísticas
    const backToTopBtn = document.getElementById("btn-back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            const statsSection = document.getElementById("section-estadisticas");
            const isStatsActive = statsSection && statsSection.classList.contains("active");
            if (isStatsActive && window.scrollY > 250) {
                backToTopBtn.classList.remove("hidden");
            } else {
                backToTopBtn.classList.add("hidden");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Helper functions para menú desplegable lateral móvil (Drawer)
    window.openMobileSidebar = function() {
        const sidebar = document.querySelector(".sidebar");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar) sidebar.classList.add("open");
        if (backdrop) backdrop.classList.add("active");
    };

    window.closeMobileSidebar = function() {
        const sidebar = document.querySelector(".sidebar");
        const backdrop = document.getElementById("sidebar-backdrop");
        if (sidebar) sidebar.classList.remove("open");
        if (backdrop) backdrop.classList.remove("active");
    };

    window.toggleMobileSidebar = function() {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar && sidebar.classList.contains("open")) {
            window.closeMobileSidebar();
        } else {
            window.openMobileSidebar();
        }
    };

    const btnToggleMobileSidebar = document.getElementById("btn-toggle-mobile-sidebar");
    const sidebarBackdrop = document.getElementById("sidebar-backdrop");

    if (btnToggleMobileSidebar) {
        btnToggleMobileSidebar.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.toggleMobileSidebar();
        });
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener("click", () => {
            window.closeMobileSidebar();
        });
    }

    // Navegación Sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            
            window.closeMobileSidebar();

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

    // Control de múltiples sesiones en el mismo día (si existiera elemento)
    const attendanceSessionSelect = document.getElementById("attendance-session-select");
    if (attendanceSessionSelect) {
        attendanceSessionSelect.addEventListener("change", (e) => {
            const selectedSessionKey = e.target.value;
            if (selectedSessionKey) {
                state.currentDate = selectedSessionKey;
                initializeAttendanceForDate(selectedSessionKey);
                renderAttendance();
                renderRehearsalMarchasWidget();
                updateSessionBadge();
            }
        });
    }

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
    const searchPlantillaInput = document.getElementById("search-plantilla");
    if (searchPlantillaInput) {
        searchPlantillaInput.addEventListener("input", () => {
            renderPlantillaTable();
        });
    }

    // Buscador en Estadísticas (Músicos individuales)
    const searchStatsMusicianInput = document.getElementById("search-stats-musician");
    if (searchStatsMusicianInput) {
        searchStatsMusicianInput.addEventListener("input", () => {
            renderComponentsCircularStats();
        });
    }

    // Filtros de Período en Estadísticas
    const filterYearSelect = document.getElementById("filter-year");
    if (filterYearSelect) {
        filterYearSelect.addEventListener("change", () => {
            renderStatistics();
        });
    }
    const filterMonthSelect = document.getElementById("filter-month");
    if (filterMonthSelect) {
        filterMonthSelect.addEventListener("change", () => {
            renderStatistics();
        });
    }
    const filterTypeSelect = document.getElementById("filter-type");
    if (filterTypeSelect) {
        filterTypeSelect.addEventListener("change", () => {
            renderStatistics();
        });
    }

    const btnToggleEnsayadas = document.getElementById("btn-toggle-all-marchas-ensayadas");
    if (btnToggleEnsayadas) {
        btnToggleEnsayadas.addEventListener("click", (e) => {
            e.stopPropagation();
            showAllMarchasEnsayadas = !showAllMarchasEnsayadas;
            renderStatistics();
        });
    }

    const btnToggleActuacion = document.getElementById("btn-toggle-all-marchas-actuacion");
    if (btnToggleActuacion) {
        btnToggleActuacion.addEventListener("click", (e) => {
            e.stopPropagation();
            showAllMarchasActuacion = !showAllMarchasActuacion;
            renderStatistics();
        });
    }

    const btnToggleOlvidadas = document.getElementById("btn-toggle-all-marchas-olvidadas");
    if (btnToggleOlvidadas) {
        btnToggleOlvidadas.addEventListener("click", (e) => {
            e.stopPropagation();
            showAllMarchasOlvidadas = !showAllMarchasOlvidadas;
            renderStatistics();
        });
    }

    // Alternancia en Visión General (Estadísticas): Temporada / Meses / Ensayos
    const btnOvYears = document.getElementById("btn-stats-ov-years");
    const btnOvMonths = document.getElementById("btn-stats-ov-months");
    const btnOvSessions = document.getElementById("btn-stats-ov-sessions");
    const ovYearSelect = document.getElementById("stats-ov-year-select");

    const ovModeButtons = [
        { btn: btnOvYears, mode: "years" },
        { btn: btnOvMonths, mode: "months" },
        { btn: btnOvSessions, mode: "sessions" }
    ];

    const setActiveOvMode = (mode) => {
        state.statsOvMode = mode;
        ovModeButtons.forEach(({ btn, mode: btnMode }) => {
            if (!btn) return;
            const isActive = btnMode === mode;
            btn.classList.toggle("btn-primary", isActive);
            btn.classList.toggle("btn-secondary", !isActive);
            btn.style.background = isActive ? "" : "transparent";
            btn.style.color = isActive ? "" : "var(--text-secondary)";
        });

        const filterContainer = document.getElementById("stats-ov-month-filter-container");
        if (filterContainer) filterContainer.classList.toggle("hidden", mode === "years");

        renderGeneralOverviewChart();
    };

    ovModeButtons.forEach(({ btn, mode }) => {
        if (btn) btn.addEventListener("click", () => setActiveOvMode(mode));
    });

    if (ovYearSelect) {
        ovYearSelect.addEventListener("change", (e) => {
            state.statsOvSelectedSeason = e.target.value;
            renderGeneralOverviewChart();
        });
    }

    // Selector de temporada del calendar heatmap (Estadísticas Avanzadas)
    const heatmapYearSelect = document.getElementById("advanced-stats-heatmap-year-select");
    if (heatmapYearSelect) {
        heatmapYearSelect.addEventListener("change", (e) => {
            state.statsHeatmapSelectedSeason = e.target.value;
            renderStatsCalendarHeatmap();
        });
    }

    const btnDownloadSeasonReport = document.getElementById("btn-download-season-report");
    if (btnDownloadSeasonReport) {
        btnDownloadSeasonReport.addEventListener("click", () => {
            const season = document.getElementById("stats-ov-year-select").value;
            downloadSeasonPDFReport(season);
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
                
                const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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
                const musician = state.musicians.find(m => String(m.id) === String(musicianId));
                rutaInputListener.value = musician ? (musician.badgeRutaTrips || 0) : 0;
                showToast("Solo la dirección puede asignar estas insignias", "error");
                return;
            }
            const musicianId = currentDetailMusicianId;
            if (!musicianId) return;
            
            const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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
                const musician = state.musicians.find(m => String(m.id) === String(musicianId));
                hermandadInputListener.value = musician ? (musician.badgeHermandadEvents || 0) : 0;
                showToast("Solo la dirección puede asignar estas insignias", "error");
                return;
            }
            const musicianId = currentDetailMusicianId;
            if (!musicianId) return;
            
            const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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
        const date = state.currentDate;
        if (isPastLockBlocked(date)) {
            showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
            return;
        }
        if (confirm("¿Resetear la lista? Todos los componentes se marcarán como ausentes.")) {
            const date = state.currentDate;
            if (!state.sessionTypes[date]) {
                state.sessionTypes[date] = { type: "ensayo", name: "" };
                dbSaveSessionType(date, state.sessionTypes[date]);
            }
            state.musicians.forEach(musician => {
                if (state.attendance[date] && state.attendance[date][musician.id]) {
                    state.attendance[date][musician.id].status = "absent";
                    state.attendance[date][musician.id].justified = false;
                    state.attendance[date][musician.id].reason = "";
                    dbSaveAttendance(date, musician.id, state.attendance[date][musician.id]);
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
        const checkBaja = document.getElementById("musician-is-baja");
        if (checkBaja) checkBaja.checked = false;
        document.getElementById("modal-title").innerText = "Añadir Nuevo Músico";
        modalMusician.classList.add("active");
    });

    const closeModalMusician = () => modalMusician.classList.remove("active");
    document.getElementById("btn-close-modal").addEventListener("click", closeModalMusician);
    document.getElementById("btn-cancel-modal").addEventListener("click", closeModalMusician);

    // Event listeners para el modal de racha
    const streakModal = document.getElementById("modal-streak-info");
    const closeStreakBtn = document.getElementById("btn-close-streak-modal");
    const okStreakBtn = document.getElementById("btn-streak-modal-ok");

    if (closeStreakBtn) {
        closeStreakBtn.addEventListener("click", () => {
            if (streakModal) streakModal.classList.remove("active");
        });
    }
    if (okStreakBtn) {
        okStreakBtn.addEventListener("click", () => {
            if (streakModal) streakModal.classList.remove("active");
        });
    }
    if (streakModal) {
        streakModal.addEventListener("click", (e) => {
            if (e.target === streakModal) {
                streakModal.classList.remove("active");
            }
        });
    }

    // Event listeners para el modal de insignias
    const insigniasModal = document.getElementById("modal-insignias-info");
    const closeInsigniasBtn = document.getElementById("btn-close-insignias-modal");
    const okInsigniasBtn = document.getElementById("btn-insignias-modal-ok");

    if (closeInsigniasBtn) {
        closeInsigniasBtn.addEventListener("click", () => {
            if (insigniasModal) insigniasModal.classList.remove("active");
        });
    }
    if (okInsigniasBtn) {
        okInsigniasBtn.addEventListener("click", () => {
            if (insigniasModal) insigniasModal.classList.remove("active");
        });
    }
    if (insigniasModal) {
        insigniasModal.addEventListener("click", (e) => {
            if (e.target === insigniasModal) {
                insigniasModal.classList.remove("active");
            }
        });
    }

    // Event listeners para el modal de detalle de insignia individual
    const singleInsigniaModal = document.getElementById("modal-single-insignia-detail");
    const closeSingleInsigniaBtn = document.getElementById("btn-close-insignia-detail-modal");
    const okSingleInsigniaBtn = document.getElementById("btn-insignia-detail-modal-ok");

    if (closeSingleInsigniaBtn) {
        closeSingleInsigniaBtn.addEventListener("click", () => {
            if (singleInsigniaModal) singleInsigniaModal.classList.remove("active");
        });
    }
    if (okSingleInsigniaBtn) {
        okSingleInsigniaBtn.addEventListener("click", () => {
            if (singleInsigniaModal) singleInsigniaModal.classList.remove("active");
        });
    }
    if (singleInsigniaModal) {
        singleInsigniaModal.addEventListener("click", (e) => {
            if (e.target === singleInsigniaModal) {
                singleInsigniaModal.classList.remove("active");
            }
        });
    }

    // Modal de previsualización de foto de perfil
    const closePhotoPreview = () => {
        const modal = document.getElementById("modal-photo-preview");
        if (modal) modal.classList.remove("active");
    };
    const btnClosePhoto = document.getElementById("btn-close-photo-preview");
    const btnClosePhotoFooter = document.getElementById("btn-close-photo-preview-footer");
    const modalPhoto = document.getElementById("modal-photo-preview");
    if (btnClosePhoto) btnClosePhoto.addEventListener("click", closePhotoPreview);
    if (btnClosePhotoFooter) btnClosePhotoFooter.addEventListener("click", closePhotoPreview);
    if (modalPhoto) {
        modalPhoto.addEventListener("click", (e) => {
            if (e.target === modalPhoto) closePhotoPreview();
        });
    }

    // Modal de detalle de un compañero (Top 25 Asistencia)
    const closePeerDetail = () => {
        const modal = document.getElementById("modal-peer-detail");
        if (modal) modal.classList.remove("active");
    };
    const btnClosePeerDetail = document.getElementById("btn-close-peer-detail");
    const modalPeerDetail = document.getElementById("modal-peer-detail");
    if (btnClosePeerDetail) btnClosePeerDetail.addEventListener("click", closePeerDetail);
    if (modalPeerDetail) {
        modalPeerDetail.addEventListener("click", (e) => {
            if (e.target === modalPeerDetail) closePeerDetail();
        });
        const peerDetailCard = modalPeerDetail.querySelector(".modal-card");
        if (peerDetailCard) {
            peerDetailCard.addEventListener("click", (e) => {
                if (e.target.closest("#btn-close-peer-detail")) return;
                spawnFloatingHearts(peerDetailCard, e.clientX, e.clientY);
            });
        }
    }

    // Modal de detalle de ensayo para músicos
    const closeCompRehearsal = () => {
        const modal = document.getElementById("modal-comp-rehearsal-detail");
        if (modal) modal.classList.remove("active");
    };
    const btnCloseCompRehearsal = document.getElementById("btn-close-comp-rehearsal-detail");
    const btnCloseCompRehearsalFooter = document.getElementById("btn-close-comp-rehearsal-detail-footer");
    const modalCompRehearsal = document.getElementById("modal-comp-rehearsal-detail");
    if (btnCloseCompRehearsal) btnCloseCompRehearsal.addEventListener("click", closeCompRehearsal);
    if (btnCloseCompRehearsalFooter) btnCloseCompRehearsalFooter.addEventListener("click", closeCompRehearsal);
    if (modalCompRehearsal) {
        modalCompRehearsal.addEventListener("click", (e) => {
            if (e.target === modalCompRehearsal) closeCompRehearsal();
        });
    }

    document.getElementById("form-musician").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("musician-id").value;
        const name = document.getElementById("musician-name").value.trim();
        const fullName = document.getElementById("musician-fullname").value.trim();
        const instrument = document.getElementById("musician-instrument").value;
        const role = document.getElementById("musician-role").value.trim();
        const isBajaChecked = document.getElementById("musician-is-baja") ? document.getElementById("musician-is-baja").checked : false;
        
        if (!name || !instrument) return;

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        if (id) {
            const index = state.musicians.findIndex(m => m.id === id);
            if (index !== -1) {
                const existing = state.musicians[index];
                const wasBaja = !!existing.isBaja;
                let leaves = Array.isArray(existing.leaves) ? [...existing.leaves] : [];

                if (isBajaChecked && !wasBaja) {
                    leaves.push({
                        id: "leave-" + Date.now(),
                        startDate: todayStr,
                        endDate: null
                    });
                } else if (!isBajaChecked && wasBaja) {
                    const activeIdx = leaves.findIndex(l => !l.endDate);
                    if (activeIdx !== -1) {
                        leaves[activeIdx] = {
                            ...leaves[activeIdx],
                            endDate: todayStr
                        };
                    }
                }

                state.musicians[index] = {
                    ...existing,
                    name,
                    fullName,
                    instrument,
                    role,
                    isBaja: isBajaChecked,
                    leaves: leaves
                };
                dbSaveMusician(state.musicians[index]);
                renderPlantillaTable();
                renderStatistics();
                showToast("Músico actualizado", "success");
            }
        } else {
            const newId = "mus-" + Date.now();
            let leaves = [];
            if (isBajaChecked) {
                leaves.push({
                    id: "leave-" + Date.now(),
                    startDate: todayStr,
                    endDate: null
                });
            }
            const newMusician = {
                id: newId,
                name,
                fullName,
                instrument,
                role,
                isBaja: isBajaChecked,
                leaves: leaves,
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
            renderPlantillaTable();
            renderStatistics();
            
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
    // MODAL DE CREAR / EDITAR ENSAYO
    // ==========================================
    const modalRehearsal = document.getElementById("modal-rehearsal");
    
    document.getElementById("btn-add-rehearsal").addEventListener("click", () => {
        renderRehearsalLocationOptions();
        if (document.getElementById("rehearsal-editing-key")) document.getElementById("rehearsal-editing-key").value = "";
        if (document.getElementById("modal-rehearsal-title")) document.getElementById("modal-rehearsal-title").innerText = "Nuevo Ensayo";
        if (document.getElementById("btn-submit-rehearsal-modal")) document.getElementById("btn-submit-rehearsal-modal").innerText = "Crear Ensayo";

        document.getElementById("rehearsal-date-input").value = new Date().toISOString().split("T")[0];
        document.getElementById("rehearsal-type-input").value = "general";
        if (document.getElementById("rehearsal-responsable-input")) document.getElementById("rehearsal-responsable-input").value = "";
        updateResponsableQuickButtonsState();
        setTimeInputsFromValue("rehearsal-start-hour-input", "rehearsal-start-min-input", "rehearsal-end-hour-input", "rehearsal-end-min-input", "");
        modalRehearsal.classList.add("active");
    });

    const closeModalRehearsal = () => modalRehearsal.classList.remove("active");
    document.getElementById("btn-close-rehearsal-modal").addEventListener("click", closeModalRehearsal);
    document.getElementById("btn-cancel-rehearsal-modal").addEventListener("click", closeModalRehearsal);

    document.querySelectorAll(".rehearsal-responsable-quick-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            toggleResponsableQuickName(btn.dataset.value);
        });
    });

    const responsableInputEl = document.getElementById("rehearsal-responsable-input");
    if (responsableInputEl) {
        responsableInputEl.addEventListener("input", updateResponsableQuickButtonsState);
    }

    document.getElementById("form-rehearsal").addEventListener("submit", (e) => {
        e.preventDefault();
        const editingKey = document.getElementById("rehearsal-editing-key") ? document.getElementById("rehearsal-editing-key").value : "";
        const selectedDate = document.getElementById("rehearsal-date-input").value;
        const subtype = document.getElementById("rehearsal-type-input").value;
        if (!selectedDate) return;

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
            convocatedVoices = ["Trompetas 1ª", "Cornetas"];
        }

        const locationVal = document.getElementById("rehearsal-location-input") ? document.getElementById("rehearsal-location-input").value : "Parking";
        const responsableVal = document.getElementById("rehearsal-responsable-input") ? document.getElementById("rehearsal-responsable-input").value.trim() : "";
        const timeVal = getFormattedTimeFromInputs("rehearsal-start-hour-input", "rehearsal-start-min-input", "rehearsal-end-hour-input", "rehearsal-end-min-input");

        let targetKey = selectedDate;
        if (subtype !== "general") {
            targetKey = `${selectedDate}_${subtype}`;
        }

        if (editingKey) {
            // Modo Edición
            if (editingKey !== targetKey) {
                if (state.sessionTypes[targetKey]) {
                    showToast("Ya existe un ensayo registrado para esta fecha y tipo", "error");
                    return;
                }
                const oldSession = state.sessionTypes[editingKey] || {};
                state.sessionTypes[targetKey] = {
                    ...oldSession,
                    type: "ensayo",
                    subtype: subtype,
                    convocatedVoices: convocatedVoices,
                    location: locationVal,
                    responsable: responsableVal,
                    time: timeVal
                };
                if (state.attendance[editingKey]) {
                    state.attendance[targetKey] = state.attendance[editingKey];
                    delete state.attendance[editingKey];
                }
                if (state.playedMarchas[editingKey]) {
                    state.playedMarchas[targetKey] = state.playedMarchas[editingKey];
                    dbSavePlayedMarchas(targetKey, state.playedMarchas[targetKey]);
                }
                delete state.sessionTypes[editingKey];
                dbDeleteSession(editingKey); // limpia también playedMarchas[editingKey], ya migrado arriba
            } else {
                state.sessionTypes[targetKey] = {
                    ...state.sessionTypes[targetKey],
                    type: "ensayo",
                    subtype: subtype,
                    convocatedVoices: convocatedVoices,
                    location: locationVal,
                    responsable: responsableVal,
                    time: timeVal
                };
            }

            dbSaveSessionType(targetKey, state.sessionTypes[targetKey]);
            if (isCloudActive()) {
                const db = firebase.firestore();
                if (state.attendance[targetKey]) {
                    db.collection("attendance").doc(targetKey).set(state.attendance[targetKey]);
                }
            } else {
                saveStateToLocalStorage();
            }

            closeModalRehearsal();
            renderEnsayosList();
            renderStatistics();
            renderCalendar();
            showToast(`Ensayo del ${formatDateSpanish(selectedDate)} actualizado con éxito`, "success");
        } else {
            // Modo Creación
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

            const createdAtIso = new Date().toISOString();
            state.sessionTypes[sessionKey] = {
                type: "ensayo",
                subtype: subtype,
                name: "",
                convocatedVoices: convocatedVoices,
                location: locationVal,
                responsable: responsableVal,
                time: timeVal,
                createdAt: createdAtIso
            };
            initializeAttendanceForDate(sessionKey, convocatedVoices);
            
            dbSaveSessionType(sessionKey, state.sessionTypes[sessionKey]);
            dispatchSessionNotification(sessionKey, state.sessionTypes[sessionKey]);
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
            } else {
                saveStateToLocalStorage();
            }
            
            closeModalRehearsal();
            renderEnsayosList();
            renderStatistics();
            renderCalendar();
            
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
        }
    });

    // ==========================================
    // MODAL DE CREAR / EDITAR ACTUACIÓN
    // ==========================================
    const modalActuacion = document.getElementById("modal-actuacion");
    
    document.getElementById("btn-add-actuacion").addEventListener("click", () => {
        if (document.getElementById("actuacion-editing-key")) document.getElementById("actuacion-editing-key").value = "";
        if (document.getElementById("modal-actuacion-title")) document.getElementById("modal-actuacion-title").innerText = "Nueva Actuación";
        if (document.getElementById("btn-submit-actuacion-modal")) document.getElementById("btn-submit-actuacion-modal").innerText = "Crear Actuación";

        document.getElementById("actuacion-date-input").value = new Date().toISOString().split("T")[0];
        document.getElementById("actuacion-name-input").value = "";
        if (document.getElementById("actuacion-location-input")) {
            document.getElementById("actuacion-location-input").value = "";
        }
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
        const editingKey = document.getElementById("actuacion-editing-key") ? document.getElementById("actuacion-editing-key").value : "";
        const selectedDate = document.getElementById("actuacion-date-input").value;
        const actuacionName = document.getElementById("actuacion-name-input").value.trim();
        if (!selectedDate || !actuacionName) return;

        const isTrip = document.getElementById("actuacion-trip-input") ? document.getElementById("actuacion-trip-input").checked : false;
        const locationVal = document.getElementById("actuacion-location-input") ? document.getElementById("actuacion-location-input").value.trim() : "";

        if (editingKey) {
            // Modo Edición
            let targetKey = editingKey;
            if (editingKey !== selectedDate && editingKey !== `${selectedDate}_actuacion`) {
                targetKey = selectedDate;
                if (state.sessionTypes[targetKey]) {
                    targetKey = `${selectedDate}_actuacion`;
                    if (state.sessionTypes[targetKey]) {
                        showToast("Ya existe una actuación registrada para esta fecha", "error");
                        return;
                    }
                }
                const oldSession = state.sessionTypes[editingKey] || {};
                state.sessionTypes[targetKey] = {
                    ...oldSession,
                    type: "actuacion",
                    name: actuacionName,
                    isTrip: isTrip,
                    location: locationVal
                };
                if (state.attendance[editingKey]) {
                    state.attendance[targetKey] = state.attendance[editingKey];
                    delete state.attendance[editingKey];
                }
                if (state.actuacionRepertoire[editingKey]) {
                    state.actuacionRepertoire[targetKey] = state.actuacionRepertoire[editingKey];
                    dbSaveActuacionRepertoire(targetKey, state.actuacionRepertoire[targetKey]);
                }
                delete state.sessionTypes[editingKey];
                dbDeleteSession(editingKey); // limpia también actuacionRepertoire[editingKey], ya migrado arriba
            } else {
                state.sessionTypes[targetKey] = {
                    ...state.sessionTypes[targetKey],
                    type: "actuacion",
                    name: actuacionName,
                    isTrip: isTrip,
                    location: locationVal
                };
            }

            dbSaveSessionType(targetKey, state.sessionTypes[targetKey]);
            if (isCloudActive()) {
                const db = firebase.firestore();
                if (state.attendance[targetKey]) {
                    db.collection("attendance").doc(targetKey).set(state.attendance[targetKey]);
                }
            } else {
                saveStateToLocalStorage();
            }

            closeModalActuacion();
            renderActuacionesList();
            renderStatistics();
            renderCalendar();
            showToast(`Actuación "${actuacionName}" actualizada con éxito`, "success");
        } else {
            // Modo Creación
            let sessionKey = selectedDate;
            if (state.sessionTypes[sessionKey]) {
                sessionKey = `${selectedDate}_actuacion`;
                if (state.sessionTypes[sessionKey]) {
                    showToast("Ya existe una actuación registrada para esta fecha", "error");
                    return;
                }
            }

            initializeAttendanceForDate(sessionKey);
            const createdAtIso = new Date().toISOString();
            state.sessionTypes[sessionKey] = { 
                type: "actuacion", 
                name: actuacionName, 
                isTrip: isTrip,
                location: locationVal,
                createdAt: createdAtIso
            };
            
            dbSaveSessionType(sessionKey, state.sessionTypes[sessionKey]);
            dispatchSessionNotification(sessionKey, state.sessionTypes[sessionKey]);
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
            } else {
                saveStateToLocalStorage();
            }
            
            closeModalActuacion();
            renderActuacionesList();
            renderStatistics();
            renderCalendar();
            
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
        }
    });



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
        formChangeAdminPass.addEventListener("submit", async (e) => {
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
            
            let targetHash = state.firebasePasswordHash || localStorage.getItem("yacente_firebase_hash") || "";

            // Si la nube está activa, obtener la contraseña real de la directiva guardada en Firestore
            if (isCloudActive()) {
                try {
                    const db = firebase.firestore();
                    const secDoc = await db.collection("config").doc("security").get();
                    if (secDoc.exists && secDoc.data() && secDoc.data().passwordHash) {
                        targetHash = secDoc.data().passwordHash;
                        state.firebasePasswordHash = targetHash;
                        localStorage.setItem("yacente_firebase_hash", targetHash);
                    }
                } catch (err) {
                    console.error("Error al verificar contraseña actual en Firestore:", err);
                }
            }

            // Validar contraseña actual ("admin" solo sirve si nunca se ha configurado ninguna contraseña)
            let isValid = false;
            if (targetHash) {
                isValid = (await verifyPassword(oldPass, targetHash)).valid;
            } else {
                isValid = (oldPass === "admin");
            }

            if (!isValid) {
                showToast("La contraseña actual es incorrecta", "error");
                return;
            }

            // Guardar nueva contraseña
            const newHash = await hashPassword(newPass);
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

    // Bloqueo de Pasado (Interruptor y Modal de Seguridad)
    const togglePastLock = document.getElementById("toggle-past-lock");
    const modalPastLock = document.getElementById("modal-past-lock-auth");
    const formPastLock = document.getElementById("form-past-lock-auth");
    const closePastLockBtn = document.getElementById("btn-close-past-lock-modal");
    const cancelPastLockBtn = document.getElementById("btn-cancel-past-lock-modal");

    if (togglePastLock) {
        togglePastLock.checked = !!state.pastLockEnabled;

        togglePastLock.addEventListener("click", (e) => {
            if (!state.pastLockEnabled) {
                // ACTIVAR directamente sin pedir contraseña
                state.pastLockEnabled = true;
                togglePastLock.checked = true;
                localStorage.setItem("yacente_past_lock_enabled", "true");

                if (isCloudActive()) {
                    const db = firebase.firestore();
                    db.collection("config").doc("security").set({
                        pastLockEnabled: true
                    }, { merge: true }).catch(err => console.error("Error al guardar bloqueo de pasado en Firestore:", err));
                }

                showToast("Bloqueo de pasado activado.", "success");
            } else {
                // DESACTIVAR requiere contraseña
                e.preventDefault();
                const passInput = document.getElementById("past-lock-password");
                if (passInput) passInput.value = "";
                if (modalPastLock) modalPastLock.classList.add("active");
            }
        });
    }

    const closePastLockModal = () => {
        if (modalPastLock) modalPastLock.classList.remove("active");
    };

    if (closePastLockBtn) closePastLockBtn.addEventListener("click", closePastLockModal);
    if (cancelPastLockBtn) cancelPastLockBtn.addEventListener("click", closePastLockModal);

    if (formPastLock) {
        formPastLock.addEventListener("submit", (e) => {
            e.preventDefault();
            const passInput = document.getElementById("past-lock-password").value.trim();

            if (passInput === PAST_LOCK_MASTER_PASS) {
                state.pastLockEnabled = false;
                localStorage.setItem("yacente_past_lock_enabled", "false");

                if (togglePastLock) {
                    togglePastLock.checked = false;
                }

                if (isCloudActive()) {
                    const db = firebase.firestore();
                    db.collection("config").doc("security").set({
                        pastLockEnabled: false
                    }, { merge: true }).catch(err => console.error("Error al guardar bloqueo de pasado en Firestore:", err));
                }

                showToast("Bloqueo de pasado desactivado.", "success");
                closePastLockModal();
            } else {
                showToast("Contraseña de bloqueo de pasado incorrecta", "error");
            }
        });
    }

    // ==========================================
    // REPERTORIO Y MARCHAS
    // ==========================================
    document.getElementById("btn-close-marcha-history-modal").addEventListener("click", () => {
        document.getElementById("modal-marcha-history").classList.remove("active");
    });
    document.getElementById("modal-marcha-history").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.getElementById("modal-marcha-history").classList.remove("active");
        }
    });

    document.getElementById("search-marcha").addEventListener("input", () => {
        renderMarchasList();
    });

    const marchasFilterYearEl = document.getElementById("marchas-filter-year");
    if (marchasFilterYearEl) {
        marchasFilterYearEl.addEventListener("change", () => renderMarchasList());
    }

    const btnDownloadRepertoireSeasonPdf = document.getElementById("btn-download-repertorio-season-pdf");
    if (btnDownloadRepertoireSeasonPdf) {
        btnDownloadRepertoireSeasonPdf.addEventListener("click", () => {
            const season = document.getElementById("marchas-filter-year") ? document.getElementById("marchas-filter-year").value : "";
            downloadRepertoireSeasonPDF(season);
        });
    }

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
        
        if (isPastLockBlocked(date)) {
            showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
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
        if (document.getElementById("quick-session-trip-input")) document.getElementById("quick-session-trip-input").checked = false;
        setTimeInputsFromValue("quick-session-start-hour", "quick-session-start-min", "quick-session-end-hour", "quick-session-end-min", "");

        const sessionInfo = state.sessionTypes[date];
        if (sessionInfo) {
            if (sessionInfo.type === "actuacion") {
                document.getElementById("quick-session-type").value = "actuacion";
                document.getElementById("quick-session-actuacion-name").value = sessionInfo.name || "";
                if (document.getElementById("quick-session-trip-input")) document.getElementById("quick-session-trip-input").checked = !!sessionInfo.isTrip;
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
                setTimeInputsFromValue("quick-session-start-hour", "quick-session-start-min", "quick-session-end-hour", "quick-session-end-min", sessionInfo.time || "");
            }
        } else {
            // Default when not created
            document.getElementById("quick-session-type").value = "ensayo-general";
            if (document.getElementById("quick-session-location")) {
                document.getElementById("quick-session-location").value = "Parking";
            }
            setTimeInputsFromValue("quick-session-start-hour", "quick-session-start-min", "quick-session-end-hour", "quick-session-end-min", "");
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
        const timeGroup = document.getElementById("quick-session-time-group");
        
        if (type === "actuacion") {
            actuacionGroup.classList.remove("hidden");
            if (locationGroup) locationGroup.classList.add("hidden");
            if (timeGroup) timeGroup.classList.add("hidden");
        } else {
            actuacionGroup.classList.add("hidden");
            if (locationGroup) locationGroup.classList.remove("hidden");
            if (timeGroup) timeGroup.classList.remove("hidden");
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
            const timeVal = getFormattedTimeFromInputs("quick-session-start-hour", "quick-session-start-min", "quick-session-end-hour", "quick-session-end-min");
            
            if (type === "ensayo-general") {
                newSession = { type: "ensayo", subtype: "general", name: "", location: locationVal, time: timeVal };
            } else if (type === "ensayo-trompetas1") {
                convocatedVoices = ["Trompetas 1ª", "Fliscornos"];
                newSession = { type: "ensayo", subtype: "trompetas1", name: "", convocatedVoices, location: locationVal, time: timeVal };
            } else if (type === "ensayo-bajos") {
                convocatedVoices = ["Trompas", "Trombones", "Bombardinos", "Tubas"];
                newSession = { type: "ensayo", subtype: "bajos", name: "", convocatedVoices, location: locationVal, time: timeVal };
            } else if (type === "ensayo-trompetas2y3") {
                convocatedVoices = ["Trompetas 2ª", "Trompetas 3ª"];
                newSession = { type: "ensayo", subtype: "trompetas2y3", name: "", convocatedVoices, location: locationVal, time: timeVal };
            } else if (type === "ensayo-cornetas") {
                convocatedVoices = ["Cornetas"];
                newSession = { type: "ensayo", subtype: "cornetas", name: "", convocatedVoices, location: locationVal, time: timeVal };
            } else if (type === "ensayo-percusion") {
                convocatedVoices = ["Tambores", "Bombos", "Platos"];
                newSession = { type: "ensayo", subtype: "percusion", name: "", convocatedVoices, location: locationVal, time: timeVal };
            } else if (type === "ensayo-primeras") {
                convocatedVoices = ["Trompetas 1ª", "Cornetas"];
                newSession = { type: "ensayo", subtype: "primeras", name: "", convocatedVoices, location: locationVal, time: timeVal }; // Fallback
            }
        } else if (type === "actuacion") {
            const actuacionName = document.getElementById("quick-session-actuacion-name").value.trim();
            if (!actuacionName) {
                showToast("Por favor, introduce el nombre de la actuación", "error");
                return;
            }
            const isTrip = document.getElementById("quick-session-trip-input") ? document.getElementById("quick-session-trip-input").checked : false;
            newSession = { type: "actuacion", name: actuacionName, isTrip: isTrip };
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

        // Save to state with createdAt timestamp
        newSession.createdAt = new Date().toISOString();
        state.sessionTypes[sessionKey] = newSession;
        
        // Initialize attendance records for the new configuration
        initializeAttendanceForDate(sessionKey, convocatedVoices);
        
        // Save to Database and Local Storage
        dbSaveSessionType(sessionKey, newSession);
        dispatchSessionNotification(sessionKey, newSession);
        if (isCloudActive()) {
            const db = firebase.firestore();
            if (state.attendance[sessionKey]) {
                db.collection("attendance").doc(sessionKey).set(state.attendance[sessionKey]);
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
    
    // Inicializar eventos de preaviso, detalle de eventos, foto de perfil y comunicados
    setupPreavisoEvents();
    setupUpcomingEventDetailEvents();
    setupMultiEventSelectModalEvents();
    setupProfilePhotoEvents();
    setupAnnouncementEvents();
    setupMusicianDrawerAndSettingsEvents();
    setupSuggestionsMailboxEvents();
    setupLugaresEnsayoEvents();
    setupAdvancedStatsEvents();
    setupMarchaAudioLinksModalEvents();
    setupMarchaModalEvents();
    setupRepertoireLinksModalEvents();
    setupActuacionRepertoireModalEvents();

    // Notificaciones de Músicos (Modal Flotante)
    const btnNotifBell = document.getElementById("btn-comp-notifications-bell");
    const notifModal = document.getElementById("modal-component-notifications");
    const closeNotifBtn = document.getElementById("btn-close-comp-notif-modal");

    if (btnNotifBell) {
        btnNotifBell.addEventListener("click", (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            renderComponentNotificationsList();
            if (notifModal) {
                notifModal.classList.add("active");
            }
        });
    }

    if (closeNotifBtn) {
        closeNotifBtn.addEventListener("click", () => {
            if (notifModal) notifModal.classList.remove("active");
        });
    }

    if (notifModal) {
        notifModal.addEventListener("click", (e) => {
            if (e.target === notifModal) {
                notifModal.classList.remove("active");
            }
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

function setupComponentSwipeNavigation() {
    const mainContent = document.querySelector(".main-content");
    if (!mainContent) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const sectionsOrder = [
        "section-componente-ficha",
        "section-componente-eventos",
        "section-componente-historial",
        "section-componente-repertorio",
        "section-componente-sugerencias",
        "section-componente-ajustes"
    ];

    mainContent.addEventListener("touchstart", (e) => {
        if (getAuthRole() !== "component") return;
        if (!e.touches || e.touches.length > 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    mainContent.addEventListener("touchend", (e) => {
        if (getAuthRole() !== "component") return;
        if (!e.changedTouches || e.changedTouches.length === 0) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Umbral de deslizamiento horizontal (min 50px) y tolerancia vertical (max 60px)
        if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60) {
            const activeSection = document.querySelector(".app-section.active");
            if (!activeSection) return;

            const currentId = activeSection.id;
            const currentIndex = sectionsOrder.indexOf(currentId);

            if (currentIndex !== -1) {
                if (deltaX < 0) {
                    // Deslizar izquierda -> Siguiente página (desplazar desde la derecha)
                    if (currentIndex < sectionsOrder.length - 1) {
                        renderActiveSection(sectionsOrder[currentIndex + 1], "next");
                    }
                } else {
                    // Deslizar derecha -> Página anterior (desplazar desde la izquierda)
                    if (currentIndex > 0) {
                        renderActiveSection(sectionsOrder[currentIndex - 1], "prev");
                    }
                }
            } else if (currentId === "section-componente-notificaciones") {
                if (deltaX > 0) {
                    renderActiveSection("section-componente-ficha", "prev");
                }
            }
        }
    }, { passive: true });
}

function renderActiveSection(sectionId, forcedDirection) {
    const activeRole = getAuthRole();
    const mobNav = document.getElementById("component-mobile-nav");
    if (activeRole === "component") {
        document.body.classList.add("component-portal");
        if (mobNav) mobNav.classList.remove("hidden");
        if (!sectionId.startsWith("section-componente-")) {
            sectionId = "section-componente-ficha";
        }
    } else {
        document.body.classList.remove("component-portal");
        if (mobNav) mobNav.classList.add("hidden");
    }

    // En móvil, la sección de Ajustes no es accesible y se redirige a Pasar Lista
    if (window.innerWidth <= 768 && sectionId === "section-ajustes") {
        sectionId = "section-pasar-lista";
    }

    const previousActive = document.querySelector(".app-section.active");
    const sectionsOrder = [
        "section-componente-ficha",
        "section-componente-eventos",
        "section-componente-historial",
        "section-componente-repertorio",
        "section-componente-sugerencias",
        "section-componente-ajustes"
    ];

    let direction = forcedDirection;
    if (!direction && activeRole === "component" && previousActive && previousActive.id !== sectionId) {
        const prevIdx = sectionsOrder.indexOf(previousActive.id);
        const nextIdx = sectionsOrder.indexOf(sectionId);
        if (prevIdx !== -1 && nextIdx !== -1) {
            direction = nextIdx > prevIdx ? "next" : "prev";
        }
    }

    const allTransClasses = [
        "trans-ios-right", "trans-ios-left",
        "trans-glass-right", "trans-glass-left",
        "trans-snappy-right", "trans-snappy-left",
        "trans-3d-right", "trans-3d-left",
        "slide-in-right", "slide-in-left"
    ];

    document.querySelectorAll(".app-section").forEach(section => {
        section.classList.remove("active", ...allTransClasses);
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add("active");
        if (activeRole === "component" && direction) {
            const style = window.swipeTransitionStyle || "ios";
            const animClass = `trans-${style}-${direction === "next" ? "right" : "left"}`;
            targetSection.classList.add(animClass);
        }
    }

    const pageTitle = document.getElementById("page-title");
    const pageSubtitle = document.getElementById("page-subtitle");
    const dateContainer = document.getElementById("header-date-container");
    const sessionBadge = document.getElementById("attendance-session-badge");
    const configBtn = document.getElementById("btn-configure-session");
    const announcementBtn = document.getElementById("btn-open-announcement-modal");

    if (sessionBadge) sessionBadge.style.display = "none";
    if (configBtn) configBtn.style.display = "none";

    // Visibilidad del botón de comunicado (Solo Director y NO en la sección de Ajustes)
    if (announcementBtn) {
        if (activeRole !== "component" && sectionId !== "section-ajustes") {
            announcementBtn.style.display = "inline-flex";
        } else {
            announcementBtn.style.display = "none";
        }
    }

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
            pageSubtitle.innerText = "Estado de trabajo y estadísticas de marchas procesionales";
            dateContainer.classList.add("hidden");
            renderMarchasList();
            renderRepertoireLinksUI();
            break;
        case "section-ajustes":
            pageTitle.innerText = "Ajustes";
            pageSubtitle.innerText = "Administración general y copias de seguridad";
            dateContainer.classList.add("hidden");
            

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
            renderRepertoireLinksUI();
            break;
        case "section-componente-sugerencias":
            pageTitle.innerText = "Sugerencias";
            pageSubtitle.innerText = "Haz llegar tus propuestas a la directiva";
            dateContainer.classList.add("hidden");
            renderComponentSugerenciasPage();
            renderMySuggestionHistory();
            break;
        case "section-componente-ajustes":
            pageTitle.innerText = "Ajustes";
            pageSubtitle.innerText = "Seguridad y gestión de la cuenta";
            dateContainer.classList.add("hidden");
            break;
        case "section-otros":
            pageTitle.innerText = "Otros";
            pageSubtitle.innerText = "Funciones adicionales";
            dateContainer.classList.add("hidden");
            break;
        case "section-otros-sugerencias":
            pageTitle.innerText = "Buzón de Sugerencias";
            pageSubtitle.innerText = "Propuestas enviadas por los músicos";
            dateContainer.classList.add("hidden");
            renderAdminSuggestionsList();
            dbMarkAllSuggestionsRead().then(() => updateSuggestionsBadge());
            break;
        case "section-otros-lugares-ensayo":
            pageTitle.innerText = "Lugares de Ensayo";
            pageSubtitle.innerText = "Gestión de ubicaciones y enlace a Google Maps";
            dateContainer.classList.add("hidden");
            renderAdminLugaresEnsayoList();
            break;
        case "section-otros-estadisticas-avanzadas":
            pageTitle.innerText = "Estadísticas Avanzadas";
            pageSubtitle.innerText = "Gráficos detallados de la banda";
            dateContainer.classList.add("hidden");
            renderStatsSectionTreemap();
            renderStatsAttendanceSunburst();
            renderStatsCalendarHeatmap();
            renderAdvancedStatsBumpChart();
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

        const activeMusiciansInSection = musiciansInSection.filter(m => !isMusicianOnLeaveOnDate(m, date));

        let presents = 0;
        activeMusiciansInSection.forEach(m => {
            if (state.attendance[date] && state.attendance[date][m.id] && state.attendance[date][m.id].status === "present") {
                presents++;
            }
        });
        const sectionRatio = activeMusiciansInSection.length > 0 ? Math.round((presents / activeMusiciansInSection.length) * 100) : 0;

        const allPresent = activeMusiciansInSection.length > 0 && presents === activeMusiciansInSection.length;

        const headerDiv = document.createElement("div");
        headerDiv.className = "instrument-header";
        headerDiv.innerHTML = `
            <div class="instrument-title">
                <h3>${sectionName}</h3>
                <span class="musician-count-badge">${musiciansInSection.length}</span>
            </div>
            <div class="instrument-header-actions" style="display: flex; align-items: center; gap: 8px;">
                <button type="button" class="btn-mark-section-present ${allPresent ? 'all-present' : ''}" title="${allPresent ? 'Desmarcar a todos los componentes de ' + sectionName : 'Marcar a todos los componentes de ' + sectionName + ' como presentes'}">
                    ${allPresent ? `
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <span>Desmarcar todos</span>
                    ` : `
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Marcar todos</span>
                    `}
                </button>
                <span class="section-attendance-ratio">${sectionRatio}% Asistencia</span>
                <svg class="chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        `;
        
        const btnMarkSection = headerDiv.querySelector(".btn-mark-section-present");
        if (btnMarkSection) {
            btnMarkSection.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleVoiceAttendance(musiciansInSection, sectionName, !allPresent);
            });
        }

        headerDiv.addEventListener("click", () => {
            sectionDiv.classList.toggle("collapsed");
        });

        const listDiv = document.createElement("div");
        listDiv.className = "musicians-list";

        musiciansInSection.forEach(musician => {
            const isOnLeave = isMusicianOnLeaveOnDate(musician, date);
            const dateAtt = state.attendance[date] || {};
            const attState = dateAtt[musician.id] || { status: "absent", justified: false, reason: "" };
            const cardDiv = document.createElement("div");
            cardDiv.className = `musician-card`;
            cardDiv.id = `card-${musician.id}`;
            
            if (isOnLeave) {
                cardDiv.classList.add("is-baja");
                cardDiv.style.cssText = "background: rgba(128, 128, 128, 0.08); border: 1px solid rgba(160, 160, 160, 0.3); opacity: 0.75; filter: grayscale(0.85);";
            } else if (attState.status === "present") {
                cardDiv.classList.add("is-present");
            } else {
                cardDiv.classList.add("is-absent");
                if (attState.justified) {
                    cardDiv.classList.add("is-justified");
                }
            }

            const initials = getInitials(musician.name);
            const avatarMarkup = musician.photo
                ? `<img src="${musician.photo}" alt="${musician.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                : initials;

            const bajaBadgeMarkup = isOnLeave ? `<span style="font-size: 0.68rem; background: rgba(128, 128, 128, 0.25); color: #a0a0a0; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(160, 160, 160, 0.4); font-weight: 700; text-transform: uppercase; margin-left: 6px; vertical-align: middle;">Baja</span>` : '';

            const actionsMarkup = isOnLeave ? `
                <div class="attendance-actions" style="pointer-events: none;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #a0a0a0; background: rgba(128, 128, 128, 0.15); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(160, 160, 160, 0.3); display: inline-flex; align-items: center; gap: 4px;">
                        🚫 Baja Temporal
                    </span>
                </div>
            ` : `
                <div class="attendance-actions">
                    <button class="toggle-btn btn-present" data-id="${musician.id}">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Presente
                    </button>
                    <button class="toggle-btn btn-absent" data-id="${musician.id}">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Ausente
                    </button>
                </div>
            `;
            
            cardDiv.innerHTML = `
                <div class="musician-card-top">
                    <div class="musician-avatar">${avatarMarkup}</div>
                    <div class="musician-details">
                        <span class="musician-name">${musician.name} ${bajaBadgeMarkup}</span>
                        <span class="musician-role">${musician.role || 'Músico de fila'}</span>
                    </div>
                    ${actionsMarkup}
                </div>
                
                <div class="absence-details-container ${isOnLeave || attState.status === 'present' ? 'hidden' : ''} ${attState.status === 'absent' && attState.justified && attState.reason && attState.reason.trim() !== '' ? 'show-summary' : 'show-form'}">
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

            if (!isOnLeave) {
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
                    // Solo actualiza el estado local mientras se escribe, sin guardar en Firestore
                    // en cada tecla: guardar en cada pulsación reactivaba el listener en tiempo
                    // real de "attendance", que vuelve a pintar toda la lista (container.innerHTML
                    // = "") y así destruye y recrea este mismo input, haciéndole perder el foco a
                    // cada letra. El guardado real ocurre al salir del campo (blur) o pulsar Enter.
                    const date = state.currentDate;
                    ensureAttendanceRecord(date, musician.id);
                    state.attendance[date][musician.id].reason = e.target.value;
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
                    // Si el input de motivo tiene el foco (p.ej. el usuario ha escrito algo a
                    // mano y luego pulsa una píldora), el navegador dispara "blur" en el input
                    // ANTES del "click" de la píldora. El handler de blur guardaba entonces lo
                    // que hubiera a medio escribir y cerraba el formulario, así que el motivo
                    // final se quedaba cortado por ese texto parcial y la píldora parecía no
                    // hacer nada (su click llegaba después, sobre un formulario ya cerrado).
                    // Evitamos el blur previniendo el mousedown, para que el input conserve el
                    // foco hasta que el propio click de la píldora decida qué hacer.
                    pill.addEventListener("mousedown", (e) => {
                        e.preventDefault();
                    });
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
            }

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

function toggleVoiceAttendance(musiciansInSection, sectionName, shouldMarkPresent) {
    const date = state.currentDate;
    if (!date) return;
    if (isPastLockBlocked(date)) {
        showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
        return;
    }

    if (!state.attendance[date]) {
        state.attendance[date] = {};
    }

    const updates = {};
    const newStatus = shouldMarkPresent ? "present" : "absent";

    musiciansInSection.forEach(m => {
        if (isMusicianOnLeaveOnDate(m, date)) return; // Excluir de marcar masivo
        state.attendance[date][m.id] = {
            status: newStatus,
            justified: false,
            reason: ""
        };
        updates[m.id] = { status: newStatus, justified: false, reason: "" };
    });

    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("attendance").doc(date).set(updates, { merge: true })
            .catch(err => console.error("Error al actualizar presencia masiva en la nube:", err));
    } else {
        saveStateToLocalStorage();
    }

    updateAttendanceStatsRibbon();
    renderAttendance();
    renderStatistics();

    if (shouldMarkPresent) {
        showToast(`Músicos de ${sectionName || 'la voz'} marcados como presentes`, "success");
    } else {
        showToast(`Músicos de ${sectionName || 'la voz'} desmarcados`, "info");
    }
}

function ensureAttendanceRecord(date, id) {
    if (!state.attendance[date]) {
        state.attendance[date] = {};
    }
    if (!state.sessionTypes[date]) {
        state.sessionTypes[date] = { type: "ensayo", name: "" };
        dbSaveSessionType(date, state.sessionTypes[date]);
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
    if (isPastLockBlocked(date)) {
        showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
        return;
    }
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

function goToPasarLista(dateKey) {
    const rawDate = dateKey.split("_")[0];
    state.currentDate = dateKey;
    if (document.getElementById("attendance-date")) {
        document.getElementById("attendance-date").value = rawDate;
    }
    initializeAttendanceForDate(dateKey);
    document.querySelectorAll(".nav-item").forEach(nav => {
        if (nav.getAttribute("data-target") === "section-pasar-lista") {
            nav.classList.add("active");
        } else {
            nav.classList.remove("active");
        }
    });
    renderActiveSection("section-pasar-lista");
    renderAttendance();
}

function openEditRehearsalModal(dateKey) {
    const sessionInfo = state.sessionTypes ? state.sessionTypes[dateKey] : null;
    if (!sessionInfo) return;

    renderRehearsalLocationOptions();

    const rawDate = dateKey.split("_")[0];
    const keyInput = document.getElementById("rehearsal-editing-key");
    const titleEl = document.getElementById("modal-rehearsal-title");
    const submitBtn = document.getElementById("btn-submit-rehearsal-modal");

    if (keyInput) keyInput.value = dateKey;
    if (titleEl) titleEl.innerText = "Editar Ensayo";
    if (submitBtn) submitBtn.innerText = "Guardar Cambios";

    if (document.getElementById("rehearsal-date-input")) document.getElementById("rehearsal-date-input").value = rawDate;
    if (document.getElementById("rehearsal-type-input")) document.getElementById("rehearsal-type-input").value = sessionInfo.subtype || "general";
    if (document.getElementById("rehearsal-location-input")) document.getElementById("rehearsal-location-input").value = sessionInfo.location || "Parking";
    if (document.getElementById("rehearsal-responsable-input")) document.getElementById("rehearsal-responsable-input").value = sessionInfo.responsable || "";
    updateResponsableQuickButtonsState();
    setTimeInputsFromValue("rehearsal-start-hour-input", "rehearsal-start-min-input", "rehearsal-end-hour-input", "rehearsal-end-min-input", sessionInfo.time || "");

    const modal = document.getElementById("modal-rehearsal");
    if (modal) modal.classList.add("active");
}

// Los responsables se guardan como un único texto separado por comas (p.ej. "Iván, Oscar")
// para poder cubrir el caso habitual (una persona) sin migrar el modelo de datos, y a la vez
// permitir varios responsables en casos puntuales.
function getResponsableNamesFromInput() {
    const input = document.getElementById("rehearsal-responsable-input");
    if (!input) return [];
    return input.value.split(",").map(s => s.trim()).filter(Boolean);
}

function updateResponsableQuickButtonsState() {
    const names = getResponsableNamesFromInput().map(n => n.toLowerCase());
    document.querySelectorAll(".rehearsal-responsable-quick-btn").forEach(btn => {
        const isActive = names.includes(btn.dataset.value.toLowerCase());
        btn.classList.toggle("btn-primary", isActive);
        btn.classList.toggle("btn-secondary", !isActive);
    });
}

function toggleResponsableQuickName(name) {
    const input = document.getElementById("rehearsal-responsable-input");
    if (!input) return;
    const names = getResponsableNamesFromInput();
    const idx = names.findIndex(n => n.toLowerCase() === name.toLowerCase());
    if (idx !== -1) {
        names.splice(idx, 1);
    } else {
        names.push(name);
    }
    input.value = names.join(", ");
    updateResponsableQuickButtonsState();
}

function openEditActuacionModal(dateKey) {
    const sessionInfo = state.sessionTypes ? state.sessionTypes[dateKey] : null;
    if (!sessionInfo) return;

    const rawDate = dateKey.split("_")[0];
    const keyInput = document.getElementById("actuacion-editing-key");
    const titleEl = document.getElementById("modal-actuacion-title");
    const submitBtn = document.getElementById("btn-submit-actuacion-modal");

    if (keyInput) keyInput.value = dateKey;
    if (titleEl) titleEl.innerText = "Editar Actuación";
    if (submitBtn) submitBtn.innerText = "Guardar Cambios";

    if (document.getElementById("actuacion-name-input")) document.getElementById("actuacion-name-input").value = sessionInfo.name || "";
    if (document.getElementById("actuacion-date-input")) document.getElementById("actuacion-date-input").value = rawDate;
    if (document.getElementById("actuacion-location-input")) document.getElementById("actuacion-location-input").value = sessionInfo.location || "";
    if (document.getElementById("actuacion-trip-input")) document.getElementById("actuacion-trip-input").checked = !!sessionInfo.isTrip;

    const modal = document.getElementById("modal-actuacion");
    if (modal) modal.classList.add("active");
}

function updateMusicianJustification(id, isJustified) {
    const date = state.currentDate;
    if (isPastLockBlocked(date)) {
        showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
        const card = document.getElementById(`card-${id}`);
        if (card) {
            const chk = card.querySelector(".chk-justified");
            if (chk) chk.checked = !isJustified;
        }
        return;
    }
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
    if (isPastLockBlocked(date)) {
        showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
        return;
    }
    ensureAttendanceRecord(date, id);
    state.attendance[date][id].reason = reasonText.trim();
    dbSaveAttendance(date, id, state.attendance[date][id]);
}

function updateSectionHeaderRatio(musicianId) {
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;
    
    const sectionName = musician.instrument;
    const sectionDiv = document.getElementById(`section-instrument-${sectionName.replace(/\s+/g, '-')}`);
    if (!sectionDiv) return;
    
    const date = state.currentDate;
    const musiciansInSection = state.musicians.filter(m => m.instrument === sectionName);
    const activeMusicians = musiciansInSection.filter(m => !isMusicianOnLeaveOnDate(m, date));
    
    let presents = 0;
    activeMusicians.forEach(m => {
        if (state.attendance[date] && state.attendance[date][m.id] && state.attendance[date][m.id].status === "present") {
            presents++;
        }
    });
    
    const sectionRatio = activeMusicians.length > 0 ? Math.round((presents / activeMusicians.length) * 100) : 0;
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
        // Excluir músicos en baja temporal en esta fecha de las estadísticas del día
        if (isMusicianOnLeaveOnDate(m, date)) {
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

    const rehearsalsYearSelect = document.getElementById("rehearsals-filter-year");
    populateSeasonSelect(rehearsalsYearSelect, Object.keys(state.attendance), true, rehearsalsYearSelect.value);
    const filterYear = rehearsalsYearSelect.value;
    const filterMonth = document.getElementById("rehearsals-filter-month").value;

    const dates = Object.keys(state.attendance)
        .filter(date => {
            const sessionInfo = state.sessionTypes[date];
            if (sessionInfo && sessionInfo.type !== "ensayo") return false;

            const [yyyy, mm, dd] = date.split('-');

            // Season filter
            if (filterYear !== "all" && !isDateInSeason(date, filterYear)) return false;
            
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
        const dayRecord = state.attendance[date] || {};
        const [yyyy, mm, dd] = date.split('-');
        const monthName = MESES[parseInt(mm) - 1];

        // Check if we need to print a year header row
        if (yyyy !== currentYearStr) {
            currentYearStr = yyyy;
            currentMonthStr = ""; // reset month when year changes
            const yearHeaderTr = document.createElement("tr");
            yearHeaderTr.innerHTML = `
                <td colspan="8" style="background-color: rgba(212, 175, 55, 0.12); font-weight: 800; color: var(--color-gold); font-size: 0.95rem; padding: 10px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 1px; font-family: 'Cinzel', serif;">
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
                <td colspan="8" style="background-color: rgba(255, 255, 255, 0.02); font-weight: 700; color: var(--color-gold); font-size: 0.82rem; padding: 6px 12px; border-bottom: 1px solid var(--border-color); text-transform: uppercase; letter-spacing: 0.5px;">
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
            // Excluir músicos en baja temporal en esta fecha, igual que en el ribbon de Pasar
            // Lista (updateAttendanceStatsRibbon): si no, salen contados como falta sin
            // justificar (tienen un registro "absent"/sin justificar por defecto aunque estén
            // de baja) e inflan tanto el total como el ratio de la tarjeta.
            if (isMusicianOnLeaveOnDate(m, date)) {
                return;
            }
            total++;
            const r = dayRecord ? dayRecord[m.id] : null;
            if (r) {
                if (r.status === "present") {
                    present++;
                } else if (r.justified) {
                    absentJustified++;
                } else {
                    absentUnjustified++;
                }
            } else {
                absentUnjustified++;
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
        
        const rawDate = date.split("_")[0];
        const dNow = new Date();
        const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

        let presentsCellHTML = `<span style="color: var(--color-present); font-weight: 600;">${present}</span> de ${total}`;
        if (!isSessionConcluded(rawDate)) {
            const prev = getSessionPrevision(date);
            let badgeBg = "rgba(46, 204, 113, 0.15)";
            let badgeColor = "#2ecc71";
            let badgeIcon = "🟢";
            if (prev.estimatedPct < 50) {
                badgeBg = "rgba(231, 76, 60, 0.15)";
                badgeColor = "#e74c3c";
                badgeIcon = "⚠️";
            } else if (prev.estimatedPct < 80) {
                badgeBg = "rgba(241, 196, 15, 0.15)";
                badgeColor = "#f1c40f";
                badgeIcon = "🟡";
            }
            presentsCellHTML = `<span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeColor}; font-size: 0.78rem; padding: 2px 8px; border-radius: 10px; font-weight: 600;" title="${prev.preavisoAbsences} preavisos registrados">${badgeIcon} Prev. ${prev.estimatedCount}/${prev.totalConvocated}</span>`;
        }

        const tr = document.createElement("tr");
        tr.classList.add("clickable-row");
        tr.innerHTML = `
            <td style="white-space: nowrap;">
                <strong>${formatDateShortSpanish(date)}</strong>
            </td>
            <td>
                <span>${sessionInfo && sessionInfo.time ? sessionInfo.time : "-"}</span>
            </td>
            <td>
                <span>${locationVal}</span>
            </td>
            <td style="white-space: nowrap;">
                ${typeLabel}
            </td>
            <td>
                ${presentsCellHTML}
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
            openEditRehearsalModal(date);
        });

        tr.querySelector(".delete-rehearsal-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (isPastLockBlocked(date)) {
                showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
                return;
            }
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

function getSessionPrevision(date) {
    const sessionInfo = (state && state.sessionTypes) ? state.sessionTypes[date] : null;
    const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
    const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
    
    let totalConvocated = 0;
    let preavisoAbsences = 0;
    const voicePrevision = {};

    const musiciansList = (state && state.musicians) || [];
    musiciansList.forEach(m => {
        if (isSpecialRehearsal && !convocated.includes(m.instrument)) {
            return;
        }
        // Excluir músicos en baja temporal en esta fecha (mismo criterio que en el resto de
        // cálculos de asistencia): si no, la previsión cuenta de más y el porcentaje estimado
        // sale más bajo de lo real.
        if (isMusicianOnLeaveOnDate(m, date)) {
            return;
        }

        totalConvocated++;
        const voice = m.instrument || "Otros";
        if (!voicePrevision[voice]) {
            voicePrevision[voice] = { total: 0, absent: 0 };
        }
        voicePrevision[voice].total++;

        const dayRecord = state.attendance[date];
        const r = dayRecord ? dayRecord[m.id] : null;
        // Solo cuenta como preaviso de no asistencia si el músico ha realizado un preaviso explícito indicando ausencia (preaviso === true, justificada o con motivo)
        const isExplicitPreavisoFalta = r && r.status === "absent" && (r.preaviso === true || r.isPreaviso === true || r.justified === true || (r.reason && r.reason.trim().length > 0));
        if (isExplicitPreavisoFalta) {
            preavisoAbsences++;
            voicePrevision[voice].absent++;
        }
    });

    const estimatedCount = Math.max(0, totalConvocated - preavisoAbsences);
    const estimatedPct = totalConvocated > 0 ? Math.round((estimatedCount / totalConvocated) * 100) : 100;

    return {
        totalConvocated,
        preavisoAbsences,
        estimatedCount,
        estimatedPct,
        voicePrevision
    };
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
        subtypeText = "Ensayo por Voces";
    }
    const locationVal = sessionInfo && sessionInfo.location ? sessionInfo.location : "Parking";
    const timeVal = sessionInfo && sessionInfo.time ? ` | Hora: ${sessionInfo.time}` : "";
    document.getElementById("rehearsal-detail-subtitle").innerText = `${subtypeText} | Lugar: ${locationVal}${timeVal}`;

    const responsableEl = document.getElementById("rehearsal-detail-responsable");
    if (responsableEl) responsableEl.innerText = (sessionInfo && sessionInfo.responsable) ? sessionInfo.responsable : "Sin asignar";

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
        // Excluir músicos en baja temporal en esta fecha (mismo criterio que
        // updateAttendanceStatsRibbon y renderEnsayosList): de lo contrario cuentan como falta
        // sin justificar porque conservan el registro "absent" por defecto de cuando se creó la
        // sesión, aunque estuvieran de baja.
        if (isMusicianOnLeaveOnDate(m, date)) {
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

    // Previsión de Asistencia
    const prevision = getSessionPrevision(date);
    const estimatedEl = document.getElementById("rehearsal-detail-estimated-count");
    if (estimatedEl) {
        estimatedEl.innerText = `${prevision.estimatedCount}/${prevision.totalConvocated}`;
    }

    const alertBanner = document.getElementById("rehearsal-detail-prevision-alert");
    if (alertBanner) {
        const rawDate = date.split("_")[0];
        const dNow = new Date();
        const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;
        
        if (!isSessionConcluded(rawDate)) {
            alertBanner.classList.remove("hidden");
            if (prevision.estimatedPct < 60) {
                alertBanner.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                alertBanner.style.border = "1px solid rgba(231, 76, 60, 0.4)";
                alertBanner.style.color = "#e74c3c";
                alertBanner.innerHTML = `<span>⚠️ <strong>Previsión Baja (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> Riesgo de alta falta de asistencia (${prevision.preavisoAbsences} preavisos registrados).</span>`;
            } else if (prevision.estimatedPct < 80) {
                alertBanner.style.backgroundColor = "rgba(241, 196, 15, 0.15)";
                alertBanner.style.border = "1px solid rgba(241, 196, 15, 0.4)";
                alertBanner.style.color = "#f1c40f";
                alertBanner.innerHTML = `<span>🟡 <strong>Previsión Aceptable (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> ${prevision.preavisoAbsences} preavisos registrados.</span>`;
            } else {
                alertBanner.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                alertBanner.style.border = "1px solid rgba(46, 204, 113, 0.4)";
                alertBanner.style.color = "#2ecc71";
                alertBanner.innerHTML = `<span>🟢 <strong>Convocatoria Confirmada (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> Alta previsión de asistencia.</span>`;
            }
        } else {
            alertBanner.classList.add("hidden");
        }
    }

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
                const justifText = r.reason || 'Sin justificación';
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

    const actuacionesYearSelect = document.getElementById("actuaciones-filter-year");
    populateSeasonSelect(actuacionesYearSelect, Object.keys(state.attendance), true, actuacionesYearSelect.value);
    const filterYear = actuacionesYearSelect.value;
    const filterMonth = document.getElementById("actuaciones-filter-month").value;

    const dates = Object.keys(state.attendance)
        .filter(date => {
            const sessionInfo = state.sessionTypes[date];
            if (!sessionInfo || sessionInfo.type !== "actuacion") return false;

            const [yyyy, mm, dd] = date.split('-');

            // Season filter
            if (filterYear !== "all" && !isDateInSeason(date, filterYear)) return false;
            
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
        const dayRecord = state.attendance[date] || {};
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
            // Excluir músicos en baja temporal en esta fecha (mismo criterio que en
            // renderEnsayosList y el resto de cálculos de asistencia).
            if (isMusicianOnLeaveOnDate(m, date)) {
                return;
            }
            total++;
            const r = dayRecord ? dayRecord[m.id] : null;
            if (r) {
                if (r.status === "present") {
                    present++;
                } else if (r.justified) {
                    absentJustified++;
                } else {
                    absentUnjustified++;
                }
            } else {
                absentUnjustified++;
            }
        });

        const ratio = total > 0 ? Math.round((present / total) * 100) : 0;

        const rawDate = date.split("_")[0];
        const dNow = new Date();
        const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

        let presentsCellHTML = `<span style="color: var(--color-present); font-weight: 600;">${present}</span> de ${total} músicos`;
        if (!isSessionConcluded(rawDate)) {
            const prev = getSessionPrevision(date);
            let badgeBg = "rgba(46, 204, 113, 0.15)";
            let badgeColor = "#2ecc71";
            let badgeIcon = "🟢";
            if (prev.estimatedPct < 60) {
                badgeBg = "rgba(231, 76, 60, 0.15)";
                badgeColor = "#e74c3c";
                badgeIcon = "⚠️";
            } else if (prev.estimatedPct < 80) {
                badgeBg = "rgba(241, 196, 15, 0.15)";
                badgeColor = "#f1c40f";
                badgeIcon = "🟡";
            }
            presentsCellHTML = `<span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeColor}; font-size: 0.78rem; padding: 2px 8px; border-radius: 10px; font-weight: 600;" title="${prev.preavisoAbsences} preavisos registrados">${badgeIcon} Prev. ${prev.estimatedCount}/${prev.totalConvocated}</span>`;
        }

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
                ${presentsCellHTML}
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
            openEditActuacionModal(date);
        });

        tr.querySelector(".delete-actuacion-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (isPastLockBlocked(date)) {
                showToast("Bloqueo de pasado, no se pueden modificar eventos pasados.", "warning");
                return;
            }
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

    const actuacionName = sessionInfo ? (sessionInfo.name || "Actuación") : "Actuación";

    // Title & subtitle
    document.getElementById("actuacion-detail-title").innerText = actuacionName;
    document.getElementById("actuacion-detail-subtitle").innerText = formatDateSpanish(date);

    // Repertorio
    renderActuacionDetailRepertoire(date);

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
        // Excluir músicos en baja temporal en esta fecha (mismo criterio que en
        // openRehearsalDetailModal y el resto de cálculos de asistencia).
        if (isMusicianOnLeaveOnDate(m, date)) {
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
    document.getElementById("actuacion-detail-present-count").innerText = presentCount;
    document.getElementById("badge-actuacion-detail-presentes-count").innerText = presentCount;

    document.getElementById("actuacion-detail-justified-count").innerText = justifiedCount;
    document.getElementById("badge-actuacion-detail-justificados-count").innerText = justifiedCount;

    document.getElementById("actuacion-detail-absent-count").innerText = absentCount;
    document.getElementById("badge-actuacion-detail-sinjustificar-count").innerText = absentCount;

    document.getElementById("actuacion-detail-ratio").innerText = `${ratio}%`;

    // Previsión de Asistencia
    const prevision = getSessionPrevision(date);
    const estimatedEl = document.getElementById("actuacion-detail-estimated-count");
    if (estimatedEl) {
        estimatedEl.innerText = `${prevision.estimatedCount}/${prevision.totalConvocated}`;
    }

    const alertBanner = document.getElementById("actuacion-detail-prevision-alert");
    if (alertBanner) {
        const rawDate = date.split("_")[0];
        const dNow = new Date();
        const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

        if (!isSessionConcluded(rawDate)) {
            alertBanner.classList.remove("hidden");
            if (prevision.estimatedPct < 60) {
                alertBanner.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                alertBanner.style.border = "1px solid rgba(231, 76, 60, 0.4)";
                alertBanner.style.color = "#e74c3c";
                alertBanner.innerHTML = `<span>⚠️ <strong>Previsión Baja (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> Riesgo de alta falta de asistencia (${prevision.preavisoAbsences} preavisos registrados).</span>`;
            } else if (prevision.estimatedPct < 80) {
                alertBanner.style.backgroundColor = "rgba(241, 196, 15, 0.15)";
                alertBanner.style.border = "1px solid rgba(241, 196, 15, 0.4)";
                alertBanner.style.color = "#f1c40f";
                alertBanner.innerHTML = `<span>🟡 <strong>Previsión Aceptable (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> ${prevision.preavisoAbsences} preavisos registrados.</span>`;
            } else {
                alertBanner.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                alertBanner.style.border = "1px solid rgba(46, 204, 113, 0.4)";
                alertBanner.style.color = "#2ecc71";
                alertBanner.innerHTML = `<span>🟢 <strong>Convocatoria Confirmada (${prevision.estimatedCount}/${prevision.totalConvocated} músicos - ${prevision.estimatedPct}%):</strong> Alta previsión de asistencia.</span>`;
            }
        } else {
            alertBanner.classList.add("hidden");
        }
    }

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

// Actualiza el botón "Repertorio"/"Añadir repertorio" del modal de detalle de la actuación
// según haya o no contenido. No se listan las marchas individualmente: para consultarlas
// hay que abrir el panel de repertorio pulsando el botón.
function renderActuacionDetailRepertoire(date) {
    const repertoireIds = (state && state.actuacionRepertoire && state.actuacionRepertoire[date]) || [];

    const btn = document.getElementById("btn-open-actuacion-repertoire");
    const btnLabel = document.getElementById("btn-open-actuacion-repertoire-label");
    if (btn && btnLabel) {
        const hasRepertoire = repertoireIds.length > 0;
        btnLabel.innerText = hasRepertoire ? "Repertorio" : "Añadir repertorio";
        btn.style.background = hasRepertoire ? "rgba(212, 175, 55, 0.1)" : "rgba(255, 255, 255, 0.04)";
        btn.style.borderColor = hasRepertoire ? "rgba(212, 175, 55, 0.3)" : "var(--border-color)";
        btn.style.color = hasRepertoire ? "var(--color-gold)" : "var(--text-muted)";
    }
}

// ==========================================================================
// PANEL: REPERTORIO ORDENADO DE UNA ACTUACIÓN (setlist con arrastrar y soltar)
// ==========================================================================
let currentRepertoireDate = null;

function openActuacionRepertoireModal(date) {
    if (!date) return;
    currentRepertoireDate = date;

    const sessionInfo = (state && state.sessionTypes) ? state.sessionTypes[date] : null;
    const actuacionName = sessionInfo ? (sessionInfo.name || "Actuación") : "Actuación";
    document.getElementById("actuacion-repertoire-subtitle").innerText = `${actuacionName} — ${formatDateSpanish(date)}`;

    const searchInput = document.getElementById("actuacion-repertoire-search");
    if (searchInput) searchInput.value = "";

    renderActuacionRepertoireModal();
    document.getElementById("modal-actuacion-repertoire").classList.add("active");
}

function closeActuacionRepertoireModal() {
    document.getElementById("modal-actuacion-repertoire").classList.remove("active");
    if (currentRepertoireDate) {
        renderActuacionDetailRepertoire(currentRepertoireDate);
    }
    currentRepertoireDate = null;
}

function renderActuacionRepertoireModal() {
    if (!currentRepertoireDate) return;
    renderActuacionRepertoireSearchList();
    renderActuacionRepertoireOrderedList();
}

function getActuacionRepertoireList() {
    if (!currentRepertoireDate) return [];
    if (!state.actuacionRepertoire) state.actuacionRepertoire = {};
    if (!state.actuacionRepertoire[currentRepertoireDate]) state.actuacionRepertoire[currentRepertoireDate] = [];
    return state.actuacionRepertoire[currentRepertoireDate];
}

function saveActuacionRepertoireList() {
    if (!currentRepertoireDate) return;
    dbSaveActuacionRepertoire(currentRepertoireDate, getActuacionRepertoireList());
}

function renderActuacionRepertoireSearchList() {
    const container = document.getElementById("actuacion-repertoire-search-list");
    if (!container) return;

    const searchInput = document.getElementById("actuacion-repertoire-search");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const currentList = getActuacionRepertoireList();

    const available = (state.marchas || [])
        .filter(m => !currentList.includes(m.id))
        .filter(m => !query || m.title.toLowerCase().includes(query))
        .sort((a, b) => a.title.localeCompare(b.title, 'es'));

    container.innerHTML = "";
    if (available.length === 0) {
        const msg = (state.marchas || []).length === 0
            ? "No hay marchas en el repertorio de la banda."
            : "No quedan marchas que coincidan con la búsqueda.";
        container.innerHTML = `<p class="text-muted" style="font-size: 0.82rem; padding: 8px 0;">${msg}</p>`;
        return;
    }

    available.forEach(m => {
        const card = document.createElement("div");
        card.setAttribute("draggable", "true");
        card.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 4px; padding: 3px 6px; border-radius: 4px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); cursor: grab; font-size: 0.72rem; line-height: 1.2; color: var(--text-primary); transition: opacity 0.15s;";
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 4px; min-width: 0; flex: 1;">
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;">${escapeHtml(m.title)}</span>
            </div>
            <button type="button" title="Añadir al repertorio" style="flex-shrink: 0; background: none; border: none; cursor: pointer; color: var(--color-gold); display: inline-flex; align-items: center; justify-content: center; padding: 1px;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
        `;

        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", m.id);
            e.dataTransfer.setData("source-type", "search");
            card.style.opacity = "0.5";
        });
        card.addEventListener("dragend", () => { card.style.opacity = "1"; });

        card.querySelector("button").addEventListener("click", () => {
            addMarchaToActuacionRepertoire(m.id);
        });

        container.appendChild(card);
    });
}

// Construye una fila compacta y arrastrable de la lista ordenada del repertorio.
function buildRepertoireOrderRow(mId, idx, marchasArray) {
    const m = marchasArray.find(item => item.id === mId);
    const mTitle = m ? m.title : `Marcha (${mId})`;

    let statusCircle = "";
    let diffBadge = "";
    if (m) {
        let statusTitle = "Por trabajar";
        let circleSymbol = "🔴";
        if (m.status === "green") { circleSymbol = "🟢"; statusTitle = "Bien trabajada"; }
        else if (m.status === "yellow") { circleSymbol = "🟡"; statusTitle = "En proceso"; }
        statusCircle = `<span title="${statusTitle}" style="font-size: 0.65rem; line-height: 1; flex-shrink: 0;">${circleSymbol}</span>`;

        const diffNum = m.difficulty || 1;
        diffBadge = `<span style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.6rem; font-weight: 600; padding: 1px 3px; border-radius: 3px; line-height: 1; flex-shrink: 0;">N${diffNum}</span>`;
    }

    const row = document.createElement("div");
    row.setAttribute("draggable", "true");
    row.style.cssText = "display: flex; align-items: center; gap: 4px; padding: 3px 6px; border-radius: 4px; background: rgba(212, 175, 55, 0.06); border: 1px solid rgba(212, 175, 55, 0.2); cursor: grab; font-size: 0.72rem; line-height: 1.2; color: var(--text-primary);";
    row.innerHTML = `
        <span style="flex-shrink: 0; width: 15px; height: 15px; border-radius: 50%; background: var(--color-gold); color: #1a1a1a; font-weight: 700; font-size: 0.6rem; display: flex; align-items: center; justify-content: center;">${idx + 1}</span>
        <span style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-right: 4px;">${escapeHtml(mTitle)}</span>
        <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0; margin-left: auto;">
            ${statusCircle}
            ${diffBadge}
        </div>
        <button type="button" title="Quitar del repertorio" style="flex-shrink: 0; background: none; border: none; cursor: pointer; color: var(--color-absent); display: inline-flex; align-items: center; justify-content: center; padding: 1px;">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    `;

    row.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", mId);
        e.dataTransfer.setData("source-type", "list");
        e.dataTransfer.setData("source-index", String(idx));
        row.style.opacity = "0.5";
    });
    row.addEventListener("dragend", () => { row.style.opacity = "1"; });

    row.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = row.getBoundingClientRect();
        const isAbove = (e.clientY - rect.top) < rect.height / 2;
        row.style.borderTop = isAbove ? "2px solid var(--color-gold)" : "1px solid rgba(212, 175, 55, 0.2)";
        row.style.borderBottom = !isAbove ? "2px solid var(--color-gold)" : "1px solid rgba(212, 175, 55, 0.2)";
    });
    row.addEventListener("dragleave", () => {
        row.style.borderTop = "1px solid rgba(212, 175, 55, 0.2)";
        row.style.borderBottom = "1px solid rgba(212, 175, 55, 0.2)";
    });
    row.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = row.getBoundingClientRect();
        const isAbove = (e.clientY - rect.top) < rect.height / 2;
        handleActuacionRepertoireDrop(e, isAbove ? idx : idx + 1);
    });

    row.querySelector("button").addEventListener("click", () => {
        removeMarchaFromActuacionRepertoire(idx);
    });

    return row;
}

// Reparte la lista ordenada en dos columnas visuales (col1 = primera mitad, col2 = segunda
// mitad) que comparten un único scroll vertical, para que quepan repertorios largos (~35
// marchas) sin que las tarjetas necesiten ser gigantes.
function renderActuacionRepertoireOrderedList() {
    const col1 = document.getElementById("actuacion-repertoire-ordered-list-col1");
    const col2 = document.getElementById("actuacion-repertoire-ordered-list-col2");
    if (!col1 || !col2) return;

    const list = getActuacionRepertoireList();
    const marchasArray = (state && state.marchas) || [];

    col1.innerHTML = "";
    col2.innerHTML = "";

    if (list.length === 0) {
        col1.innerHTML = `<p class="text-muted" style="font-size: 0.78rem; padding: 6px 0; text-align: center;">Arrastra marchas aquí, o pulsa "+" en el banco de marchas.</p>`;
        return;
    }

    const half = Math.ceil(list.length / 2);
    list.forEach((mId, idx) => {
        const row = buildRepertoireOrderRow(mId, idx, marchasArray);
        (idx < half ? col1 : col2).appendChild(row);
    });
}

function handleActuacionRepertoireDrop(e, targetIndex) {
    const marchaId = e.dataTransfer.getData("text/plain");
    const sourceType = e.dataTransfer.getData("source-type");
    if (!marchaId) return;

    const list = getActuacionRepertoireList();

    if (sourceType === "list") {
        const sourceIndex = parseInt(e.dataTransfer.getData("source-index"), 10);
        if (isNaN(sourceIndex)) return;
        let insertAt = targetIndex;
        list.splice(sourceIndex, 1);
        if (sourceIndex < insertAt) insertAt--;
        list.splice(insertAt, 0, marchaId);
    } else {
        if (list.includes(marchaId)) return;
        const insertAt = Math.min(targetIndex, list.length);
        list.splice(insertAt, 0, marchaId);
    }

    saveActuacionRepertoireList();
    renderActuacionRepertoireModal();
}

function addMarchaToActuacionRepertoire(marchaId) {
    const list = getActuacionRepertoireList();
    if (list.includes(marchaId)) return;
    list.push(marchaId);
    saveActuacionRepertoireList();
    renderActuacionRepertoireModal();
}

function removeMarchaFromActuacionRepertoire(index) {
    const list = getActuacionRepertoireList();
    list.splice(index, 1);
    saveActuacionRepertoireList();
    renderActuacionRepertoireModal();
}

function setupActuacionRepertoireModalEvents() {
    const closeModal = () => closeActuacionRepertoireModal();

    const btnClose = document.getElementById("btn-close-actuacion-repertoire");
    const btnCloseFooter = document.getElementById("btn-close-actuacion-repertoire-footer");
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

    const btnOpen = document.getElementById("btn-open-actuacion-repertoire");
    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            if (state.activeDetailDate) openActuacionRepertoireModal(state.activeDetailDate);
        });
    }

    const searchInput = document.getElementById("actuacion-repertoire-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => renderActuacionRepertoireSearchList());
    }

    // Drop en zona vacía de la columna 1 = insertar al final de la primera mitad;
    // drop en zona vacía de la columna 2 = insertar al final absoluto de la lista.
    const orderedCol1 = document.getElementById("actuacion-repertoire-ordered-list-col1");
    if (orderedCol1) {
        orderedCol1.addEventListener("dragover", (e) => { e.preventDefault(); });
        orderedCol1.addEventListener("drop", (e) => {
            e.preventDefault();
            const list = getActuacionRepertoireList();
            handleActuacionRepertoireDrop(e, Math.ceil(list.length / 2));
        });
    }

    const orderedCol2 = document.getElementById("actuacion-repertoire-ordered-list-col2");
    if (orderedCol2) {
        orderedCol2.addEventListener("dragover", (e) => { e.preventDefault(); });
        orderedCol2.addEventListener("drop", (e) => {
            e.preventDefault();
            handleActuacionRepertoireDrop(e, getActuacionRepertoireList().length);
        });
    }
}

function formatRoleShort(role) {
    if (!role) return "Músico";
    let r = role.trim();
    if (r === "Ayud. Dirección" || r === "Ayudante Dirección" || r === "Ayudante de Dirección" || r === "A.Dirección") return "A.Dirección";
    if (r === "Responsable Voz" || r === "Responsable de voz" || r === "Responsable de Voz" || r === "Resp. Voz" || r === "Resp. Voz de sección") return "Resp. Voz";
    if (r === "Músico de fila" || r === "Músico de Fila") return "Músico";
    return r;
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
                                <th class="col-name">Nombre</th>
                                <th class="col-role">Rol</th>
                                <th class="col-pin">Pin</th>
                                <th class="col-actions">Acciones</th>
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
            const initials = getInitials(musician.name);
            const avatarMarkup = musician.photo
                ? `<img src="${musician.photo}" alt="${musician.name}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; display: block; border: 1.5px solid var(--color-gold); box-shadow: 0 0 6px rgba(212, 175, 55, 0.25);">`
                : `<div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(212, 175, 55, 0.15); color: var(--color-gold); border: 1px solid rgba(212, 175, 55, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; flex-shrink: 0;">${initials}</div>`;

            const tr = document.createElement("tr");
            tr.classList.add("plantilla-musician-row");
            if (musician.isBaja) {
                tr.classList.add("is-baja-row");
                tr.style.cssText = "background: rgba(128, 128, 128, 0.08); opacity: 0.65; filter: grayscale(0.85);";
            }

            const bajaBadgeMarkup = musician.isBaja
                ? `<span style="font-size: 0.68rem; background: rgba(128, 128, 128, 0.25); color: #a0a0a0; padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(160, 160, 160, 0.4); font-weight: 700; text-transform: uppercase; margin-left: 6px; flex-shrink: 0;">Baja</span>`
                : '';

            tr.innerHTML = `
                <td class="col-name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
                        <div class="musician-avatar-clickable" data-id="${musician.id}" style="cursor: pointer; flex-shrink: 0; transition: transform 0.2s ease;" title="Ver foto en grande">
                            ${avatarMarkup}
                        </div>
                        <div class="musician-name-clickable" style="font-weight: 600; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; min-width: 0; display: inline-flex; align-items: center;" title="${musician.name}">${musician.name} ${bajaBadgeMarkup}</div>
                    </div>
                </td>
                <td class="col-role" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 0;">
                    <span class="text-muted" title="${musician.role || 'Músico'}" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: block; max-width: 100%;">${formatRoleShort(musician.role)}</span>
                </td>
                <td class="col-pin">
                    <div style="display: inline-flex; align-items: center; justify-content: center; vertical-align: middle;">
                        ${musician.pin ? `
                            <button class="btn-reset-pin-row-padlock" data-id="${musician.id}" title="${musician.pinLocked ? 'PIN BLOQUEADO por demasiados intentos fallidos. Pulsa para desbloquear/restablecer' : 'PIN configurado. Pulsa para borrar/restablecer PIN'}">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lock-svg" style="color: ${musician.pinLocked ? 'var(--color-absent)' : 'var(--text-muted)'}; display: block;">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </button>
                        ` : `
                            <div style="padding: 4px; display: inline-flex; align-items: center; justify-content: center; opacity: 0.45;" title="Sin PIN (Auto-registro activo)">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); display: block;">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                                </svg>
                            </div>
                        `}
                    </div>
                </td>
                <td class="col-actions">
                    <div style="display: inline-flex; gap: 6px; justify-content: center; align-items: center; vertical-align: middle;">
                        <button class="btn-action edit-musician-btn" data-id="${musician.id}" title="Editar">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-musician-btn" data-id="${musician.id}" title="Eliminar">
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            `;

            tr.addEventListener("click", () => {
                openMusicianDetailStats(musician.id);
            });

            tr.querySelector(".musician-avatar-clickable").addEventListener("click", (e) => {
                e.stopPropagation();
                openPhotoPreviewModal(musician.id);
            });

            tr.querySelector(".musician-name-clickable").addEventListener("click", (e) => {
                e.stopPropagation();
                openMusicianDetailStats(musician.id);
            });

            tr.querySelector(".edit-musician-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                openEditMusicianModal(musician.id);
            });

            tr.querySelector(".delete-musician-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                deleteMusician(musician.id);
            });

            const resetPinBtn = tr.querySelector(".btn-reset-pin-row-padlock");
            if (resetPinBtn) {
                resetPinBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (confirm(`¿Estás seguro de que quieres restablecer el PIN de ${musician.name}? Volverá a registrarse con el siguiente PIN que introduzca.`)) {
                        musician.pin = "";
                        musician.pinFailedAttempts = 0;
                        musician.pinLocked = false;
                        saveStateToLocalStorage();

                        if (isCloudActive()) {
                            const db = firebase.firestore();
                            db.collection("musicians").doc(musician.id).update({ pin: "", pinFailedAttempts: 0, pinLocked: false })
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

function openPhotoPreviewModal(musicianId) {
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    const modal = document.getElementById("modal-photo-preview");
    if (!modal) return;

    document.getElementById("photo-preview-name").innerText = musician.name;
    document.getElementById("photo-preview-instrument").innerText = `${musician.instrument} • ${musician.role || "Músico"}`;

    const imgEl = document.getElementById("photo-preview-img");
    const initialsEl = document.getElementById("photo-preview-initials");

    if (musician.photo) {
        imgEl.src = musician.photo;
        imgEl.classList.remove("hidden");
        initialsEl.classList.add("hidden");
    } else {
        imgEl.classList.add("hidden");
        initialsEl.innerText = getInitials(musician.name);
        initialsEl.classList.remove("hidden");
    }

    const currentMusId = getAuthMusicianId();
    const btnEditModal = document.getElementById("btn-edit-photo-modal");
    if (btnEditModal) {
        if (currentMusId && String(currentMusId) === String(musicianId)) {
            btnEditModal.classList.remove("hidden");
        } else {
            btnEditModal.classList.add("hidden");
        }
    }

    modal.classList.add("active");
}

// Lanza una pequeña ráfaga de corazones flotantes desde el punto de clic, dentro de "container"
// (que debe tener position: relative/absolute). Cada corazón se autodestruye al terminar su animación.
function spawnFloatingHearts(container, clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const originX = clientX - rect.left;
    const originY = clientY - rect.top;

    const count = 4;
    for (let i = 0; i < count; i++) {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = "❤️";
        heart.style.left = `${originX}px`;
        heart.style.top = `${originY}px`;
        heart.style.setProperty("--heart-dx", `${Math.round((Math.random() - 0.5) * 60)}px`);
        heart.style.setProperty("--heart-rot", `${Math.round((Math.random() - 0.5) * 40)}deg`);
        heart.style.fontSize = `${(1.05 + Math.random() * 0.7).toFixed(2)}rem`;
        heart.style.animationDelay = `${i * 60}ms`;

        heart.addEventListener("animationend", () => heart.remove());
        // Red de seguridad por si "animationend" no llega a disparar (p.ej. reduced motion)
        setTimeout(() => heart.remove(), 1200);

        container.appendChild(heart);
    }
}

function openPeerDetailModal(musicianId) {
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    const modal = document.getElementById("modal-peer-detail");
    if (!modal) return;

    document.getElementById("peer-detail-name").innerText = musician.name;
    document.getElementById("peer-detail-instrument").innerText = `${musician.instrument} • ${musician.role || "Músico"}`;

    const avatarLettersEl = document.getElementById("peer-detail-avatar-letters");
    const avatarImgEl = document.getElementById("peer-detail-avatar-img");
    const avatarWrapperEl = document.getElementById("peer-detail-avatar");
    if (avatarWrapperEl) {
        avatarWrapperEl.onclick = () => openPhotoPreviewModal(musicianId);
    }
    if (musician.photo) {
        avatarImgEl.src = musician.photo;
        avatarImgEl.classList.remove("hidden");
        avatarLettersEl.classList.add("hidden");
    } else {
        avatarImgEl.classList.add("hidden");
        avatarLettersEl.innerText = getInitials(musician.name);
        avatarLettersEl.classList.remove("hidden");
    }

    const currentStreak = calculateMusicianStreak(musicianId);
    document.getElementById("peer-detail-streak").innerText = currentStreak;

    const medalsData = getMusicianMedalsData(musicianId);
    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);
    const unlockedInsigniasCount = hasVolverEnsayar ? 0 : medalsData.reduce((acc, m) => {
        if (!m.unlocked || m.isNegative) return acc;
        return acc + (m.stars || 1);
    }, 0);
    document.getElementById("peer-detail-badges").innerText = unlockedInsigniasCount;

    const metrics = getMusicianAttendanceMetrics(musicianId);
    const attendancePct = metrics.attendancePct;

    let strokeColor = "#2ECC71"; // verde
    if (attendancePct < 50) {
        strokeColor = "#E74C3C"; // rojo
    } else if (attendancePct < 80) {
        strokeColor = "#F1C40F"; // amarillo
    }

    const percentageText = document.getElementById("peer-detail-percentage-text");
    if (percentageText) percentageText.textContent = `${Math.round(attendancePct)}%`;

    const progressPath = document.getElementById("peer-detail-progress-path");
    if (progressPath) {
        progressPath.setAttribute("stroke-dasharray", `${Math.round(attendancePct)}, 100`);
        progressPath.style.setProperty("stroke", strokeColor, "important");
    }

    const progressCircle = document.getElementById("peer-detail-progress-circle");
    if (progressCircle) {
        const svgEl = progressCircle.querySelector(".circular-chart");
        if (svgEl) {
            svgEl.classList.remove("gold", "red", "yellow", "green");
            if (attendancePct < 50) {
                svgEl.classList.add("red");
            } else if (attendancePct < 80) {
                svgEl.classList.add("yellow");
            } else {
                svgEl.classList.add("green");
            }
        }
    }

    modal.classList.add("active");
}

function openEditMusicianModal(id) {
    const m = state.musicians.find(mus => mus.id === id);
    if (!m) return;

    document.getElementById("musician-id").value = m.id;
    document.getElementById("musician-name").value = m.name;
    document.getElementById("musician-fullname").value = m.fullName || "";
    document.getElementById("musician-instrument").value = m.instrument;
    const roleVal = formatRoleShort(m.role);
    const roleSelect = document.getElementById("musician-role");
    const hasOption = Array.from(roleSelect.options).some(opt => opt.value === roleVal);
    roleSelect.value = hasOption ? roleVal : "Músico";
    
    const checkBaja = document.getElementById("musician-is-baja");
    if (checkBaja) {
        checkBaja.checked = !!m.isBaja;
    }
    
    document.getElementById("modal-title").innerText = "Editar Músico";
    document.getElementById("modal-musician").classList.add("active");
}

function deleteMusician(id) {
    if (state.pastLockEnabled) {
        showToast("Bloqueo de pasado activado, no se pueden eliminar músicos de la plantilla.", "warning");
        return;
    }
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
    // Los datos de asistencia/músicos no cambian dentro de un mismo render; forzamos un
    // recálculo fresco aquí y dejamos que el resto de funciones auxiliares (ranking,
    // insignias, racha...) reutilicen la caché durante esta pasada.
    invalidateMusicianStatsCache();
    cleanupOrphanedMarchasRecords();

    const allDates = Array.from(new Set([
        ...Object.keys(state.sessionTypes || {}),
        ...Object.keys(state.attendance || {})
    ]));

    const yearSelectEl = document.getElementById("filter-year");
    populateSeasonSelect(yearSelectEl, allDates, true, yearSelectEl.value);
    const yearFilter = yearSelectEl.value;
    const monthFilter = document.getElementById("filter-month").value;
    const typeFilter = document.getElementById("filter-type").value;

    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const filteredDates = allDates.filter(dateStr => {
        if (!isSessionConcluded(dateStr)) return false; // Excluir sesiones no concluidas de las estadísticas

        // dateStr puede llevar sufijo (sesiones múltiples/especiales el mismo día): quitarlo antes
        // de parsear la fecha, si no new Date(...) da Invalid Date y el mes sale NaN.
        const dateObj = new Date(dateStr.split("_")[0].replace(/-/g, "/"));
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || isDateInSeason(dateStr.split("_")[0], yearFilter);
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
        renderStatsMarchasActuacion([]);
        renderStatsStreaks([]);
        renderStatsRanking([]);
        renderStatsMarchasOlvidadas();
        renderGeneralOverviewChart();
        renderDayHeatmap([]);
        renderStatsEnsayos([]);
        renderStatsDireccion([]);
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
        const dayRecord = state.attendance[date] || {};
        
        state.musicians.forEach(m => {
            // De baja ese día: no cuenta ni a favor ni en contra, ni en las estadísticas
            // individuales de este músico ni en las globales de la banda. Antes este chequeo
            // estaba después de sumar a musicianStats[m.id], así que solo protegía los totales
            // globales — los propios días de baja de un músico sí contaban como falta en su
            // ficha/ranking individual, dando un número distinto al del resto de la app.
            if (isMusicianOnLeaveOnDate(m, date)) return;

            const record = dayRecord[m.id];
            if (!record) return;

            musicianStats[m.id].total++;

            if (record.status === "present") {
                // Contado en individual
            } else {
                musicianStats[m.id].absent++;
                if (!record.justified) {
                    musicianStats[m.id].unjustified++;
                }
                if (record.reason) {
                    musicianStats[m.id].lastReason = record.reason;
                }
            }

            totalPresenceCheck++;

            if (record.status === "present") {
                totalPresentsCount++;
                if (sectionStats[m.instrument]) {
                    sectionStats[m.instrument].presents++;
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

    window.lastFilteredDatesForStats = filteredDates;
    renderStatsMarchasTop10(filteredDates);
    renderStatsMarchasActuacion(filteredDates);
    renderStatsStreaks(filteredDates);
    renderStatsRanking(filteredDates);
    renderStatsMarchasOlvidadas();
    renderGeneralOverviewChart();
    renderDayHeatmap(filteredDates);
    renderStatsEnsayos(filteredDates);
    renderStatsDireccion(filteredDates);
}

let showAllMarchasEnsayadas = false;
let showAllMarchasOlvidadas = false;
let showAllMarchasActuacion = false;

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

    const allMarchas = (state.marchas || [])
        .map(m => ({
            ...m,
            count: playCounts[m.id] || 0
        }))
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, 'es'));

    const displayMarchas = showAllMarchasEnsayadas ? allMarchas : allMarchas.slice(0, 5);

    const toggleBtn = document.getElementById("btn-toggle-all-marchas-ensayadas");
    if (toggleBtn) {
        toggleBtn.innerText = showAllMarchasEnsayadas ? "−" : "+";
        toggleBtn.title = showAllMarchasEnsayadas ? "Mostrar Top 5" : `Ver todas las marchas (${allMarchas.length})`;
    }

    const tbody = document.getElementById("stats-marchas-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (displayMarchas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay marchas registradas en los ensayos de este período.
                </td>
            </tr>
        `;
    } else {
        displayMarchas.forEach((m, idx) => {
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

// Cuenta, por marcha, en cuántas actuaciones distintas del período aparece en su repertorio
// ordenado (state.actuacionRepertoire) — no confundir con "playedMarchas" (uso en ensayos).
function renderStatsMarchasActuacion(filteredDates) {
    const playCounts = {};
    if (state.actuacionRepertoire) {
        filteredDates.forEach(date => {
            const sessionInfo = state.sessionTypes[date];
            if (!sessionInfo || sessionInfo.type !== "actuacion") return;
            const list = state.actuacionRepertoire[date] || [];
            new Set(list).forEach(mId => {
                playCounts[mId] = (playCounts[mId] || 0) + 1;
            });
        });
    }

    const allMarchas = (state.marchas || [])
        .map(m => ({ ...m, count: playCounts[m.id] || 0 }))
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, 'es'));

    const displayMarchas = showAllMarchasActuacion ? allMarchas : allMarchas.slice(0, 5);

    const toggleBtn = document.getElementById("btn-toggle-all-marchas-actuacion");
    if (toggleBtn) {
        toggleBtn.innerText = showAllMarchasActuacion ? "−" : "+";
        toggleBtn.title = showAllMarchasActuacion ? "Mostrar Top 5" : `Ver todas las marchas (${allMarchas.length})`;
    }

    const tbody = document.getElementById("stats-marchas-actuacion-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (displayMarchas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay marchas registradas en el repertorio de la banda.
                </td>
            </tr>
        `;
    } else {
        displayMarchas.forEach((m, idx) => {
            let statusLabel = "";
            if (m.status === "green") {
                statusLabel = `<span style="color: var(--color-present); font-weight: 600;">🟢 Bien</span>`;
            } else if (m.status === "yellow") {
                statusLabel = `<span style="color: var(--color-justified); font-weight: 600;">🟡 Proceso</span>`;
            } else {
                statusLabel = `<span style="color: var(--color-absent); font-weight: 600;">🔴 Trabajar</span>`;
            }

            const tr = document.createElement("tr");
            tr.style.cursor = "pointer";
            tr.title = "Ver actuaciones en las que se ha tocado";
            tr.innerHTML = `
                <td><strong>#${idx + 1}</strong></td>
                <td><strong>${escapeHtml(m.title)}</strong></td>
                <td style="font-weight: bold; color: var(--color-gold); font-size: 0.92rem; padding-left: 20px;">${m.count}</td>
                <td><span class="musician-count-badge" style="background-color: var(--bg-primary);">Nivel ${m.difficulty || 1}</span></td>
                <td>${statusLabel}</td>
            `;
            tr.addEventListener("click", () => openMarchaHistoryModal(m.id));
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
            if (!isSessionConcluded(sessionKey)) return; // No contar ensayos que aún no han sucedido
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

    const displayOlvidadas = showAllMarchasOlvidadas ? olvidadas : olvidadas.slice(0, 5);

    const toggleBtn = document.getElementById("btn-toggle-all-marchas-olvidadas");
    if (toggleBtn) {
        toggleBtn.innerText = showAllMarchasOlvidadas ? "−" : "+";
        toggleBtn.title = showAllMarchasOlvidadas ? "Mostrar Top 5" : `Ver todas las marchas (${olvidadas.length})`;
    }

    if (displayOlvidadas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted" style="padding: 20px;">
                    No hay marchas registradas en la aplicación.
                </td>
            </tr>
        `;
        return;
    }

    displayOlvidadas.forEach((m, idx) => {
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
            // De baja ese día: no cuenta ni a favor ni en contra, ni rompe la racha (mismo
            // criterio que computeMusicianStreak, usado en la ficha individual del músico) —
            // si no, este widget puede mostrar una racha distinta a la de su propia ficha.
            if (isMusicianOnLeaveOnDate(m, date)) continue;
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

let showAllRankingAsistencia = false;

function renderStatsRanking(filteredDates) {
    // Idempotente: si ya se invalidó al entrar en renderStatistics() esto es un no-op
    // barato; si se llama de forma aislada (botón "ver todos") garantiza datos frescos.
    invalidateMusicianStatsCache();
    const container = document.getElementById("stats-ranking-container");
    if (!container) return;

    container.innerHTML = "";

    if (!window.statsRankingToggleBound) {
        window.statsRankingToggleBound = true;
        const btnToggle = document.getElementById("btn-toggle-all-ranking-asistencia");
        if (btnToggle) {
            btnToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                showAllRankingAsistencia = !showAllRankingAsistencia;
                btnToggle.innerText = showAllRankingAsistencia ? "-" : "+";
                btnToggle.title = showAllRankingAsistencia ? "Ver solo los 5 primeros" : "Ver todos los componentes";
                renderStatsRanking(window.lastFilteredDatesForStats || []);
            });
        }
    }

    if (!state.musicians || state.musicians.length === 0 || !filteredDates || filteredDates.length === 0) {
        container.innerHTML = "<p class='text-muted text-center' style='padding: 20px;'>No hay datos para calcular el ranking en este período.</p>";
        return;
    }

    // Filtrar y ordenar ensayos (de más reciente a más antiguo) para calcular racha
    const rehearsalDates = filteredDates.filter(date => {
        const session = state.sessionTypes[date];
        return !session || session.type === "ensayo";
    }).sort((a, b) => b.localeCompare(a));

    const rankingData = state.musicians.map(m => {
        const musicianId = m.id;

        // 1. Asistencia en el período filtrado
        const metrics = getMusicianAttendanceMetrics(musicianId, d => filteredDates.includes(d));
        const totalConvocated = metrics.totalConvocated;
        const presentsCount = metrics.attended;
        const attendancePct = metrics.attendancePct;

        // 2. Racha consecutiva de ensayos asistidos en el período
        let streak = 0;
        for (let i = 0; i < rehearsalDates.length; i++) {
            const date = rehearsalDates[i];
            // De baja ese día: no cuenta ni rompe la racha (mismo criterio que
            // computeMusicianStreak/renderStatsStreaks).
            if (isMusicianOnLeaveOnDate(m, date)) continue;
            const dayRecord = state.attendance[date];
            const record = dayRecord ? dayRecord[musicianId] : null;
            if (record && record.status === "present") {
                streak++;
            } else {
                break;
            }
        }

        // 3. Insignias obtenidas
        const medals = getMusicianMedalsData(musicianId);
        const badgesCount = medals.filter(med => med.unlocked && !med.isNegative).reduce((acc, med) => acc + (med.stars || 1), 0);

        return {
            id: m.id,
            name: m.name,
            instrument: m.instrument,
            role: m.role,
            attendancePct,
            streak,
            badgesCount
        };
    });

    // Criterio de ordenación:
    // 1. Mayor porcentaje de asistencia (redondeado a entero)
    // 2. En caso de empate en el %, priorizar el que tenga mayor racha de asistencia
    // 3. En caso de empate en racha, mayor número de insignias
    // 4. Porcentaje decimal exacto
    // 5. Orden alfabético
    rankingData.sort((a, b) => {
        const roundDiff = Math.round(b.attendancePct) - Math.round(a.attendancePct);
        if (roundDiff !== 0) return roundDiff;

        if (b.streak !== a.streak) return b.streak - a.streak;

        if (b.badgesCount !== a.badgesCount) return b.badgesCount - a.badgesCount;

        const exactDiff = b.attendancePct - a.attendancePct;
        if (Math.abs(exactDiff) > 0.0001) return exactDiff;

        return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    });

    const itemsToDisplay = showAllRankingAsistencia ? rankingData : rankingData.slice(0, 5);

    itemsToDisplay.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "comp-ranking-card";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.justifyContent = "space-between";
        card.style.padding = "6px 12px";
        card.style.background = "rgba(0, 0, 0, 0.2)";
        card.style.border = "1px solid var(--border-color)";
        card.style.borderRadius = "8px";
        card.style.gap = "10px";
        card.style.flexWrap = "wrap";

        let rankBadgeClass = "rank-badge";
        if (index === 0) rankBadgeClass += " rank-gold";
        else if (index === 1) rankBadgeClass += " rank-silver";
        else if (index === 2) rankBadgeClass += " rank-bronze";

        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; min-width: 140px; flex: 1; min-width: 0;">
                <div class="${rankBadgeClass}">${index + 1}</div>
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0; flex: 1;">
                    <span style="font-weight: 600; font-size: 0.88rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.name}
                    </span>
                    <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 500; white-space: nowrap; opacity: 0.88;">
                        • ${item.instrument}${item.role ? ` (${item.role})` : ''}
                    </span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 14px; font-size: 0.85rem; font-weight: 600; flex-shrink: 0;">
                <div style="color: var(--color-gold); font-family: 'Cinzel', serif; font-size: 0.95rem;" title="Porcentaje de Asistencia">
                    ${Math.round(item.attendancePct)}%
                </div>
                <div style="display: flex; align-items: center; gap: 4px; color: #ff6a00;" title="Racha de asistencia consecutiva">
                    🔥 <span>${item.streak}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 4px; color: var(--color-gold);" title="Insignias obtenidas">
                    🏅 <span>${item.badgesCount}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

// ==========================================================================
// ESTADÍSTICA DE ENSAYOS (DURACIÓN, GENERALES Y POR VOZ)
// ==========================================================================
function parseRehearsalDurationMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== "string") return 0;
    const parts = timeStr.split(/[-–—]|(?:\sa\s)|(?:\shasta\s)/i);
    if (parts.length >= 2) {
        const parseTime = (s) => {
            if (!s) return null;
            const m = s.match(/(\d{1,2})[\:\s hH]*(\d{2})?/);
            if (!m) return null;
            const h = parseInt(m[1], 10);
            const min = m[2] ? parseInt(m[2], 10) : 0;
            if (isNaN(h) || h > 23 || isNaN(min) || min > 59) return null;
            return h * 60 + min;
        };

        const startMin = parseTime(parts[0]);
        const endMin = parseTime(parts[1]);

        if (startMin !== null && endMin !== null) {
            let diff = endMin - startMin;
            if (diff <= 0) {
                diff += 24 * 60; // Cruzó medianoche
            }
            if (diff > 0 && diff < 12 * 60) {
                return diff;
            }
        }
    }
    return 0;
}

function formatMinutesToHoursStr(totalMinutes) {
    if (!totalMinutes || totalMinutes <= 0) return "0 h";
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (mins === 0) {
        return `${hours} h`;
    }
    if (hours === 0) {
        return `${mins} min`;
    }
    return `${hours} h ${mins} min`;
}

function getSubtypeLabel(subtype, sessionInfo) {
    const sub = (subtype || "").trim().toLowerCase();
    if (!sub || sub === "general" || sub === "ensayo-general" || sub === "ensayo general") {
        return "Ensayo General";
    }
    if (sub === "trompetas1" || sub === "ensayo-trompetas1") return "Ensayo Trompetas 1ª";
    if (sub === "bajos" || sub === "ensayo-bajos") return "Ensayo Bajos";
    if (sub === "trompetas2y3" || sub === "ensayo-trompetas2y3") return "Ensayo Trompetas 2ª y 3ª";
    if (sub === "cornetas" || sub === "ensayo-cornetas") return "Ensayo Cornetas";
    if (sub === "percusion" || sub === "ensayo-percusion") return "Ensayo Percusión";
    if (sub === "primeras" || sub === "ensayo-primeras") return "Ensayo Primeras";

    if (sessionInfo && Array.isArray(sessionInfo.convocatedVoices) && sessionInfo.convocatedVoices.length > 0) {
        return "Ensayo " + sessionInfo.convocatedVoices.join(", ");
    }

    const cleanSub = sub.replace(/^ensayo-?/, "");
    return "Ensayo " + cleanSub.charAt(0).toUpperCase() + cleanSub.slice(1);
}

function calculateRehearsalsStats(datesArray) {
    let totalCount = 0;
    let generalCount = 0;
    let voiceCount = 0;
    let totalMinutes = 0;
    
    const breakdownMap = {};

    (datesArray || []).forEach(dateKey => {
        const sessionInfo = state.sessionTypes ? state.sessionTypes[dateKey] : null;
        const type = sessionInfo ? sessionInfo.type : "ensayo";
        if (type !== "ensayo") return;

        totalCount++;
        const duration = parseRehearsalDurationMinutes(sessionInfo ? sessionInfo.time : "");
        totalMinutes += duration;

        const sub = sessionInfo ? sessionInfo.subtype : "general";
        const label = getSubtypeLabel(sub, sessionInfo);

        const isGen = (label === "Ensayo General");
        if (isGen) {
            generalCount++;
        } else {
            voiceCount++;
        }

        if (!breakdownMap[label]) {
            breakdownMap[label] = {
                label: label,
                count: 0,
                totalMinutes: 0,
                isGeneral: isGen
            };
        }
        breakdownMap[label].count++;
        breakdownMap[label].totalMinutes += duration;
    });

    const breakdownList = Object.values(breakdownMap).sort((a, b) => {
        if (a.isGeneral && !b.isGeneral) return -1;
        if (!a.isGeneral && b.isGeneral) return 1;
        return b.count - a.count || b.totalMinutes - a.totalMinutes;
    }).map(item => {
        const pctOfTotal = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
        return {
            ...item,
            pctOfTotal,
            formattedHours: formatMinutesToHoursStr(item.totalMinutes)
        };
    });

    return {
        totalCount,
        generalCount,
        voiceCount,
        totalMinutes,
        formattedTotalHours: formatMinutesToHoursStr(totalMinutes),
        breakdownList
    };
}

function renderStatsEnsayos(filteredDates) {
    const stats = calculateRehearsalsStats(filteredDates);

    const totalEl = document.getElementById("stats-rehearsals-total-count");
    const generalEl = document.getElementById("stats-rehearsals-general-count");
    const voiceEl = document.getElementById("stats-rehearsals-voice-count");
    const hoursEl = document.getElementById("stats-rehearsals-total-hours");
    const bodyEl = document.getElementById("stats-rehearsals-breakdown-body");

    if (totalEl) totalEl.innerText = stats.totalCount;
    if (generalEl) generalEl.innerText = stats.generalCount;
    if (voiceEl) voiceEl.innerText = stats.voiceCount;
    if (hoursEl) hoursEl.innerText = stats.formattedTotalHours;

    if (bodyEl) {
        if (stats.breakdownList.length === 0) {
            bodyEl.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted" style="padding: 20px;">
                        No hay ensayos registrados en este período.
                    </td>
                </tr>
            `;
        } else {
            let html = "";
            stats.breakdownList.forEach(item => {
                const badgeColor = item.isGeneral ? "var(--color-gold)" : "#3b82f6";
                html += `
                    <tr>
                        <td>
                            <strong style="color: var(--text-primary);">${item.label}</strong>
                        </td>
                        <td style="text-align: center;">
                            <span style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: var(--text-primary); font-weight: 700; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem;">${item.count}</span>
                        </td>
                        <td style="text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
                            ${item.pctOfTotal}%
                        </td>
                        <td style="text-align: right; padding-right: 15px; font-weight: 700; color: ${badgeColor}; font-size: 0.9rem;">
                            ${item.formattedHours}
                        </td>
                    </tr>
                `;
            });
            bodyEl.innerHTML = html;
        }
    }
}

function calculateDireccionStats(datesArray) {
    let totalCount = 0;

    const UNASSIGNED_LABEL = "Sin asignar";
    const responsableMap = {};

    (datesArray || []).forEach(dateKey => {
        const sessionInfo = state.sessionTypes ? state.sessionTypes[dateKey] : null;
        const type = sessionInfo ? sessionInfo.type : "ensayo";
        if (type !== "ensayo") return;

        totalCount++;

        // Un ensayo puede tener varios responsables (casos puntuales), separados por comas;
        // se cuenta una vez para cada uno de ellos.
        const responsableNames = (sessionInfo && sessionInfo.responsable)
            ? sessionInfo.responsable.split(",").map(s => s.trim()).filter(Boolean)
            : [];
        const responsables = responsableNames.length > 0 ? responsableNames : [UNASSIGNED_LABEL];
        const sub = sessionInfo ? sessionInfo.subtype : "general";
        const label = getSubtypeLabel(sub, sessionInfo);

        responsables.forEach(responsable => {
            if (!responsableMap[responsable]) {
                responsableMap[responsable] = {
                    responsable: responsable,
                    count: 0,
                    typeCounts: {}
                };
            }
            responsableMap[responsable].count++;
            responsableMap[responsable].typeCounts[label] = (responsableMap[responsable].typeCounts[label] || 0) + 1;
        });
    });

    const breakdownList = Object.values(responsableMap).sort((a, b) => b.count - a.count).map(item => {
        const pctOfTotal = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
        const typesText = Object.entries(item.typeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([label, count]) => `${label} ×${count}`)
            .join(", ");
        return {
            ...item,
            pctOfTotal,
            typesText
        };
    });

    return {
        totalCount,
        breakdownList
    };
}

function renderStatsDireccion(filteredDates) {
    const stats = calculateDireccionStats(filteredDates);

    const bodyEl = document.getElementById("stats-direccion-breakdown-body");

    if (bodyEl) {
        if (stats.breakdownList.length === 0) {
            bodyEl.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted" style="padding: 20px;">
                        No hay ensayos registrados en este período.
                    </td>
                </tr>
            `;
        } else {
            let html = "";
            stats.breakdownList.forEach(item => {
                const isUnassigned = item.responsable === "Sin asignar";
                const nameColor = isUnassigned ? "var(--text-muted)" : "var(--text-primary)";
                html += `
                    <tr>
                        <td>
                            <strong style="color: ${nameColor};">${item.responsable}</strong>
                        </td>
                        <td style="text-align: center;">
                            <span style="display: inline-block; background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: var(--text-primary); font-weight: 700; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem;">${item.count}</span>
                        </td>
                        <td style="text-align: center; color: var(--text-secondary); font-size: 0.85rem;">
                            ${item.pctOfTotal}%
                        </td>
                        <td style="color: var(--text-secondary); font-size: 0.85rem;">
                            ${item.typesText}
                        </td>
                    </tr>
                `;
            });
            bodyEl.innerHTML = html;
        }
    }

    renderStatsDireccionPieChart(stats.breakdownList, stats.totalCount);
}

const DIRECCION_PIE_PALETTE = ["#D4AF37", "#3b82f6", "#2ecc71", "#e67e22", "#9b59b6", "#1abc9c", "#e84393", "#e74c3c", "#00b894", "#0984e3"];
const DIRECCION_PIE_UNASSIGNED_COLOR = "#8a8a8a";

function renderStatsDireccionPieChart(breakdownList, totalCount) {
    const container = document.getElementById("stats-direccion-piechart-container");
    if (!container) return;

    if (!breakdownList || breakdownList.length === 0 || !totalCount) {
        container.innerHTML = `<p class="text-muted" style="font-size: 0.85rem; padding: 4px 0;">No hay datos suficientes para el gráfico.</p>`;
        return;
    }

    const cx = 90, cy = 90, outerR = 80, innerR = 46;
    let angle = 0;
    let colorIdx = 0;
    let slicesSVG = "";
    let legendHTML = "";

    breakdownList.forEach(item => {
        const isUnassigned = item.responsable === "Sin asignar";
        const color = isUnassigned ? DIRECCION_PIE_UNASSIGNED_COLOR : DIRECCION_PIE_PALETTE[colorIdx % DIRECCION_PIE_PALETTE.length];
        if (!isUnassigned) colorIdx++;

        const span = totalCount > 0 ? (item.count / totalCount) * 360 : 0;
        const trimmed = trimAngleGap(angle, angle + span, 2);
        const path = donutSlicePath(cx, cy, innerR, outerR, trimmed.start, trimmed.end);
        const title = `${item.responsable}: ${item.count} ensayo${item.count === 1 ? "" : "s"} (${item.pctOfTotal}%)`;
        slicesSVG += `<path d="${path}" fill="${color}" stroke="var(--bg-card)" stroke-width="1.5"><title>${title}</title></path>`;

        legendHTML += `
            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem; padding: 3px 0;">
                <span style="width: 10px; height: 10px; border-radius: 3px; background: ${color}; flex-shrink: 0;"></span>
                <span style="color: ${isUnassigned ? "var(--text-muted)" : "var(--text-primary)"}; font-weight: 600;">${item.responsable}</span>
                <span style="color: var(--text-secondary); margin-left: auto; padding-left: 10px; white-space: nowrap;">${item.count} · ${item.pctOfTotal}%</span>
            </div>
        `;
        angle += span;
    });

    container.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
            <svg viewBox="0 0 180 180" width="180" height="180" style="flex-shrink: 0;">
                ${slicesSVG}
                <text x="90" y="86" text-anchor="middle" style="font-size: 20px; font-weight: 700; fill: var(--text-primary); font-family: 'Outfit', sans-serif;">${totalCount}</text>
                <text x="90" y="102" text-anchor="middle" style="font-size: 9px; fill: var(--text-muted); font-family: 'Outfit', sans-serif;">ENSAYOS</text>
            </svg>
            <div style="flex: 1; min-width: 180px;">
                ${legendHTML}
            </div>
        </div>
    `;
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
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    document.getElementById("detail-musician-name").innerText = musician.name;
    document.getElementById("detail-musician-instrument").innerText = musician.fullName
        ? `${musician.fullName} — ${musician.instrument} — ${musician.role}`
        : `${musician.instrument} — ${musician.role}`;

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

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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

    const detailAvatarEl = document.getElementById("detail-musician-avatar");
    if (detailAvatarEl) {
        detailAvatarEl.style.cursor = "pointer";
        detailAvatarEl.title = "Ver foto en grande";
        detailAvatarEl.onclick = () => openPhotoPreviewModal(musicianId);
        if (musician.photo) {
            detailAvatarEl.innerHTML = `<img src="${musician.photo}" alt="${musician.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        } else {
            detailAvatarEl.innerText = getInitials(musician.name);
        }
    }

    const bajaBadgeInHeader = musician.isBaja
        ? `<span class="streak-badge" style="font-size: 0.9rem; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; background: rgba(128, 128, 128, 0.16); color: #a0a0a0; padding: 2px 8px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600; border: 1px solid rgba(160, 160, 160, 0.4);"><span style="font-size: 0.9rem;">🚫</span> Baja</span>`
        : '';

    document.getElementById("detail-musician-name").innerHTML = `${musician.name} <span class="streak-badge" style="font-size: 0.9rem; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; background: rgba(255, 119, 0, 0.16); color: #ff8c1a; padding: 2px 8px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600; border: 1px solid rgba(255, 120, 0, 0.65);"><span style="font-size: 1rem;">🔥</span> ${currentStreak}</span><span class="streak-badge" style="font-size: 0.9rem; margin-left: 8px; display: inline-flex; align-items: center; gap: 4px; background: ${badgeBg}; color: ${badgeColor}; padding: 2px 8px; border-radius: 12px; font-family: 'Outfit', sans-serif; font-weight: 600; border: ${badgeBorder};"><span style="font-size: 1rem;">${badgeIcon}</span> ${detailUnlockedCount}</span>${bajaBadgeInHeader}`;
    document.getElementById("detail-musician-instrument").innerText = musician.fullName
        ? `${musician.fullName} — ${musician.instrument} — ${musician.role || "Músico"}`
        : `${musician.instrument} — ${musician.role || "Músico"}`;

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

    const detailInsigniasBox = document.getElementById("detail-insignias-box");
    if (detailInsigniasBox) {
        detailInsigniasBox.style.opacity = "1";
        detailInsigniasBox.style.filter = "none";
        detailInsigniasBox.style.pointerEvents = "auto";
        if (hasVolverEnsayar) {
            detailInsigniasBox.title = "Las insignias concedidas o asignables figuran como anuladas debido a baja asistencia (Volver... a ensayar activa)";
        } else {
            detailInsigniasBox.title = "";
        }
    }



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

    const detailYearSelect = document.getElementById("detail-filter-year");
    const monthFilter = document.getElementById("detail-filter-month").value;
    const typeFilter = document.getElementById("detail-filter-type").value;

    const d = new Date();
    const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    // Obtener todas las fechas únicas de sessionTypes y attendance
    const allDates = Array.from(new Set([
        ...Object.keys(state.sessionTypes || {}),
        ...Object.keys(state.attendance || {})
    ]));

    populateSeasonSelect(detailYearSelect, allDates, true, detailYearSelect.value);
    const yearFilter = detailYearSelect.value;

    // Filtrar fechas pasadas y aplicables al filtro del modal
    const filteredDates = allDates.filter(dateStr => {
        if (!isSessionConcluded(dateStr)) return false; // Excluir sesiones no concluidas de las estadísticas
        // De baja en esa fecha: no cuenta ni a favor ni en contra de este músico (igual que
        // computeMusicianStreak). Si no, sus propios días de baja le salen como falta en su ficha.
        if (isMusicianOnLeaveOnDate(musician, dateStr)) return false;

        // dateStr puede llevar sufijo (sesiones múltiples/especiales el mismo día): quitarlo antes
        // de parsear la fecha, si no new Date(...) da Invalid Date y el mes sale NaN.
        const dateObj = new Date(dateStr.split("_")[0].replace(/-/g, "/"));
        const month = dateObj.getMonth().toString();
        const yearMatches = yearFilter === "all" || isDateInSeason(dateStr.split("_")[0], yearFilter);
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
        const sessionInfo = state.sessionTypes ? state.sessionTypes[date] : null;
        const sessionObj = sessionInfo || { type: "ensayo", subtype: "general" };

        const isSpecial = sessionObj.type === "ensayo" && sessionObj.subtype && sessionObj.subtype !== "general" && sessionObj.convocatedVoices && sessionObj.convocatedVoices.length > 0;
        if (isSpecial && !sessionObj.convocatedVoices.includes(musician.instrument)) {
            return;
        }

        totalSessions++;
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;

        if (record && record.status === "present") {
            presents++;
        } else {
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

            const isJustified = record && record.justified;
            if (isJustified) {
                absentJustified++;
            } else {
                absentUnjustified++;
            }

            const reason = (record && record.reason) ? record.reason : "Sin especificar";
            reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;

            absenceRecords.push({
                date,
                sessionLabel,
                sessionType: sessionTypeName,
                justified: isJustified,
                reason
            });
        }
    });

    const totalAbsent = absentJustified + absentUnjustified;
    const pct = totalSessions > 0 ? Math.round((presents / totalSessions) * 100) : 100;

    // Tarjetas resumen
    const pctEl = document.getElementById("detail-attendance-pct");
    pctEl.innerText = `${pct}%`;
    if (pct < 50) {
        pctEl.style.setProperty("color", "#E74C3C", "important");
    } else if (pct < 80) {
        pctEl.style.setProperty("color", "#F1C40F", "important");
    } else {
        pctEl.style.setProperty("color", "#2ECC71", "important");
    }

    document.getElementById("detail-total-sessions").innerText = totalSessions;
    document.getElementById("detail-total-attended").innerText = presents;
    document.getElementById("detail-total-absences").innerText = absentUnjustified;
    document.getElementById("detail-total-justified").innerText = absentJustified;

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
                ids: ["asistencia", "comprometido", "veterano", "racha", "god", "titular", "top", "capitan", "volver_ensayar"]
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
                    if (hasVolverEnsayar && medal.unlocked && !medal.isNegative) {
                        cardClass += ` annulled-medal`;
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

                    const descHTML = (hasVolverEnsayar && medal.unlocked && !medal.isNegative)
                        ? `<div style="font-size: 0.72rem; color: var(--color-absent); font-weight: 700;">Anulada</div>`
                        : `<div style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${medal.desc}">${medal.desc}</div>`;

                    return `
                        <div class="medal-card ${cardClass}" style="padding: 10px; display: flex; align-items: center; gap: 8px; font-size: 0.82rem; border-radius: 6px;">
                            <div class="medal-icon-wrapper" style="position: relative; width: 32px; height: 32px; font-size: 1.1rem; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                                ${medal.icon}
                                ${starsHTML}
                            </div>
                            <div style="flex: 1; min-width: 0; text-align: left;">
                                <div style="font-weight: 700; color: #FFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${medal.title}">${medal.title}</div>
                                ${descHTML}
                            </div>
                        </div>
                    `;
                }).join("")}
            `;
        }).join("");
    }

    renderMusicianMonthlyEvolution(musicianId);
    renderMusicianLeavesSection(musician);
}

function renderMusicianLeavesSection(musician) {
    const container = document.getElementById("detail-musician-leaves-container");
    if (!container) return;

    container.innerHTML = "";

    const leaves = musician.leaves || [];
    if (leaves.length === 0) {
        container.innerHTML = `<p class="text-muted" style="margin: 0; font-size: 0.85rem; font-style: italic;">Sin períodos de baja registrados.</p>`;
        return;
    }

    const sortedLeaves = [...leaves].sort((a, b) => (b.startDate || "").localeCompare(a.startDate || ""));
    const isAdmin = getAuthRole() === "admin";

    const listHtml = sortedLeaves.map(leave => {
        const startFormatted = formatDateCompactSpanish(leave.startDate);
        const endFormatted = leave.endDate ? formatDateCompactSpanish(leave.endDate) : "Actualidad (En baja)";
        const isActive = !leave.endDate;

        const badgeStyle = isActive
            ? "background: rgba(231, 76, 60, 0.15); color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.3);"
            : "background: rgba(128, 128, 128, 0.15); color: #a0a0a0; border: 1px solid rgba(160, 160, 160, 0.3);";

        const deleteBtnHtml = isAdmin ? `
            <button type="button" class="btn-delete-leave-period" data-leave-id="${leave.id}" data-musician-id="${musician.id}" title="Eliminar período de baja" style="background: none; border: none; cursor: pointer; color: var(--color-absent); padding: 4px 6px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='rgba(231, 76, 60, 0.15)'" onmouseout="this.style.background='transparent'">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        ` : '';

        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; margin-bottom: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
                    <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; white-space: nowrap; ${badgeStyle}">
                        ${isActive ? "Baja Activa" : "Baja Finalizada"}
                    </span>
                    <span style="font-size: 0.88rem; color: var(--text-primary); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        📅 ${startFormatted} &mdash; ${endFormatted}
                    </span>
                </div>
                ${deleteBtnHtml}
            </div>
        `;
    }).join("");

    container.innerHTML = listHtml;

    if (isAdmin) {
        container.querySelectorAll(".btn-delete-leave-period").forEach(btn => {
            btn.addEventListener("click", () => {
                const leaveId = btn.getAttribute("data-leave-id");
                const musicianId = btn.getAttribute("data-musician-id");
                deleteMusicianLeavePeriod(musicianId, leaveId);
            });
        });
    }
}

function deleteMusicianLeavePeriod(musicianId, leaveId) {
    const musIdx = state.musicians.findIndex(m => String(m.id) === String(musicianId));
    if (musIdx === -1) return;

    const musician = state.musicians[musIdx];
    if (!confirm(`¿Eliminar este período de baja de ${musician.name}?`)) return;

    const newLeaves = (musician.leaves || []).filter(l => l.id !== leaveId);
    const hasActiveLeave = newLeaves.some(l => !l.endDate);

    state.musicians[musIdx] = {
        ...musician,
        isBaja: hasActiveLeave,
        leaves: newLeaves
    };

    dbSaveMusician(state.musicians[musIdx]);
    showToast("Período de baja eliminado", "success");
    renderMusicianDetailContent(musicianId);
    renderPlantillaTable();
    renderStatistics();
}

function downloadMusicianPDFReport() {
    const musicianId = currentDetailMusicianId;
    if (!musicianId) return;

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    const yearFilter = document.getElementById("detail-filter-year").value;
    const monthFilter = document.getElementById("detail-filter-month").value;
    const typeFilter = document.getElementById("detail-filter-type").value;

    const allDates = Object.keys(state.attendance);
    // Mismos filtros que renderMusicianDetailContent (la ficha en pantalla), para que el PDF
    // descargado no dé un porcentaje distinto al que se ve en la app: excluir sesiones aún no
    // concluidas y los días en los que este músico estuvo de baja.
    const filteredDates = allDates.filter(dateStr => {
        if (!isSessionConcluded(dateStr)) return false;
        if (isMusicianOnLeaveOnDate(musician, dateStr)) return false;

        const dateObj = new Date(dateStr);
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || isDateInSeason(dateStr.split("_")[0], yearFilter);
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
    const pct = totalSessions > 0 ? Math.round((presents / totalSessions) * 100) : 100;
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

    const filterTextYear = yearFilter === "all" ? "Todas las temporadas" : `Temporada ${yearFilter}`;
    const monthsNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const filterTextMonth = monthFilter === "all" ? "Todos los meses" : monthsNames[parseInt(monthFilter)];
    const filterTextType = typeFilter === "all" ? "Ensayos y Actuaciones" : (typeFilter === "ensayo" ? "Solo Ensayos" : "Solo Actuaciones");

    // Calcular datos de evolución mensual para el informe impreso
    const seasonMonthsPrint = getSeasonMonthsArray(yearFilter === "all" ? getCurrentSeasonLabel() : yearFilter);

    const monthlyDataForPrint = seasonMonthsPrint.map(sm => {
        let presents = 0;
        let total = 0;

        Object.keys(state.attendance).forEach(dateStr => {
            // Mismo criterio que el resto del informe (isSessionConcluded), no solo "fecha <= hoy":
            // si no, el ensayo de hoy (aún sin concluir, con su registro por defecto) contaba aquí
            // aunque el resumen principal del PDF ya lo excluyera, dando porcentajes distintos
            // dentro del mismo documento.
            if (!isSessionConcluded(dateStr)) return;
            const dateParts = dateStr.split("-");
            const y = dateParts[0];
            const m = parseInt(dateParts[1], 10);

            if (y === sm.year && m === sm.monthNum) {
                if (isMusicianOnLeaveOnDate(musician, dateStr)) return;
                const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
                if (typeFilter !== "all" && sessionType !== typeFilter) return;

                const rec = state.attendance[dateStr] ? state.attendance[dateStr][musicianId] : null;
                if (rec) {
                    total++;
                    if (rec.status === "present") presents++;
                }
            }
        });

        const pct = total > 0 ? Math.round((presents / total) * 100) : null;
        return { label: sm.label, presents, total, pct };
    });

    let printMonthlyBarsHTML = "";
    monthlyDataForPrint.forEach(item => {
        const hasData = item.pct !== null;
        const heightPct = hasData ? item.pct : 0;
        const displayValue = hasData ? `${item.pct}%` : "-";
        
        let barBg = "#d0d0d0";
        let valColor = "#666666";

        if (hasData) {
            if (item.pct >= 80) {
                barBg = "#2ecc71";
                valColor = "#27ae60";
            } else if (item.pct >= 60) {
                barBg = "#d4af37";
                valColor = "#b89628";
            } else {
                barBg = "#e74c3c";
                valColor = "#c0392b";
            }
        }

        printMonthlyBarsHTML += `
            <div style="display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; position: relative;">
                <span style="font-size: 7pt; font-weight: 700; color: ${valColor}; margin-bottom: 2px; z-index: 2;">
                    ${displayValue}
                </span>
                <div style="width: 55%; height: ${heightPct}%; background-color: ${barBg}; border-radius: 2px 2px 0 0; min-height: ${hasData ? '2px' : '0px'};"></div>
                <span style="position: absolute; bottom: -17px; font-size: 7pt; color: #333; font-weight: 600; white-space: nowrap;">
                    ${item.label}
                </span>
            </div>
        `;
    });

    const printMonthlyChartSectionHTML = `
        <div class="print-section-title" style="margin-top: 14px;">Evolución Temporal Mensual</div>
        <div style="display: flex; height: 110px; width: 100%; border-bottom: 1.5px solid #ccc; border-left: 1.5px solid #ccc; position: relative; padding: 10px 5px 0 28px; box-sizing: border-box; margin-bottom: 22px; background: #fdfdfd; border-radius: 4px;">
            <div style="position: absolute; left: 0; top: 0; bottom: 20px; width: 24px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; font-size: 6.5pt; color: #666; padding-right: 4px; box-sizing: border-box;">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>
            
            <div style="position: absolute; left: 24px; right: 0; top: 0; bottom: 20px; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; z-index: 0;">
                <div style="border-top: 1px dashed #e0e0e0; width: 100%;"></div>
                <div style="border-top: 1px dashed #e0e0e0; width: 100%;"></div>
                <div style="border-top: 1px dashed #e0e0e0; width: 100%;"></div>
                <div style="border-top: 1px dashed #e0e0e0; width: 100%;"></div>
                <div style="border-top: 1px solid #ccc; width: 100%;"></div>
            </div>

            <div style="display: flex; flex: 1; justify-content: space-around; align-items: flex-end; height: 100%; z-index: 1; padding-bottom: 20px; box-sizing: border-box; gap: 2px;">
                ${printMonthlyBarsHTML}
            </div>
        </div>
    `;

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
            ${musician.fullName ? `<p class="print-musician-instrument"><strong>Nombre completo:</strong> ${musician.fullName}</p>` : ""}
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

        ${printMonthlyChartSectionHTML}

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

// Descarga en PDF el listado del repertorio de una temporada concreta de la página de Repertorio:
// solo título de la marcha, ordenado alfabéticamente y numerado, sin más datos.
function downloadRepertoireSeasonPDF(season) {
    if (!season) {
        showToast("Selecciona una temporada válida", "warning");
        return;
    }

    const seasonMarchas = getMarchasForSeason(season)
        .slice()
        .sort((a, b) => a.title.localeCompare(b.title, 'es'));

    if (seasonMarchas.length === 0) {
        showToast(`No hay marchas en el repertorio de la temporada ${season}`, "warning");
        return;
    }

    const rowsHTML = seasonMarchas.map((m, idx) => `
        <tr>
            <td style="width: 40px; text-align: center; font-weight: 600; color: #6c757d;">${idx + 1}</td>
            <td>${m.title}</td>
        </tr>
    `).join("");

    const printArea = document.getElementById("print-report-area");

    printArea.innerHTML = `
        <div class="print-header">
            <div>
                <h1 class="print-title">YACENTE</h1>
                <div class="print-subtitle">Repertorio de la Temporada ${season}</div>
            </div>
            <div class="print-meta">
                <strong>Temporada:</strong> ${season}<br>
                <strong>Total marchas:</strong> ${seasonMarchas.length}<br>
                <strong>Fecha:</strong> ${new Date().toLocaleDateString("es-ES")}
            </div>
        </div>

        <table class="print-table">
            <thead>
                <tr>
                    <th style="width: 40px; text-align: center;">Nº</th>
                    <th>Marcha</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHTML}
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

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    // El músico siempre exporta el repertorio de la temporada actual.
    const currentSeasonMarchas = getMarchasForSeason(getCurrentSeasonLabel());

    if (currentSeasonMarchas.length === 0) {
        showToast("No hay marchas en el repertorio para exportar", "warning");
        return;
    }

    if (!state.musicianMarchaStatuses) {
        state.musicianMarchaStatuses = {};
    }

    // Count statistics
    const stats = { green: 0, yellow: 0, red: 0, none: 0 };
    currentSeasonMarchas.forEach(marcha => {
        const key = `${musicianId}_${marcha.id}`;
        const status = state.musicianMarchaStatuses[key] || "none";
        if (status === "green") stats.green++;
        else if (status === "yellow") stats.yellow++;
        else if (status === "red") stats.red++;
        else stats.none++;
    });

    const sorted = currentSeasonMarchas.slice().sort((a, b) => a.title.localeCompare(b.title));
    
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
                <div class="print-subtitle">Repertorio de la Temporada ${getCurrentSeasonLabel()} y Nivel de Dominio</div>
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
                Total: ${currentSeasonMarchas.length} marchas
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

function downloadSeasonPDFReport(selectedSeason) {
    if (!selectedSeason) {
        showToast("Selecciona una temporada válida", "warning");
        return;
    }

    const seasonParts = selectedSeason.split("-");
    const year1 = parseInt(seasonParts[0], 10);
    const year2 = parseInt(seasonParts[1], 10);

    const allDates = Object.keys(state.attendance);
    const seasonDates = allDates.filter(date => {
        if (!isSessionConcluded(date)) return false; // Igual que renderStatistics: no contar la sesión de hoy si aún no ha concluido
        const parts = date.split("-");
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        return (y === year1 && m >= 9) || (y === year2 && m < 9);
    }).sort((a, b) => a.localeCompare(b));

    if (seasonDates.length === 0) {
        showToast("No hay convocatorias registradas para la temporada " + selectedSeason, "warning");
        return;
    }

    let totalConvocatorias = seasonDates.length;
    let totalEnsayosCount = 0;
    let totalActuacionesCount = 0;

    seasonDates.forEach(date => {
        const info = state.sessionTypes[date];
        if (info && info.type === "actuacion") {
            totalActuacionesCount++;
        } else {
            totalEnsayosCount++;
        }
    });

    let totalAsistenciasGral = 0;
    let totalFaltasUnjustifiedGral = 0;
    let totalFaltasJustifiedGral = 0;
    let totalEvaluationsGral = 0;

    const musicianStats = {};
    state.musicians.forEach(m => {
        musicianStats[m.id] = {
            id: m.id,
            name: m.name,
            instrument: m.instrument,
            role: m.role,
            presents: 0,
            absentJustified: 0,
            absentUnjustified: 0,
            total: 0,
            maxStreak: 0,
            currentStreak: 0
        };
    });

    seasonDates.forEach(date => {
        const dayRecord = state.attendance[date] || {};
        state.musicians.forEach(m => {
            // De baja ese día: no cuenta ni a favor ni en contra (mismo criterio que
            // computeMusicianAttendanceMetrics, ya usado más abajo en el ranking de este mismo
            // PDF) — si no, esta sección del informe da un número distinto al del ranking.
            if (isMusicianOnLeaveOnDate(m, date)) return;
            const r = dayRecord[m.id];
            if (r) {
                const stats = musicianStats[m.id];
                stats.total++;
                totalEvaluationsGral++;

                if (r.status === "present") {
                    stats.presents++;
                    totalAsistenciasGral++;
                    
                    stats.currentStreak++;
                    if (stats.currentStreak > stats.maxStreak) {
                        stats.maxStreak = stats.currentStreak;
                    }
                } else {
                    if (r.justified) {
                        stats.absentJustified++;
                        totalFaltasJustifiedGral++;
                    } else {
                        stats.absentUnjustified++;
                        totalFaltasUnjustifiedGral++;
                    }
                    stats.currentStreak = 0;
                }
            }
        });
    });

    const avgAttendancePct = totalEvaluationsGral > 0 ? Math.round((totalAsistenciasGral / totalEvaluationsGral) * 100) : 0;
    const avgUnjustifiedPct = totalEvaluationsGral > 0 ? Math.round((totalFaltasUnjustifiedGral / totalEvaluationsGral) * 100) : 0;
    const presentsPctOfTotal = totalEvaluationsGral > 0 ? ((totalAsistenciasGral / totalEvaluationsGral) * 100).toFixed(1) : "0.0";
    const absentUnjustifiedPctOfTotal = totalEvaluationsGral > 0 ? ((totalFaltasUnjustifiedGral / totalEvaluationsGral) * 100).toFixed(1) : "0.0";
    const absentJustifiedPctOfTotal = totalEvaluationsGral > 0 ? ((totalFaltasJustifiedGral / totalEvaluationsGral) * 100).toFixed(1) : "0.0";

    // 1. ESTADÍSTICA DE ENSAYOS Y HORAS
    const rehearsalsStats = calculateRehearsalsStats(seasonDates);
    let rehearsalsBreakdownHTML = "";
    if (rehearsalsStats.breakdownList.length === 0) {
        rehearsalsBreakdownHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8;">Sin ensayos registrados en este período.</td></tr>`;
    } else {
        rehearsalsStats.breakdownList.forEach(item => {
            const color = item.isGeneral ? "#d4af37" : "#3b82f6";
            rehearsalsBreakdownHTML += `
                <tr>
                    <td><strong>${item.label}</strong></td>
                    <td style="text-align: center;">${item.count}</td>
                    <td style="text-align: center;">${item.pctOfTotal}%</td>
                    <td style="text-align: right; padding-right: 15px; font-weight: bold; color: ${color};">${item.formattedHours}</td>
                </tr>
            `;
        });
    }

    // 2. DISTRIBUCIÓN POR DÍAS DE LA SEMANA
    const dayNamesSpanish = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    const dayIndexMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    const dayStats = dayNamesSpanish.map(name => ({ name, sessions: 0, presents: 0, totalChecks: 0 }));

    seasonDates.forEach(date => {
        const parts = date.split("-");
        const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        const dayIdx = dayIndexMap[dObj.getDay()];
        if (dayStats[dayIdx] !== undefined) {
            dayStats[dayIdx].sessions++;
            const dayRecord = state.attendance[date] || {};
            state.musicians.forEach(m => {
                if (isMusicianOnLeaveOnDate(m, date)) return;
                const r = dayRecord[m.id];
                if (r) {
                    dayStats[dayIdx].totalChecks++;
                    if (r.status === "present") dayStats[dayIdx].presents++;
                }
            });
        }
    });

    let dayStatsHTML = "";
    dayStats.forEach(ds => {
        if (ds.sessions > 0) {
            const pct = ds.totalChecks > 0 ? Math.round((ds.presents / ds.totalChecks) * 100) : 0;
            let color = "#2ecc71";
            if (pct < 50) color = "#e74c3c";
            else if (pct < 80) color = "#d4af37";

            dayStatsHTML += `
                <tr>
                    <td><strong>${ds.name}</strong></td>
                    <td style="text-align: center;">${ds.sessions} ${ds.sessions === 1 ? 'convocatoria' : 'convocatorias'}</td>
                    <td style="text-align: center;">${ds.presents} / ${ds.totalChecks}</td>
                    <td style="text-align: right; padding-right: 15px; color: ${color}; font-weight: bold;">${pct}%</td>
                </tr>
            `;
        }
    });
    if (!dayStatsHTML) {
        dayStatsHTML = `<tr><td colspan="4" style="text-align: center; color: #94a3b8;">Sin datos en este período.</td></tr>`;
    }

    // 3. ASISTENCIA POR SECCIONES
    const sections = {};
    state.musicians.forEach(m => {
        const sec = m.instrument || "Otros";
        if (!sections[sec]) {
            sections[sec] = { presents: 0, absentJustified: 0, absentUnjustified: 0, total: 0 };
        }
        const stats = musicianStats[m.id];
        if (stats) {
            sections[sec].presents += stats.presents;
            sections[sec].absentJustified += stats.absentJustified;
            sections[sec].absentUnjustified += stats.absentUnjustified;
            sections[sec].total += stats.total;
        }
    });

    let sectionsHTML = "";
    const sortedSections = Object.keys(sections).sort((a, b) => {
        const pctA = sections[a].total > 0 ? (sections[a].presents / sections[a].total) : 0;
        const pctB = sections[b].total > 0 ? (sections[b].presents / sections[b].total) : 0;
        return pctB - pctA;
    });

    sortedSections.forEach(secName => {
        const s = sections[secName];
        const pct = s.total > 0 ? Math.round((s.presents / s.total) * 100) : 0;
        let color = "#e74c3c";
        if (pct >= 80) color = "#2ecc71";
        else if (pct >= 50) color = "#d4af37";

        sectionsHTML += `
            <tr>
                <td><strong>${secName}</strong></td>
                <td style="text-align: center;">${s.presents}</td>
                <td style="text-align: center;">${s.absentUnjustified}</td>
                <td style="text-align: center;">${s.absentJustified}</td>
                <td style="text-align: right; padding-right: 15px; color: ${color}; font-weight: bold;">${pct}%</td>
            </tr>
        `;
    });

    // 4. RACHAS Y TOP 5 ASISTENCIA
    const musiciansList = Object.values(musicianStats);

    const top3Streaks = [...musiciansList]
        .filter(m => m.total > 0)
        .sort((a, b) => b.maxStreak - a.maxStreak || b.presents - a.presents)
        .slice(0, 3);

    let streaksHTML = "";
    const streakMedals = ["🥇 1º Puesto", "🥈 2º Puesto", "🥉 3º Puesto"];
    for (let i = 0; i < 3; i++) {
        const m = top3Streaks[i];
        if (m && m.maxStreak > 0) {
            streaksHTML += `
                <div class="print-stat-box" style="text-align: left; padding: 10px;">
                    <div class="print-stat-title">${streakMedals[i]}</div>
                    <div style="font-size: 9pt; font-weight: 700; color: #0f172a; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.name}</div>
                    <div style="font-size: 7.5pt; color: #64748b;">${m.instrument}</div>
                    <div style="font-size: 11pt; font-weight: 800; color: #E67E22; margin-top: 4px;">${m.maxStreak} 🔥 <span style="font-size: 7pt; font-weight: 500; color: #64748b;">consecutivos</span></div>
                </div>
            `;
        } else {
            streaksHTML += `
                <div class="print-stat-box" style="text-align: left; padding: 10px; display: flex; align-items: center; justify-content: center; min-height: 70px;">
                    <div style="font-size: 8pt; color: #94a3b8; font-style: italic; text-align: center;">Sin registros</div>
                </div>
            `;
        }
    }

    // 5. RANKING COMPLETO DE COMPONENTES
    const fullRankingData = state.musicians.map(m => {
        const musicianId = m.id;
        const metrics = getMusicianAttendanceMetrics(musicianId, d => seasonDates.includes(d));
        const totalConvocated = metrics.totalConvocated;
        const presentsCount = metrics.attended;
        const attendancePct = metrics.attendancePct;

        const rehearsalDates = seasonDates.filter(date => {
            const session = state.sessionTypes[date];
            return !session || session.type === "ensayo";
        }).sort((a, b) => b.localeCompare(a));

        let streak = 0;
        for (let i = 0; i < rehearsalDates.length; i++) {
            const date = rehearsalDates[i];
            // De baja ese día: no cuenta ni rompe la racha (mismo criterio que
            // computeMusicianStreak/renderStatsStreaks).
            if (isMusicianOnLeaveOnDate(m, date)) continue;
            const dayRecord = state.attendance[date];
            const record = dayRecord ? dayRecord[musicianId] : null;
            if (record && record.status === "present") {
                streak++;
            } else {
                break;
            }
        }

        const medals = getMusicianMedalsData(musicianId);
        const badgesCount = medals.filter(med => med.unlocked && !med.isNegative).reduce((acc, med) => acc + (med.stars || 1), 0);

        return {
            id: m.id,
            name: m.name,
            instrument: m.instrument,
            role: m.role,
            attendancePct,
            presentsCount,
            totalConvocated,
            streak,
            badgesCount
        };
    }).sort((a, b) => {
        const roundDiff = Math.round(b.attendancePct) - Math.round(a.attendancePct);
        if (roundDiff !== 0) return roundDiff;
        if (b.streak !== a.streak) return b.streak - a.streak;
        if (b.badgesCount !== a.badgesCount) return b.badgesCount - a.badgesCount;
        const exactDiff = b.attendancePct - a.attendancePct;
        if (Math.abs(exactDiff) > 0.0001) return exactDiff;
        return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    });

    let fullRankingHTML = "";
    fullRankingData.forEach((item, idx) => {
        const pct = Math.round(item.attendancePct);
        let color = "#2ecc71";
        if (pct < 50) color = "#e74c3c";
        else if (pct < 80) color = "#d4af37";

        fullRankingHTML += `
            <tr>
                <td style="text-align: center; font-weight: bold;">#${idx + 1}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.instrument} ${item.role ? `(${item.role})` : ''}</td>
                <td style="text-align: center;">${item.presentsCount} / ${item.totalConvocated}</td>
                <td style="text-align: center; font-weight: bold; color: #ff6a00;">${item.streak} 🔥</td>
                <td style="text-align: center; font-weight: bold; color: #d4af37;">${item.badgesCount} 🏅</td>
                <td style="text-align: right; padding-right: 15px; font-weight: bold; color: ${color};">${pct}%</td>
            </tr>
        `;
    });

    // 6. ALERTAS DE ASISTENCIA (<50%)
    const alertMusicians = musiciansList
        .filter(m => m.total > 0 && (m.presents / m.total) < 0.5)
        .sort((a, b) => (a.presents / a.total) - (b.presents / b.total));

    let alertsHTML = "";
    alertMusicians.forEach(m => {
        const pct = Math.round((m.presents / m.total) * 100);
        alertsHTML += `
            <tr class="alert-row">
                <td><strong>${m.name}</strong></td>
                <td>${m.instrument}</td>
                <td style="text-align: center;">${m.presents} / ${m.total}</td>
                <td style="text-align: center; color: #e74c3c; font-weight: bold;">${m.absentUnjustified}</td>
                <td style="text-align: right; padding-right: 15px; font-weight: bold; color: #e74c3c;">${pct}%</td>
            </tr>
        `;
    });

    if (alertsHTML === "") {
        alertsHTML = `<tr><td colspan="5" style="text-align: center; color: #64748b; font-style: italic;">No hay componentes por debajo del 50% de asistencia en esta temporada. ¡Buen compromiso general!</td></tr>`;
    }

    // 7. REPERTORIO DE LA TEMPORADA
    const totalMarchas = state.marchas ? state.marchas.length : 0;
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    let noneCount = 0;

    if (state.marchas && state.musicianMarchaStatuses) {
        state.marchas.forEach(marcha => {
            let greens = 0;
            let totalActive = 0;
            state.musicians.forEach(m => {
                const key = `${m.id}_${marcha.id}`;
                const status = state.musicianMarchaStatuses[key];
                if (status) {
                    totalActive++;
                    if (status === "green") greens++;
                }
            });
            const pct = totalActive > 0 ? (greens / totalActive) : 0;
            if (pct >= 0.7) greenCount++;
            else if (pct >= 0.3) yellowCount++;
            else if (pct > 0) redCount++;
            else noneCount++;
        });
    }

    const greenPct = totalMarchas > 0 ? Math.round((greenCount / totalMarchas) * 100) : 0;
    const redPct = totalMarchas > 0 ? Math.round((redCount / totalMarchas) * 100) : 0;

    const marchaPlays = {};
    if (state.marchas) {
        state.marchas.forEach(m => {
            marchaPlays[m.id] = 0;
        });
    }

    seasonDates.forEach(date => {
        const info = state.sessionTypes[date];
        if (info && info.marchas && Array.isArray(info.marchas)) {
            info.marchas.forEach(mid => {
                if (marchaPlays[mid] !== undefined) {
                    marchaPlays[mid]++;
                }
            });
        }
    });

    const sortedMarchas = [...(state.marchas || [])].map(m => ({
        ...m,
        count: marchaPlays[m.id] || 0
    }));

    const top5MostEnsayadas = [...sortedMarchas]
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title))
        .slice(0, 5);

    let top5MostEnsayadasHTML = "";
    top5MostEnsayadas.forEach((m, idx) => {
        top5MostEnsayadasHTML += `
            <div class="print-repertoire-item-row">
                <span>${idx + 1}. <strong>${m.title}</strong></span>
                <span>${m.count} ${m.count === 1 ? 'ensayo' : 'ensayos'}</span>
            </div>
        `;
    });

    // Marchas más olvidadas con días sin ensayar
    const lastRehearsalDatesSeason = {};
    if (state.playedMarchas) {
        Object.keys(state.playedMarchas).forEach(sessionKey => {
            if (!isSessionConcluded(sessionKey)) return; // No contar ensayos que aún no han sucedido
            const sessionInfo = state.sessionTypes[sessionKey];
            const isRehearsal = !sessionInfo || sessionInfo.type === "ensayo";
            if (!isRehearsal) return;

            const rawDate = sessionKey.split("_")[0];
            const list = state.playedMarchas[sessionKey] || [];
            
            list.forEach(mId => {
                if (!lastRehearsalDatesSeason[mId] || rawDate > lastRehearsalDatesSeason[mId]) {
                    lastRehearsalDatesSeason[mId] = rawDate;
                }
            });
        });
    }

    const todayDate = new Date();
    const todayStartObj = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

    const marchasOlvidadasData = (state.marchas || []).map(m => {
        const lastDateStr = lastRehearsalDatesSeason[m.id];
        let days = Infinity;
        let daysLabel = "Nunca";
        
        if (lastDateStr) {
            const parts = lastDateStr.split("-");
            const lastDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            const diffTime = todayStartObj - lastDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            days = Math.max(0, diffDays);
            daysLabel = `${days} ${days === 1 ? 'día' : 'días'}`;
        }
        
        return {
            ...m,
            days: days,
            daysLabel: daysLabel
        };
    }).sort((a, b) => {
        if (a.days === Infinity && b.days !== Infinity) return -1;
        if (a.days !== Infinity && b.days === Infinity) return 1;
        if (a.days === Infinity && b.days === Infinity) {
            return a.title.localeCompare(b.title, 'es');
        }
        return b.days - a.days || a.title.localeCompare(b.title, 'es');
    });

    const top5Olvidadas = marchasOlvidadasData.slice(0, 5);
    let top5OlvidadasHTML = "";
    top5Olvidadas.forEach((m, idx) => {
        const daysColor = m.days === Infinity ? "#e74c3c" : (m.days > 30 ? "#d4af37" : "#475569");
        top5OlvidadasHTML += `
            <div class="print-repertoire-item-row">
                <span>${idx + 1}. <strong>${m.title}</strong></span>
                <span style="color: ${daysColor}; font-weight: 600;">${m.daysLabel} sin ensayar</span>
            </div>
        `;
    });

    const printArea = document.getElementById("print-report-area");
    if (!printArea) return;

    printArea.innerHTML = `
        <div class="print-header">
            <div class="print-brand">
                <h1 class="print-title">YACENTE</h1>
                <div class="print-subtitle">Asociación Musical Yacente • Informe Global de Temporada</div>
            </div>
            <div class="print-meta">
                <strong>Temporada:</strong> ${selectedSeason}<br>
                <strong>Fecha de generación:</strong> ${new Date().toLocaleDateString("es-ES")}<br>
                <strong>Generado por:</strong> Dirección
            </div>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">1. Resumen General de la Temporada</div>
            <div class="print-grid">
                <div class="print-stat-box">
                    <div class="print-stat-title">Asistencia Media</div>
                    <div class="print-stat-value" style="color: ${avgAttendancePct >= 80 ? '#2ecc71' : (avgAttendancePct >= 50 ? '#d4af37' : '#e74c3c')};">${avgAttendancePct}%</div>
                    <div class="print-stat-desc">${avgAttendancePct >= 80 ? 'Excelente (>=80%)' : (avgAttendancePct >= 50 ? 'Aceptable (50%-80%)' : 'Crítico (<50%)')}</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Total Convocatorias</div>
                    <div class="print-stat-value">${totalConvocatorias}</div>
                    <div class="print-stat-desc">${totalEnsayosCount} Ensayos | ${totalActuacionesCount} Actuaciones</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Incidencia de Faltas</div>
                    <div class="print-stat-value" style="color: #e74c3c;">${avgUnjustifiedPct}%</div>
                    <div class="print-stat-desc">${totalFaltasUnjustifiedGral} Faltas sin justificar</div>
                </div>
            </div>
            <div class="print-grid" style="margin-top: -5px;">
                <div class="print-stat-box">
                    <div class="print-stat-title">Asistencias Totales</div>
                    <div class="print-stat-value" style="color: #2ecc71; font-size: 13pt;">${totalAsistenciasGral.toLocaleString()} presencias</div>
                    <div class="print-stat-desc">${presentsPctOfTotal}% del total general</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Faltas Justificadas</div>
                    <div class="print-stat-value" style="color: #d4af37; font-size: 13pt;">${totalFaltasJustifiedGral.toLocaleString()} justificadas</div>
                    <div class="print-stat-desc">${absentJustifiedPctOfTotal}% del total general</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Faltas Sin Justificar</div>
                    <div class="print-stat-value" style="color: #e74c3c; font-size: 13pt;">${totalFaltasUnjustifiedGral.toLocaleString()} injustificadas</div>
                    <div class="print-stat-desc">${absentUnjustifiedPctOfTotal}% del total general</div>
                </div>
            </div>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">2. Estadística de Ensayos y Horas Ensayadas</div>
            <div class="print-grid">
                <div class="print-stat-box">
                    <div class="print-stat-title">Ensayos Totales</div>
                    <div class="print-stat-value">${rehearsalsStats.totalCount}</div>
                    <div class="print-stat-desc">Generales y por voz</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Ensayos Generales</div>
                    <div class="print-stat-value" style="color: #d4af37;">${rehearsalsStats.generalCount}</div>
                    <div class="print-stat-desc">Toda la plantilla</div>
                </div>
                <div class="print-stat-box">
                    <div class="print-stat-title">Ensayos por Voz</div>
                    <div class="print-stat-value" style="color: #3b82f6;">${rehearsalsStats.voiceCount}</div>
                    <div class="print-stat-desc">Secciones específicas</div>
                </div>
            </div>
            <div class="print-grid" style="margin-top: -5px; grid-template-columns: 1fr;">
                <div class="print-stat-box" style="padding: 10px;">
                    <div class="print-stat-title">Horas Totales Invertidas en Ensayos</div>
                    <div class="print-stat-value" style="color: #2ecc71; font-size: 15pt;">${rehearsalsStats.formattedTotalHours}</div>
                    <div class="print-stat-desc">Tiempo acumulado en ensayos según horario fijado</div>
                </div>
            </div>
            <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-top: 10px; margin-bottom: 6px;">
                Desglose por Modalidad / Sección de Ensayo
            </div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>Tipo / Sección Convocada</th>
                        <th style="text-align: center;">Nº Ensayos</th>
                        <th style="text-align: center;">% del Total</th>
                        <th style="text-align: right; padding-right: 15px;">Horas Ensayadas</th>
                    </tr>
                </thead>
                <tbody>
                    ${rehearsalsBreakdownHTML}
                </tbody>
            </table>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">3. Distribución y Asistencia por Día de la Semana</div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>Día de la Semana</th>
                        <th style="text-align: center;">Convocatorias</th>
                        <th style="text-align: center;">Asistencias vs Convocados</th>
                        <th style="text-align: right; padding-right: 15px;">% Asistencia Media</th>
                    </tr>
                </thead>
                <tbody>
                    ${dayStatsHTML}
                </tbody>
            </table>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">4. Asistencia por Secciones / Voces</div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>Sección / Instrumento</th>
                        <th style="text-align: center;">Presencias</th>
                        <th style="text-align: center;">Faltas S.J.</th>
                        <th style="text-align: center;">Faltas Just.</th>
                        <th style="text-align: right; padding-right: 15px;">% Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    ${sectionsHTML}
                </tbody>
            </table>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">5. Compromiso y Rachas Destacadas</div>
            <div style="font-size: 8.5pt; font-weight: 700; color: #475569; margin-bottom: 8px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px;">
                Top 3 Rachas de Asistencia de la Temporada
            </div>
            <div class="print-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 15px;">
                ${streaksHTML}
            </div>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">6. Ranking Completo de Asistencia de la Plantilla</div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th style="width: 40px; text-align: center;">Pos.</th>
                        <th>Componente</th>
                        <th>Sección / Rol</th>
                        <th style="text-align: center;">Asistidas / Convocadas</th>
                        <th style="text-align: center;">Racha</th>
                        <th style="text-align: center;">Insignias</th>
                        <th style="text-align: right; padding-right: 15px;">% Asist.</th>
                    </tr>
                </thead>
                <tbody>
                    ${fullRankingHTML}
                </tbody>
            </table>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">7. Componentes con Alerta de Asistencia (&lt;50%)</div>
            <table class="print-table">
                <thead>
                    <tr>
                        <th>Músico</th>
                        <th>Sección</th>
                        <th style="text-align: center;">Asistidas / Convocadas</th>
                        <th style="text-align: center;">Faltas Injust.</th>
                        <th style="text-align: right; padding-right: 15px;">% Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    ${alertsHTML}
                </tbody>
            </table>
        </div>

        <div class="print-page-block">
            <div class="print-section-title">8. Trabajo y Estado del Repertorio</div>
            <div class="print-grid">
                <div class="print-stat-box" style="padding: 8px;">
                    <div class="print-stat-title">Marchas en Catálogo</div>
                    <div class="print-stat-value" style="font-size: 13pt;">${totalMarchas} marchas</div>
                </div>
                <div class="print-stat-box" style="padding: 8px;">
                    <div class="print-stat-title">Bien Trabajadas (🟢)</div>
                    <div class="print-stat-value" style="font-size: 13pt; color: #2ecc71;">${greenCount} (${greenPct}%)</div>
                </div>
                <div class="print-stat-box" style="padding: 8px;">
                    <div class="print-stat-title">Por Trabajar (🔴)</div>
                    <div class="print-stat-value" style="font-size: 13pt; color: #e74c3c;">${redCount} (${redPct}%)</div>
                </div>
            </div>

            <div class="print-repertoire-flex">
                <div class="print-repertoire-col">
                    <div class="print-repertoire-col-title">Top 5 Marchas más Ensayadas</div>
                    ${top5MostEnsayadasHTML}
                </div>
                <div class="print-repertoire-col">
                    <div class="print-repertoire-col-title">Top 5 Marchas Olvidadas / Menos Ensayadas</div>
                    ${top5OlvidadasHTML}
                </div>
            </div>
        </div>

        <div class="print-footer" style="margin-top: 25px; padding-top: 10px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 8pt; color: #64748b;">
            Asociación Musical Yacente • Salamanca • Informe Oficial de Temporada
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
    const inheritedSeason = document.getElementById("filter-year").value;
    populateSeasonSelect(document.getElementById("voice-filter-year"), Object.keys(state.attendance), true, inheritedSeason);
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

    // Filtrar fechas. Igual que en renderMusicianDetailContent/downloadMusicianPDFReport: excluir
    // sesiones aún no concluidas para no contar ensayos futuros que ya tengan un registro por
    // defecto.
    const allDates = Object.keys(state.attendance);
    const filteredDates = allDates.filter(dateStr => {
        if (!isSessionConcluded(dateStr)) return false;

        const dateObj = new Date(dateStr);
        const month = dateObj.getMonth().toString();

        const yearMatches = yearFilter === "all" || isDateInSeason(dateStr.split("_")[0], yearFilter);
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
            // De baja ese día: no cuenta ni a favor ni en contra de este músico.
            if (isMusicianOnLeaveOnDate(m, date)) return;
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
    if (!dateStr) return "";
    try {
        const cleanDateStr = dateStr.split("_")[0];
        const parts = cleanDateStr.split("-");
        if (parts.length < 3) return dateStr;
        const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("es-ES", {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
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

function formatDateCompactSpanish(dateStr) {
    if (!dateStr) return "";
    try {
        const cleanDateStr = dateStr.split("_")[0];
        const parts = cleanDateStr.split("-");
        if (parts.length < 3) return dateStr;
        const date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString("es-ES", {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

function isMusicianOnLeaveOnDate(musician, dateStr) {
    if (!musician) return false;
    const leaves = musician.leaves || [];
    const cleanDate = (dateStr || "").split("_")[0];
    if (!cleanDate) return false;

    if (leaves.length === 0) {
        return !!musician.isBaja;
    }

    return leaves.some(period => {
        const start = period.startDate;
        const end = period.endDate;
        if (!start) return false;
        if (cleanDate < start) return false;
        if (end && cleanDate > end) return false;
        return true;
    });
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
    document.getElementById("form-firebase-config").addEventListener("submit", async (e) => {
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
            saveStateToLocalStorage();
            
            closeFirebaseModal();
            showToast("Configuración guardada. Conectando a la nube...", "success");
            
            // Inicializar Firebase
            await initFirebase();

            const db = firebase.firestore();
            
            // Verificar primero si ya existe un documento de seguridad en Firestore
            db.collection("config").doc("security").get()
                .then(async secDoc => {
                    const hasCloudSecurity = secDoc.exists && secDoc.data() && secDoc.data().passwordHash;

                    if (hasCloudSecurity) {
                        const existingHash = secDoc.data().passwordHash;
                        state.firebasePasswordHash = existingHash;
                        localStorage.setItem("yacente_firebase_hash", existingHash);
                        if (typeof secDoc.data().pastLockEnabled === "boolean") {
                            state.pastLockEnabled = secDoc.data().pastLockEnabled;
                            localStorage.setItem("yacente_past_lock_enabled", state.pastLockEnabled ? "true" : "false");
                            const togglePastLock = document.getElementById("toggle-past-lock");
                            if (togglePastLock) togglePastLock.checked = state.pastLockEnabled;
                        }

                        if (password.length > 0) {
                            const { valid, upgradedHash } = await verifyPassword(password, existingHash);
                            if (valid) {
                                if (upgradedHash) {
                                    state.firebasePasswordHash = upgradedHash;
                                    localStorage.setItem("yacente_firebase_hash", upgradedHash);
                                    db.collection("config").doc("security").set({ passwordHash: upgradedHash }, { merge: true }).catch(() => {});
                                }
                                sessionStorage.setItem("yacente_authenticated", "true");
                                sessionStorage.setItem("yacente_role", "admin");
                                localStorage.setItem("yacente_authenticated", "true");
                                localStorage.setItem("yacente_role", "admin");
                                showToast("Contraseña de directiva correcta. Conectado como Administrador.", "success");
                            } else {
                                showToast("Contraseña de directiva incorrecta. Conectado en modo músico.", "warning");
                            }
                        } else {
                            showToast("Conectado con éxito a la nube.", "success");
                        }
                    } else {
                        // Es la primera vez que se configura esta base de datos
                        if (password.length > 0) {
                            state.firebasePasswordHash = await hashPassword(password);
                            sessionStorage.setItem("yacente_authenticated", "true");
                            sessionStorage.setItem("yacente_role", "admin");
                            localStorage.setItem("yacente_authenticated", "true");
                            localStorage.setItem("yacente_role", "admin");
                            
                            db.collection("config").doc("security").set({
                                passwordHash: state.firebasePasswordHash
                            }).then(() => {
                                showToast("Contraseña de seguridad de directiva creada en la nube.", "success");
                            }).catch(err => console.error("Error al guardar seguridad inicial:", err));
                        } else {
                            showToast("Conectado a la nube.", "success");
                        }
                    }
                    
                    saveStateToLocalStorage();
                    
                    // Comprobar si existen datos antes de recargar
                    db.collection("musicians").limit(1).get()
                        .then(qSnap => {
                            if (qSnap.empty && password.length > 0) {
                                console.log("Firestore está vacío. Sincronizando datos locales iniciales...");
                                syncLocalToCloud();
                            } else {
                                setTimeout(() => window.location.reload(), 1200);
                            }
                        })
                        .catch(() => window.location.reload());
                })
                .catch(err => {
                    console.error("Error al consultar seguridad en Firestore:", err);
                    setTimeout(() => window.location.reload(), 1200);
                });
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
    document.getElementById("form-lock-screen").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (activeTab === "admin") {
            // LOGIN DE ADMINISTRACIÓN
            const enteredPassword = passwordInput.value.trim();

            const grantAdminAccess = (toastMsg, offline) => {
                sessionStorage.setItem("yacente_authenticated", "true");
                sessionStorage.setItem("yacente_role", "admin");
                localStorage.setItem("yacente_authenticated", "true");
                localStorage.setItem("yacente_role", "admin");
                document.body.classList.remove("component-portal");

                // Ocultar PWA Bottom Navigation
                const mobNav = document.getElementById("component-mobile-nav");
                if (mobNav) mobNav.classList.add("hidden");

                hideLockScreen();
                if (!offline) startCloudSync();
                renderActiveSection("section-pasar-lista");
                showToast(toastMsg, "success");
            };
            const denyAdminAccess = () => {
                errorMsg.classList.remove("hidden");
                errorMsg.innerText = "Contraseña incorrecta";
                showToast("Contraseña de directiva incorrecta", "error");
            };

            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("config").doc("security").get()
                    .then(async doc => {
                        let validHash = state.firebasePasswordHash; // fallback local
                        if (doc.exists && doc.data()) {
                            if (doc.data().passwordHash) {
                                validHash = doc.data().passwordHash;
                                state.firebasePasswordHash = validHash;
                                localStorage.setItem("yacente_firebase_hash", validHash);
                            }
                            if (typeof doc.data().pastLockEnabled === "boolean") {
                                state.pastLockEnabled = doc.data().pastLockEnabled;
                                localStorage.setItem("yacente_past_lock_enabled", state.pastLockEnabled ? "true" : "false");
                                const togglePastLock = document.getElementById("toggle-past-lock");
                                if (togglePastLock) togglePastLock.checked = state.pastLockEnabled;
                            }
                        }

                        // "admin" solo funciona si esta base de datos nunca ha tenido contraseña configurada
                        if (!validHash && enteredPassword === "admin") {
                            grantAdminAccess("Panel desbloqueado correctamente", false);
                            return;
                        }
                        const { valid, upgradedHash } = await verifyPassword(enteredPassword, validHash);
                        if (valid) {
                            if (upgradedHash) {
                                state.firebasePasswordHash = upgradedHash;
                                localStorage.setItem("yacente_firebase_hash", upgradedHash);
                                db.collection("config").doc("security").set({ passwordHash: upgradedHash }, { merge: true }).catch(() => {});
                            }
                            grantAdminAccess("Panel desbloqueado correctamente", false);
                        } else {
                            denyAdminAccess();
                        }
                    })
                    .catch(async err => {
                        console.error("Error de conexión al validar contraseña:", err);
                        const validHash = state.firebasePasswordHash;
                        if (!validHash && enteredPassword === "admin") {
                            grantAdminAccess("Panel desbloqueado en modo offline", true);
                            return;
                        }
                        const { valid } = await verifyPassword(enteredPassword, validHash);
                        if (valid) {
                            grantAdminAccess("Panel desbloqueado en modo offline", true);
                        } else {
                            denyAdminAccess();
                        }
                    });
            } else {
                // Modo local sin config en la nube ("admin" solo si nunca se ha configurado contraseña local)
                const validHash = state.firebasePasswordHash;
                if (!validHash && enteredPassword === "admin") {
                    grantAdminAccess("Panel local desbloqueado", true);
                } else {
                    const { valid } = await verifyPassword(enteredPassword, validHash);
                    if (valid) {
                        grantAdminAccess("Panel local desbloqueado", true);
                    } else {
                        errorMsg.classList.remove("hidden");
                        errorMsg.innerText = validHash ? "Contraseña incorrecta" : "Contraseña incorrecta (usa 'admin' la primera vez para configurar una nueva)";
                        showToast("Contraseña incorrecta", "error");
                    }
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
            
            const musician = state.musicians.find(m => String(m.id) === String(musicianId));
            if (!musician) {
                showToast("Músico no encontrado", "error");
                return;
            }

            if (!musician.fullName || !musician.fullName.trim()) {
                errorMsg.classList.remove("hidden");
                errorMsg.innerText = "Facilita los datos solicitados a la dirección para poder acceder a tu cuenta";
                showToast("Facilita los datos solicitados a la dirección para poder acceder a tu cuenta", "warning");
                return;
            }

            if (musician.pinLocked) {
                errorMsg.classList.remove("hidden");
                errorMsg.innerText = "Tu contraseña se ha bloqueado por demasiados intentos fallidos. Ponte en contacto con la dirección para restablecerla.";
                showToast("PIN bloqueado por demasiados intentos. Contacta con la dirección.", "error");
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
                    if (musician.pinFailedAttempts) {
                        musician.pinFailedAttempts = 0;
                        dbSaveMusician(musician);
                    }
                    performAuth();
                } else {
                    musician.pinFailedAttempts = (musician.pinFailedAttempts || 0) + 1;
                    if (musician.pinFailedAttempts >= 5) {
                        musician.pinLocked = true;
                        dbSaveMusician(musician);
                        errorMsg.classList.remove("hidden");
                        errorMsg.innerText = "Tu contraseña se ha bloqueado por demasiados intentos fallidos. Ponte en contacto con la dirección para restablecerla.";
                        showToast("PIN bloqueado por demasiados intentos. Contacta con la dirección.", "error");
                    } else {
                        dbSaveMusician(musician);
                        errorMsg.classList.remove("hidden");
                        errorMsg.innerText = "PIN incorrecto. Si lo has olvidado, consulta con la Directiva.";
                        showToast("El PIN introducido es incorrecto", "error");
                    }
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
    cleanupOrphanedMarchasRecords();

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

    // Filtro de Temporada (obligatorio: no existe opción "Todas")
    const marchasYearSelect = document.getElementById("marchas-filter-year");
    if (marchasYearSelect) populateRepertoireSeasonSelect(marchasYearSelect, marchasYearSelect.value);
    const marchasSeasonFilter = marchasYearSelect ? marchasYearSelect.value : getCurrentSeasonLabel();

    // Repertorio de la temporada seleccionada: por defecto todo el repertorio, salvo las marchas
    // retiradas específicamente de esta temporada o añadidas en exclusiva a otra temporada distinta.
    const seasonMarchas = getMarchasForSeason(marchasSeasonFilter);

    const pageTitle = document.getElementById("page-title");
    if (pageTitle && document.getElementById("section-marchas").classList.contains("active")) {
        pageTitle.innerText = `Repertorio (${seasonMarchas.length})`;
    }

    // El contador de "veces tocada" se cuenta dentro de la temporada seleccionada en el filtro
    // (igual que la pertenencia al repertorio): cada temporada tiene sus propias estadísticas.
    const matchesMarchasFilters = (date) => {
        if (!isSessionConcluded(date)) return false; // Solo ensayos/actuaciones que ya han sucedido
        const rawDate = date.split("_")[0];
        return isDateInSeason(rawDate, marchasSeasonFilter);
    };

    // Count plays dynamically: veces ensayada (playedMarchas) + veces tocada en actuación
    // (actuacionRepertoire), respetando la temporada seleccionada.
    const playCounts = {};
    if (state.playedMarchas) {
        Object.keys(state.playedMarchas).forEach(date => {
            if (!matchesMarchasFilters(date)) return;
            const list = state.playedMarchas[date] || [];
            list.forEach(mId => {
                playCounts[mId] = (playCounts[mId] || 0) + 1;
            });
        });
    }
    if (state.actuacionRepertoire) {
        Object.keys(state.actuacionRepertoire).forEach(date => {
            const sessionInfo = state.sessionTypes[date];
            if (!sessionInfo || sessionInfo.type !== "actuacion") return;
            if (!matchesMarchasFilters(date)) return;
            const list = new Set(state.actuacionRepertoire[date] || []);
            list.forEach(mId => {
                playCounts[mId] = (playCounts[mId] || 0) + 1;
            });
        });
    }

    // Sort marchas alphabetically in-place before filtering
    seasonMarchas.sort((a, b) => a.title.localeCompare(b.title, 'es'));

    const filteredMarchas = seasonMarchas.filter(m => {
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
            if (e.target.closest(".marcha-actions-compact") || e.target.closest(".btn-action") || e.target.closest(".marcha-plays-compact")) {
                return;
            }
            openMarchaNotesModal(m.id);
        });
        
        const btnStyle = `padding: 2px; background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;`;
        const iconSize = state.marchasViewMode === "list" ? 14 : 11;

        const hasNotes = m.notes && m.notes.trim().length > 0;
        const notesTitle = hasNotes ? m.notes.trim().replace(/"/g, '&quot;') : '';
        const notesBadge = hasNotes 
            ? `<span class="marcha-has-notes-icon" title="Nota de dirección: ${notesTitle}" style="margin-left: 6px; font-size: 0.85rem; vertical-align: middle; flex-shrink: 0; cursor: help;">❗</span>` 
            : '';

        if (state.marchasViewMode === "list") {
            card.innerHTML = `
                <h4 class="marcha-title-compact" title="${m.title}" style="flex: 1; min-width: 0; margin: 0; margin-right: 8px; display: flex; align-items: center;">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.title}</span>
                    ${notesBadge}
                </h4>
                <div class="marcha-right-controls" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0; margin-left: auto;">
                    <div class="marcha-meta-compact" style="display: flex; align-items: center; gap: 6px;">
                        ${metaHtml}
                        <span class="marcha-plays-compact" title="Veces ensayada + tocada en actuación (pulsa para ver detalle)" style="cursor: pointer;">${count}</span>
                    </div>
                    <div class="marcha-actions-compact" style="display: flex; align-items: center; gap: 3px;">
                        <button class="btn-action edit edit-marcha-btn" data-id="${m.id}" title="Editar Marcha" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-marcha-btn" data-id="${m.id}" title="Quitar de esta temporada" style="${btnStyle} color: var(--color-absent);">
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
                <h4 class="marcha-title-compact" title="${m.title}" style="flex: 1; min-width: 0; margin: 0; margin-right: 4px; display: flex; align-items: center;">
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${m.title}</span>
                    ${notesBadge}
                </h4>
                <div class="marcha-right-controls" style="display: flex; align-items: center; gap: 3px; flex-shrink: 0; margin-left: auto;">
                    <div class="marcha-meta-compact" style="display: flex; align-items: center; gap: 2px; margin-right: 0px;">
                        ${metaHtml}
                    </div>
                    <span class="marcha-plays-compact" title="Veces ensayada + tocada en actuación (pulsa para ver detalle)" style="padding: 1px 3px; font-size: 0.62rem; cursor: pointer;">${count}</span>
                    <div class="marcha-actions-compact" style="display: flex; align-items: center; gap: 2px;">
                        <button class="btn-action edit edit-marcha-btn" data-id="${m.id}" title="Editar Marcha" style="${btnStyle} color: var(--color-gold);">
                            <svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-action delete delete-marcha-btn" data-id="${m.id}" title="Quitar de esta temporada" style="${btnStyle} color: var(--color-absent);">
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
        card.querySelector(".marcha-plays-compact").addEventListener("click", (e) => {
            e.stopPropagation();
            openMarchaHistoryModal(m.id);
        });

        card.querySelector(".edit-marcha-btn").addEventListener("click", () => {
            openEditMarchaModal(m.id);
        });

        card.querySelector(".delete-marcha-btn").addEventListener("click", () => {
            if (confirm(`¿Quitar "${m.title}" del repertorio de la temporada ${marchasSeasonFilter}? Seguirá disponible en el resto de temporadas y no se borrará su historial de ensayos.`)) {
                removeMarchaFromSeason(m.id, marchasSeasonFilter);
                renderMarchasList();
                showToast(`Marcha retirada del repertorio de la temporada ${marchasSeasonFilter}`, "error");
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
        
        let statusCircle = "";
        let diffBadge = "";
        if (marcha) {
            let statusTitle = "Por trabajar";
            let circleSymbol = "🔴";
            if (marcha.status === "green") { circleSymbol = "🟢"; statusTitle = "Bien trabajada"; }
            else if (marcha.status === "yellow") { circleSymbol = "🟡"; statusTitle = "En proceso"; }
            statusCircle = `<span title="${statusTitle}" style="font-size: 0.65rem; line-height: 1; flex-shrink: 0;">${circleSymbol}</span>`;

            const diffNum = marcha.difficulty || 1;
            diffBadge = `<span style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.6rem; font-weight: 600; padding: 1px 3px; border-radius: 3px; line-height: 1; flex-shrink: 0;">N${diffNum}</span>`;
        }

        const badge = document.createElement("div");
        badge.className = "marcha-tag";
        badge.style.display = "inline-flex";
        badge.style.alignItems = "center";
        badge.style.gap = "4px";
        badge.innerHTML = `
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;">${escapeHtml(name)}</span>
            <div style="display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0; margin-left: auto;">
                ${statusCircle}
                ${diffBadge}
            </div>
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
// Modal combinado de historial de una marcha: ensayos (playedMarchas) + actuaciones
// (actuacionRepertoire), cada apartado con su propia lista escroleable.
function openMarchaHistoryModal(marchId) {
    const m = state.marchas.find(item => item.id === marchId);
    if (!m) return;

    document.getElementById("marcha-history-repertoire-info").innerText = m.title;

    renderMarchaHistoryEnsayosSection(marchId);
    renderMarchaHistoryActuacionesSection(marchId);

    document.getElementById("modal-marcha-history").classList.add("active");
}

function renderMarchaHistoryEnsayosSection(marchId) {
    const datesPlayed = Object.keys(state.playedMarchas || {}).filter(date => {
        if (!isSessionConcluded(date)) return false; // No mostrar ensayos que aún no han sucedido
        const isRehearsal = !state.sessionTypes[date] || state.sessionTypes[date].type === "ensayo";
        return isRehearsal && state.playedMarchas[date].includes(marchId);
    }).sort((a, b) => b.localeCompare(a));

    const countEl = document.getElementById("marcha-history-ensayos-count");
    if (countEl) countEl.innerText = `(${datesPlayed.length})`;

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
}

// Lista las actuaciones (nombre + fecha) en cuyo repertorio ordenado aparece la marcha dada.
function renderMarchaHistoryActuacionesSection(marchaId) {
    const actuacionDates = Object.keys(state.actuacionRepertoire || {}).filter(date => {
        if (!isSessionConcluded(date)) return false; // No mostrar actuaciones que aún no han sucedido
        const sessionInfo = state.sessionTypes[date];
        return sessionInfo && sessionInfo.type === "actuacion" && (state.actuacionRepertoire[date] || []).includes(marchaId);
    }).sort((a, b) => b.localeCompare(a));

    const countEl = document.getElementById("marcha-actuaciones-history-count");
    if (countEl) countEl.innerText = `(${actuacionDates.length})`;

    const tbody = document.getElementById("marcha-actuaciones-history-table-body");
    const emptyState = document.getElementById("marcha-actuaciones-history-empty");
    const tableCard = tbody.closest(".card-table");
    tbody.innerHTML = "";

    if (actuacionDates.length === 0) {
        emptyState.classList.remove("hidden");
        tableCard.classList.add("hidden");
    } else {
        emptyState.classList.add("hidden");
        tableCard.classList.remove("hidden");

        actuacionDates.forEach(date => {
            const sessionInfo = state.sessionTypes[date];
            const actuacionName = sessionInfo.name || "Actuación";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="font-weight: 600;">${escapeHtml(actuacionName)}</td>
                <td style="white-space: nowrap; color: var(--text-secondary);">${formatDateSpanish(date)}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// ==========================================================================
// SECCIÓN: CALENDARIO MENSUAL Y OBJETIVOS
// ==========================================================================
function openQuickSessionModalForDate(dateKey) {
    if (!dateKey) return;
    state.isAddingNewSession = true;
    state.currentDate = dateKey;

    const attendanceDateEl = document.getElementById("attendance-date");
    if (attendanceDateEl) {
        attendanceDateEl.value = dateKey;
    }

    const modalQuickSession = document.getElementById("modal-quick-session");
    if (!modalQuickSession) return;

    const titleEl = document.getElementById("quick-session-title");
    if (titleEl) {
        titleEl.innerText = `Configurar Sesión - ${formatDateSpanish(dateKey)}`;
    }

    const actuacionNameEl = document.getElementById("quick-session-actuacion-name");
    if (actuacionNameEl) {
        actuacionNameEl.value = "";
    }

    const tripInputEl = document.getElementById("quick-session-trip-input");
    if (tripInputEl) {
        tripInputEl.checked = false;
    }

    const typeEl = document.getElementById("quick-session-type");
    if (typeEl) {
        typeEl.value = "ensayo-general";
    }

    renderRehearsalLocationOptions();
    setTimeInputsFromValue("quick-session-start-hour", "quick-session-start-min", "quick-session-end-hour", "quick-session-end-min", "");

    const actuacionGroup = document.getElementById("quick-session-actuacion-group");
    if (actuacionGroup) {
        actuacionGroup.classList.add("hidden");
    }

    const locationGroup = document.getElementById("quick-session-location-group");
    if (locationGroup) {
        locationGroup.classList.remove("hidden");
    }

    const timeGroup = document.getElementById("quick-session-time-group");
    if (timeGroup) {
        timeGroup.classList.remove("hidden");
    }

    modalQuickSession.classList.add("active");
}

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
        const prevDateKey = `${prevYear}-${prevMonthStr}-${prevDayStr}`;
        dayCell.setAttribute("data-date", prevDateKey);
        dayCell.addEventListener("click", () => openQuickSessionModalForDate(prevDateKey));
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
        dayCell.addEventListener("click", () => openQuickSessionModalForDate(dateKey));

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
        const nextDateKey = `${nextYear}-${nextMonthStr}-${nextDayStr}`;
        dayCell.setAttribute("data-date", nextDateKey);
        dayCell.addEventListener("click", () => openQuickSessionModalForDate(nextDateKey));
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

const WEEKLY_GOALS_MONTH_ORDER = [
    "Septiembre", "Octubre", "Noviembre", "Diciembre",
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"
];

function getWeeksGroupedBySeason(seasonLabel) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const grouped = {};
    months.forEach(m => grouped[m] = []);

    const { year1, year2 } = getSeasonBounds(seasonLabel);
    if (isNaN(year1) || isNaN(year2)) return grouped;

    // Empezar el 1 de Septiembre del primer año de la temporada
    let d = new Date(year1, 8, 1);

    // Retroceder al lunes de la semana que contiene el 1 de Septiembre
    const dayOfWeek = d.getDay(); // 0 = Domingo, 1 = Lunes...
    const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    d = new Date(year1, 8, diff);

    // La temporada termina el 31 de Agosto del segundo año
    const end = new Date(year2, 8, 7);
    while (d < end) {
        const monday = new Date(d);
        const sunday = new Date(d);
        sunday.setDate(monday.getDate() + 6);

        const monthName = months[monday.getMonth()];
        const mondayInSeason = (monday.getFullYear() === year1 && monday.getMonth() >= 8) || (monday.getFullYear() === year2 && monday.getMonth() < 8);

        if (mondayInSeason) {
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

// Genera un rango fijo de temporadas (2 anteriores, la actual y la siguiente) para el selector de planificación semanal.
function getWeeklyGoalsSeasonOptions() {
    const current = getCurrentSeasonLabel();
    const { year1 } = getSeasonBounds(current);
    const seasons = [];
    for (let offset = -2; offset <= 1; offset++) {
        seasons.push(`${year1 + offset}-${year1 + offset + 1}`);
    }
    return seasons;
}

function populateWeeklyGoalsSeasonSelect(selectEl) {
    if (!selectEl) return;
    const seasons = getWeeklyGoalsSeasonOptions();
    const currentSeason = getCurrentSeasonLabel();
    const optionsHtml = seasons.map(s => `<option value="${s}"${s === currentSeason ? " selected" : ""}>${s}</option>`).join("");
    if (selectEl.innerHTML !== optionsHtml) {
        const previousValue = selectEl.value;
        selectEl.innerHTML = optionsHtml;
        if (seasons.includes(previousValue)) selectEl.value = previousValue;
    }
}

function renderWeeklyGoalsList() {
    const container = document.getElementById("weekly-goals-container");
    if (!container) return;

    const yearSelect = document.getElementById("weekly-goals-year-select");
    populateWeeklyGoalsSeasonSelect(yearSelect);
    const season = yearSelect.value || getCurrentSeasonLabel();

    container.innerHTML = "";

    const weeksGrouped = getWeeksGroupedBySeason(season);

    WEEKLY_GOALS_MONTH_ORDER.forEach(month => {
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
        renderMarchasList();
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
    const m = state.musicians.find(mus => String(mus.id) === String(musicianId));
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
        
        if (sourceType === "seat" && sourceLineStr !== undefined && sourceLineStr !== null) {
            const sourceLine = parseInt(sourceLineStr, 10);
            if (!isNaN(sourceLine) && state.formacionDesfile[sourceLine]) {
                // Buscar la posición del músico arrastrado en la línea de origen
                const sourceSeatIdx = state.formacionDesfile[sourceLine].indexOf(draggedMusicianId);
                
                if (sourceSeatIdx !== -1) {
                    // Intercambiar músicos en los dos puestos
                    state.formacionDesfile[lineIndex][seatIndex] = draggedMusicianId;
                    state.formacionDesfile[sourceLine][sourceSeatIdx] = musicianId;
                }
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
    const m = state.musicians.find(mus => String(mus.id) === String(musicianId));
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
        
        if (sourceType === "seat" && sourceLineStr !== undefined && sourceLineStr !== null) {
            if (sourceLineStr === "director") {
                // Intercambiar (Swap): el músico arrastrado es el Director
                const oldDirectorId = state.directorConcierto;
                const oldMusicianId = musicianId;
                
                // El músico de este asiento pasa a ser Director (o null si el asiento estaba libre)
                state.directorConcierto = oldMusicianId || null;
                // El antiguo director pasa a ocupar este asiento de concierto
                state.formacionConcierto[lineIndex][seatIndex] = oldDirectorId;
            } else {
                const sourceLine = parseInt(sourceLineStr, 10);
                if (!isNaN(sourceLine) && state.formacionConcierto[sourceLine]) {
                    const sourceSeatIdx = state.formacionConcierto[sourceLine].indexOf(draggedMusicianId);
                    
                    if (sourceSeatIdx !== -1) {
                        // Intercambiar músicos en los dos puestos de concierto
                        state.formacionConcierto[lineIndex][seatIndex] = draggedMusicianId;
                        state.formacionConcierto[sourceLine][sourceSeatIdx] = musicianId;
                    }
                }
            }
        } else if (sourceType === "roster") {
            // Reemplazar músico en este puesto (quitar del director si estaba allí)
            if (state.directorConcierto === draggedMusicianId) {
                state.directorConcierto = null;
            }
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
        const m = state.musicians.find(mus => String(mus.id) === String(musicianId));
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
        
        const oldDirectorId = state.directorConcierto;
        
        if (sourceType === "seat" && sourceLineStr !== undefined && sourceLineStr !== "director") {
            const sourceLine = parseInt(sourceLineStr, 10);
            const sourceSeatIdx = state.formacionConcierto[sourceLine] ? state.formacionConcierto[sourceLine].indexOf(draggedMusicianId) : -1;
            
            // Quitar el músico arrastrado de su fila actual
            for (let i = 0; i < state.formacionConcierto.length; i++) {
                state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== draggedMusicianId);
            }
            
            if (sourceSeatIdx !== -1 && !isNaN(sourceLine) && state.formacionConcierto[sourceLine]) {
                if (oldDirectorId) {
                    // Swap: colocar el director anterior en la silla de concierto que deja libre el músico
                    state.formacionConcierto[sourceLine].splice(sourceSeatIdx, 0, oldDirectorId);
                }
            }
        } else {
            // Arrastrado desde el roster
            for (let i = 0; i < state.formacionConcierto.length; i++) {
                state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== draggedMusicianId);
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
            const m = state.musicians.find(mus => String(mus.id) === String(musicianId));
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
    const m = musicianId ? state.musicians.find(x => String(x.id) === String(musicianId)) : null;
    
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
    
    if (seatId === "seat-director") {
        const oldDirectorId = state.directorConcierto;
        if (musicianId && oldDirectorId && musicianId !== oldDirectorId) {
            let foundLine = -1;
            let foundIdx = -1;
            for (let i = 0; i < state.formacionConcierto.length; i++) {
                const idx = state.formacionConcierto[i].indexOf(musicianId);
                if (idx !== -1) {
                    foundLine = i;
                    foundIdx = idx;
                    break;
                }
            }
            if (foundLine !== -1 && foundIdx !== -1) {
                state.formacionConcierto[foundLine][foundIdx] = oldDirectorId;
            }
        }
        if (musicianId) {
            for (let i = 0; i < state.formacionConcierto.length; i++) {
                state.formacionConcierto[i] = state.formacionConcierto[i].filter(id => id !== musicianId);
            }
        }
        state.directorConcierto = musicianId || null;
    } else {
        if (musicianId) {
            if (state.directorConcierto === musicianId) {
                state.directorConcierto = null;
            }
            Object.keys(map).forEach(key => {
                if (map[key] === musicianId) {
                    map[key] = null;
                }
            });
        }
        map[seatId] = musicianId;
    }
    
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
        
        const directorMus = state.directorConcierto ? state.musicians.find(m => String(m.id) === String(state.directorConcierto)) : null;
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
    const m = musicianId ? state.musicians.find(x => String(x.id) === String(musicianId)) : null;
    
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
    const m = state.musicians.find(x => String(x.id) === String(musicianId));
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

// ==========================================================================
// CACHÉ DE ESTADÍSTICAS POR MÚSICO
// ==========================================================================
// getMusicianAttendanceMetrics/BaseMedalsData/AttendanceRank se llaman en cascada
// unas a otras para calcular rankings e insignias (p.ej. renderStatsRanking llama a
// getMusicianMedalsData por cada músico, y esa función internamente vuelve a recorrer
// TODOS los músicos para calcular el ranking). Sin caché, esto provocaba recalcular el
// historial completo de asistencia decenas de veces por cada carga de la página de
// Estadísticas. La caché se invalida explícitamente (invalidateMusicianStatsCache) en
// cada listener de sincronización con la nube y en las pantallas que la consumen, así
// que dentro de un mismo "ciclo" de datos siempre se recalcula al menos una vez.
let _musicianStatsCache = {
    allDates: null,
    metrics: new Map(),
    streak: new Map(),
    baseMedals: new Map(),
    rankList: null
};

function invalidateMusicianStatsCache() {
    _musicianStatsCache = {
        allDates: null,
        metrics: new Map(),
        streak: new Map(),
        baseMedals: new Map(),
        rankList: null
    };
}

function getAllSessionDatesCached() {
    if (!_musicianStatsCache.allDates) {
        _musicianStatsCache.allDates = Array.from(new Set([
            ...Object.keys(state.sessionTypes || {}),
            ...Object.keys(state.attendance || {})
        ]));
    }
    return _musicianStatsCache.allDates;
}

function getMusicianAttendanceMetrics(musicianId, dateFilterFn = null) {
    // Solo se cachea la variante sin filtro de fechas (la que se recalcula en cascada
    // desde el ranking y las insignias); las llamadas con filtro son puntuales (una por
    // músico) y no forman parte del cuello de botella.
    if (!dateFilterFn && _musicianStatsCache.metrics.has(musicianId)) {
        return _musicianStatsCache.metrics.get(musicianId);
    }

    const result = computeMusicianAttendanceMetrics(musicianId, dateFilterFn);

    if (!dateFilterFn) {
        _musicianStatsCache.metrics.set(musicianId, result);
    }

    return result;
}

function computeMusicianAttendanceMetrics(musicianId, dateFilterFn = null) {
    const musician = state.musicians ? state.musicians.find(m => String(m.id) === String(musicianId)) : null;
    if (!musician) {
        return {
            totalConvocated: 0,
            attended: 0,
            absent: 0,
            justified: 0,
            attendedPerformances: 0,
            totalPerformances: 0,
            attendancePct: 100
        };
    }

    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    const allDates = getAllSessionDatesCached();

    let totalConvocated = 0;
    let attended = 0;
    let absent = 0;
    let justified = 0;
    let attendedPerformances = 0;
    let totalPerformances = 0;

    allDates.forEach(date => {
        if (!isSessionConcluded(date)) return;
        if (dateFilterFn && !dateFilterFn(date)) return;
        if (isMusicianOnLeaveOnDate(musician, date)) return; // De baja: la fecha no cuenta ni a favor ni en contra

        const session = state.sessionTypes ? state.sessionTypes[date] : null;
        const sessionObj = session || { type: "ensayo", subtype: "general" };

        const isSpecial = sessionObj.type === "ensayo" && sessionObj.subtype && sessionObj.subtype !== "general" && sessionObj.convocatedVoices && sessionObj.convocatedVoices.length > 0;
        if (isSpecial && !sessionObj.convocatedVoices.includes(musician.instrument)) {
            return;
        }

        totalConvocated++;
        if (sessionObj.type === "actuacion") {
            totalPerformances++;
        }

        const dayRecord = state.attendance ? state.attendance[date] : null;
        const record = dayRecord ? dayRecord[musicianId] : null;

        if (record && record.status === "present") {
            attended++;
            if (sessionObj.type === "actuacion") {
                attendedPerformances++;
            }
        } else if (record && record.status === "absent") {
            if (record.justified) {
                justified++;
            } else {
                absent++;
            }
        } else {
            absent++;
        }
    });

    const attendancePct = totalConvocated > 0 ? (attended / totalConvocated) * 100 : 100;

    return {
        totalConvocated,
        attended,
        absent,
        justified,
        attendedPerformances,
        totalPerformances,
        attendancePct
    };
}

// Suma las estrellas de las insignias desbloqueadas (igual que se muestra en Mi Ficha / Top 25),
// anulando el total si el músico tiene activa la alerta "Volver...a ensayar".
function countUnlockedBadgeStars(medalsData) {
    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);
    if (hasVolverEnsayar) return 0;
    return medalsData.reduce((acc, m) => {
        if (!m.unlocked || m.isNegative) return acc;
        return acc + (m.stars || 1);
    }, 0);
}

// Calcula la posición (1 = mejor) de un músico en el ranking de asistencia de la banda,
// usando EXACTAMENTE el mismo criterio de ordenación que el panel "Top 25 Asistencia" de
// Mi Ficha (renderComponenteRanking): % de asistencia, número de insignias, % exacto, racha y nombre.
// Para el número de insignias se usa getMusicianBaseMedalsData (todas las insignias EXCEPTO "Top"),
// de forma que la insignia "Top" no se cuenta a sí misma y no hay referencia circular.
function getMusicianAttendanceRank(musicianId) {
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return null;

    // El ranking completo es el mismo para todos los músicos que lo consultan dentro de
    // un mismo ciclo de datos, así que se calcula una única vez y se reutiliza (en vez de
    // recorrer y ordenar TODA la plantilla por cada músico que pide su posición).
    if (!_musicianStatsCache.rankList) {
        const ranked = (state.musicians || []).map(m => {
            const metrics = getMusicianAttendanceMetrics(m.id);
            return {
                id: m.id,
                name: m.name,
                attendancePct: metrics.attendancePct,
                streak: calculateMusicianStreak(m.id),
                badgesCount: countUnlockedBadgeStars(getMusicianBaseMedalsData(m.id))
            };
        });

        ranked.sort((a, b) => {
            const roundDiff = Math.round(b.attendancePct) - Math.round(a.attendancePct);
            if (roundDiff !== 0) return roundDiff;

            if (b.badgesCount !== a.badgesCount) return b.badgesCount - a.badgesCount;

            const exactDiff = b.attendancePct - a.attendancePct;
            if (Math.abs(exactDiff) > 0.0001) return exactDiff;

            if (b.streak !== a.streak) return b.streak - a.streak;

            return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        });

        _musicianStatsCache.rankList = ranked;
    }

    const idx = _musicianStatsCache.rankList.findIndex(r => String(r.id) === String(musicianId));
    return idx === -1 ? null : idx + 1;
}

// Calcula todas las insignias EXCEPTO "Top". Se usa tanto para mostrar la ficha del músico
// como, internamente, para calcular el número de insignias de cada músico a la hora de
// desempatar el ranking de asistencia (ver getMusicianAttendanceRank) sin que la insignia
// "Top" se cuente a sí misma (lo que crearía una referencia circular).
function getMusicianBaseMedalsData(musicianId) {
    if (_musicianStatsCache.baseMedals.has(musicianId)) {
        return _musicianStatsCache.baseMedals.get(musicianId);
    }
    const result = computeMusicianBaseMedalsData(musicianId);
    _musicianStatsCache.baseMedals.set(musicianId, result);
    return result;
}

function computeMusicianBaseMedalsData(musicianId) {
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return [];

    const currentStreak = calculateMusicianStreak(musicianId);
    
    const metrics = getMusicianAttendanceMetrics(musicianId);
    const totalConvocated = metrics.totalConvocated;
    const attended = metrics.attended;
    const absent = metrics.absent;
    const justified = metrics.justified;
    const attendedPerformances = metrics.attendedPerformances;
    const totalPerformances = metrics.totalPerformances;
    const attendancePct = metrics.attendancePct;

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
    } else if (greenMarchas >= 60) {
        starsEstudio = 2;
        descEstudio = `Plata conseguido: Domina 60 marchas del repertorio. Domina todas (${totalMarchas}) para Oro.`;
        unlockedEstudio = true;
        nextGoalEstudio = totalMarchas;
    } else if (greenMarchas >= 50) {
        starsEstudio = 1;
        descEstudio = "Bronce conseguido: Domina 50 marchas del repertorio. Domina 60 para Plata.";
        unlockedEstudio = true;
        nextGoalEstudio = 60;
    } else {
        starsEstudio = 0;
        descEstudio = "Domina (verde) 50 marchas del repertorio para desbloquear Bronce.";
        unlockedEstudio = false;
        nextGoalEstudio = 50;
    }

    // 7. El clavo, Hasta en la sopa, God (Cálculo de asistencia perfecta mensual/consecutiva)
    // Solo cuentan los ensayos ya concluidos: un preaviso de asistencia futura no es
    // asistencia real hasta que el director pasa lista y el ensayo termina.
    const rehearsalDates = Object.keys(state.attendance)
        .filter(d => state.attendance[d] && state.attendance[d][musicianId] && state.sessionTypes[d] && state.sessionTypes[d].type === "ensayo" && isSessionConcluded(d))
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

    let starsGod = 0;
    let descGod = "";
    let unlockedGod = false;
    let nextGoalGod = 1;

    if (maxConsecutiveMonths >= 12) {
        starsGod = 3;
        descGod = "¡Insignia de Oro conseguida! 1 año completo de asistencia perfecta a los ensayos.";
        unlockedGod = true;
        nextGoalGod = 12;
    } else if (maxConsecutiveMonths >= 6) {
        starsGod = 2;
        descGod = "Insignia de Plata conseguida. 6 meses de asistencia perfecta a los ensayos. Alcanza 12 meses para el nivel Oro.";
        unlockedGod = true;
        nextGoalGod = 12;
    } else if (maxConsecutiveMonths >= 1) {
        starsGod = 1;
        descGod = "Insignia de Bronce conseguida. 1 mes de asistencia perfecta a los ensayos. Alcanza 6 meses para el nivel Plata.";
        unlockedGod = true;
        nextGoalGod = 6;
    } else {
        starsGod = 0;
        descGod = "Asiste a todos los ensayos durante 1 mes natural para desbloquear Bronce.";
        unlockedGod = false;
        nextGoalGod = 1;
    }

    // Doblete
    const performanceDateCounts = {};
    Object.keys(state.attendance).forEach(dateKey => {
        const record = state.attendance[dateKey] ? state.attendance[dateKey][musicianId] : null;
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
        const record = state.attendance[dateKey] ? state.attendance[dateKey][musicianId] : null;
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

    const TITULAR_MIN_ACTUACIONES = 3;
    Object.keys(performancesByYear).forEach(y => {
        const stats = performancesByYear[y];
        // Exige un mínimo de actuaciones en el año para evitar que un solo bolo (o pocos)
        // dispare un 100% artificial y desbloquee la insignia sin trayectoria real.
        if (stats.total >= TITULAR_MIN_ACTUACIONES) {
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
            descTitular = "Oro conseguido: Asiste al 100% de actuaciones en un año (mínimo 3 actuaciones).";
            unlockedTitular = true;
        } else if (maxTitularPct > 95) {
            starsTitular = 2;
            descTitular = "Plata conseguido: Asiste a >95% de las actuaciones en un año (mínimo 3 actuaciones). Necesitas el 100% para conseguir Oro.";
            unlockedTitular = true;
        } else if (maxTitularPct > 90) {
            starsTitular = 1;
            descTitular = "Bronce conseguido: Asiste a >90% de las actuaciones en un año (mínimo 3 actuaciones). Necesitas >95% para conseguir Plata.";
            unlockedTitular = true;
        } else {
            starsTitular = 0;
            descTitular = "Asiste a >90% de las actuaciones en un año (mínimo 3 actuaciones) para desbloquear Bronce.";
            unlockedTitular = false;
        }
    } else {
        starsTitular = 0;
        descTitular = "Asiste a >90% de las actuaciones en un año (mínimo 3 actuaciones) para desbloquear Bronce.";
        unlockedTitular = false;
    }

    // Capitán: Mayor asistencia entre tus compañeros de voz
    let capitanUnlocked = false;
    const peers = state.musicians.filter(m => m.instrument === musician.instrument);
    if (peers.length > 1) {
        let isHighest = true;
        peers.forEach(peer => {
            if (peer.id === musicianId) return;
            const peerMetrics = getMusicianAttendanceMetrics(peer.id);
            if (peerMetrics.attendancePct > attendancePct) {
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
        { id: "god", title: "Alma de la banda", icon: "👑", desc: descGod, unlocked: unlockedGod, stars: starsGod, progressPct: Math.min((maxConsecutiveMonths / nextGoalGod) * 100, 100), progressText: `${Math.min(maxConsecutiveMonths, nextGoalGod)}/${nextGoalGod} mes${nextGoalGod === 1 ? '' : 'es'}` },
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

// Devuelve todas las insignias de un músico, incluyendo "Top". El criterio para otorgar
// "Top" se basa en la posición del músico en el mismo ranking de asistencia que alimenta
// el panel "Top 25 Asistencia" de Mi Ficha (ver getMusicianAttendanceRank).
function getMusicianMedalsData(musicianId) {
    const baseMedals = getMusicianBaseMedalsData(musicianId);
    if (baseMedals.length === 0) return baseMedals;

    const attendanceRank = getMusicianAttendanceRank(musicianId);
    let starsTop = 0;
    let descTop = "";
    let unlockedTop = false;
    let progressPctTop = 0;
    let progressTextTop = "Posición no disponible";

    if (attendanceRank !== null) {
        if (attendanceRank <= 5) {
            starsTop = 3;
            unlockedTop = true;
            progressPctTop = 100;
            descTop = `Oro conseguido: estás en el Top 5 de asistencia de la banda (posición #${attendanceRank}).`;
            progressTextTop = `Posición #${attendanceRank} · Top 5`;
        } else if (attendanceRank <= 10) {
            starsTop = 2;
            unlockedTop = true;
            progressPctTop = 66;
            descTop = `Plata conseguida: estás en el Top 10 de asistencia (posición #${attendanceRank}). Sube al Top 5 para el Oro.`;
            progressTextTop = `Posición #${attendanceRank} · Top 10`;
        } else if (attendanceRank <= 25) {
            starsTop = 1;
            unlockedTop = true;
            progressPctTop = 33;
            descTop = `Bronce conseguido: estás en el Top 25 de asistencia (posición #${attendanceRank}). Sube al Top 10 para la Plata.`;
            progressTextTop = `Posición #${attendanceRank} · Top 25`;
        } else {
            starsTop = 0;
            unlockedTop = false;
            progressPctTop = 0;
            descTop = "Entra en el Top 25 de asistencia de la banda para desbloquear Bronce.";
            progressTextTop = `Posición #${attendanceRank}`;
        }
    }

    return [
        ...baseMedals,
        { id: "top", title: "Top", icon: "🥇", desc: descTop, unlocked: unlockedTop, stars: starsTop, progressPct: progressPctTop, progressText: progressTextTop }
    ];
}

function calculateMusicianStreak(musicianId) {
    if (_musicianStatsCache.streak.has(musicianId)) {
        return _musicianStatsCache.streak.get(musicianId);
    }
    const result = computeMusicianStreak(musicianId);
    _musicianStatsCache.streak.set(musicianId, result);
    return result;
}

function computeMusicianStreak(musicianId) {
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    const musician = state.musicians ? state.musicians.find(m => String(m.id) === String(musicianId)) : null;

    const dates = Object.keys(state.sessionTypes || {})
        .filter(d => {
            if (d > todayStr) return false;

            const session = state.sessionTypes[d];
            if (session && session.type !== "ensayo") return false;

            const isSpecial = session && session.subtype && session.subtype !== "general" && session.convocatedVoices && session.convocatedVoices.length > 0;
            if (isSpecial && musician && !session.convocatedVoices.includes(musician.instrument)) {
                return false;
            }

            if (musician && isMusicianOnLeaveOnDate(musician, d)) return false; // De baja: la fecha no rompe ni cuenta en la racha

            const dayRecord = state.attendance[d];
            if (!dayRecord || Object.keys(dayRecord).length === 0) return false;

            if (d === todayStr) {
                const rec = dayRecord[musicianId];
                if (!rec || (rec.status === "absent" && !rec.confirmed && !rec.takenByDirector)) {
                    return false;
                }
            }

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

function calculateMusicianBestStreak(musicianId) {
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    const dates = Object.keys(state.attendance)
        .filter(d => {
            if (!isSessionConcluded(d)) return false; // Excluir no concluidos

            const session = state.sessionTypes[d];
            if (session && session.type !== "ensayo") return false;

            const record = state.attendance[d] ? state.attendance[d][musicianId] : null;
            if (!record) return false;

            return true;
        })
        .sort((a, b) => a.localeCompare(b)); // Orden cronológico ascendente

    let maxStreak = 0;
    let currentRun = 0;

    for (const date of dates) {
        const record = state.attendance[date] ? state.attendance[date][musicianId] : null;
        if (record && record.status === "present") {
            currentRun++;
            if (currentRun > maxStreak) {
                maxStreak = currentRun;
            }
        } else {
            currentRun = 0;
        }
    }
    return maxStreak;
}

function openStreakInfoModal() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const currentStreak = calculateMusicianStreak(musicianId);
    const historicalBest = calculateMusicianBestStreak(musicianId);
    const bestStreak = Math.max(currentStreak, historicalBest);

    const countEl = document.getElementById("modal-streak-count-big");
    const msgEl = document.getElementById("modal-streak-message");
    const bestEl = document.getElementById("modal-streak-best-val");
    const modal = document.getElementById("modal-streak-info");

    if (countEl) countEl.innerText = currentStreak;
    if (bestEl) bestEl.innerText = bestStreak;

    if (msgEl) {
        if (currentStreak === 0) {
            msgEl.innerText = "¡Comienza tu racha hoy! Cada ensayo cuenta para sumar en la banda. ¡Te esperamos en el próximo!";
        } else if (currentStreak <= 3) {
            const ensayoPlural = currentStreak === 1 ? "ensayo" : "ensayos";
            msgEl.innerText = `¡Buen comienzo! Llevas ${currentStreak} ${ensayoPlural} seguidos asistiendo. Mantén el ritmo, tu esfuerzo se nota.`;
        } else if (currentStreak <= 9) {
            msgEl.innerText = `¡Enhorabuena! Llevas ${currentStreak} ensayos seguidos asistiendo. Tu presencia es muy importante para que el grupo avance y la banda suene bien.`;
        } else {
            msgEl.innerText = `¡Compromiso de hierro! 🏆 Llevas ${currentStreak} ensayos consecutivos sin faltar. Eres un pilar indispensable para la banda.`;
        }
    }

    if (modal) {
        modal.classList.add("active");
    }
}

function openInsigniasInfoModal() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const medalsData = getMusicianMedalsData(musicianId);
    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);

    const unlockedInsigniasCount = hasVolverEnsayar ? 0 : medalsData.reduce((acc, m) => {
        if (!m.unlocked || m.isNegative) return acc;
        return acc + (m.stars || 1);
    }, 0);

    const iconBigEl = document.getElementById("modal-insignias-icon-big");
    const countBigEl = document.getElementById("modal-insignias-count-big");
    const subtitleEl = document.getElementById("modal-insignias-subtitle");
    const msgEl = document.getElementById("modal-insignias-message");
    const statusBoxEl = document.getElementById("modal-insignias-status-box");
    const statusValEl = document.getElementById("modal-insignias-status-val");
    const modal = document.getElementById("modal-insignias-info");

    if (countBigEl) countBigEl.innerText = unlockedInsigniasCount;

    if (hasVolverEnsayar) {
        if (iconBigEl) iconBigEl.innerText = "⚠️";
        if (subtitleEl) {
            subtitleEl.innerText = "Insignias Suspendidas";
            subtitleEl.style.color = "var(--color-absent)";
        }
        if (msgEl) {
            msgEl.innerText = "⚠️ Tus insignias conseguidas están temporalmente suspendidas por una asistencia inferior al 50%. Recuerda que ERES IMPORTANTE para el grupo. Acude a los próximos ensayos para recuperar tu porcentaje y reactivar todos tus reconocimientos. ¡Tus compañeros cuentan contigo!";
        }
        if (statusBoxEl) {
            statusBoxEl.style.background = "rgba(231, 76, 60, 0.12)";
            statusBoxEl.style.color = "var(--color-absent)";
        }
        if (statusValEl) {
            statusValEl.innerText = "Anuladas por baja asistencia (<50%)";
        }
    } else {
        if (iconBigEl) iconBigEl.innerText = "🏅";
        if (subtitleEl) {
            subtitleEl.innerText = "Insignias Desbloqueadas";
            subtitleEl.style.color = "var(--text-secondary)";
        }
        if (statusBoxEl) {
            statusBoxEl.style.background = "rgba(212, 175, 55, 0.1)";
            statusBoxEl.style.color = "var(--color-gold)";
        }
        if (statusValEl) {
            statusValEl.innerText = `Medallero Activo (${unlockedInsigniasCount} ${unlockedInsigniasCount === 1 ? 'insignia' : 'insignias'})`;
        }

        if (msgEl) {
            if (unlockedInsigniasCount === 0) {
                msgEl.innerText = "¡Empieza tu colección de reconocimientos! Asiste a los ensayos y actuaciones y completa temporadas para desbloquear tus primeras insignias.";
            } else if (unlockedInsigniasCount <= 3) {
                msgEl.innerText = `¡Buen trabajo! Has acumulado ${unlockedInsigniasCount} ${unlockedInsigniasCount === 1 ? 'insignia' : 'insignias'}. Vas por muy buen camino en tu trayectoria con la banda. ¡Sigue sumando logros!`;
            } else if (unlockedInsigniasCount <= 7) {
                msgEl.innerText = `¡Excelente trayectoria! Cuentas con ${unlockedInsigniasCount} insignias en tu medallero. Tu constancia y compromiso enriquecen enormemente a la agrupación.`;
            } else {
                msgEl.innerText = `🏆 ¡Colección legendaria! Tienes ${unlockedInsigniasCount} insignias conseguidas. Eres un ejemplo de dedicación y fidelidad absoluta para toda la banda.`;
            }
        }
    }

    if (modal) {
        modal.classList.add("active");
    }
}

const MEDAL_TIER_DEFINITIONS = {
    racha: [
        { label: "Bronce 🥉", req: "5 ensayos consecutivos", stars: 1 },
        { label: "Plata 🥈", req: "10 ensayos consecutivos", stars: 2 },
        { label: "Oro 🥇", req: "20 ensayos consecutivos", stars: 3 }
    ],
    god: [
        { label: "Bronce 🥉", req: "Asiste a todos los ensayos durante 1 mes", stars: 1 },
        { label: "Plata 🥈", req: "Asiste a todos los ensayos durante 6 meses", stars: 2 },
        { label: "Oro 🥇", req: "Asiste a todos los ensayos durante 1 año", stars: 3 }
    ],
    asistencia: [
        { label: "Bronce 🥉", req: ">80% de asistencia general", stars: 1 },
        { label: "Plata 🥈", req: ">90% de asistencia general", stars: 2 },
        { label: "Oro 🥇", req: ">95% de asistencia general", stars: 3 }
    ],
    veterano: [
        { label: "Bronce 🥉", req: "15 asistencias totales", stars: 1 },
        { label: "Plata 🥈", req: "50 asistencias totales", stars: 2 },
        { label: "Oro 🥇", req: "100 asistencias totales", stars: 3 }
    ],
    estudio: [
        { label: "Bronce 🥉", req: "50 marchas dominadas", stars: 1 },
        { label: "Plata 🥈", req: "60 marchas dominadas", stars: 2 },
        { label: "Oro 🥇", req: "Todas las marchas del repertorio", stars: 3 }
    ],
    trotamundos: [
        { label: "Bronce 🥉", req: "10 viajes fuera de la ciudad", stars: 1 },
        { label: "Plata 🥈", req: "25 viajes fuera de la ciudad", stars: 2 },
        { label: "Oro 🥇", req: "50 viajes fuera de la ciudad", stars: 3 }
    ],
    titular: [
        { label: "Bronce 🥉", req: ">90% asistencia a actuaciones (año)", stars: 1 },
        { label: "Plata 🥈", req: ">95% asistencia a actuaciones (año)", stars: 2 },
        { label: "Oro 🥇", req: "100% asistencia a actuaciones (año)", stars: 3 }
    ],
    ruta: [
        { label: "Bronce 🥉", req: "5 viajes en bus con la banda", stars: 1 },
        { label: "Plata 🥈", req: "10 viajes en bus con la banda", stars: 2 },
        { label: "Oro 🥇", req: "20 viajes en bus con la banda", stars: 3 }
    ],
    hermandad: [
        { label: "Bronce 🥉", req: "1 convivencia / actividad extramusical", stars: 1 },
        { label: "Plata 🥈", req: "5 convivencias / actividades extramusicales", stars: 2 },
        { label: "Oro 🥇", req: "10 convivencias / actividades extramusicales", stars: 3 }
    ],
    top: [
        { label: "Bronce 🥉", req: "Top 25 de asistencia de la banda", stars: 1 },
        { label: "Plata 🥈", req: "Top 10 de asistencia de la banda", stars: 2 },
        { label: "Oro 🥇", req: "Top 5 de asistencia de la banda", stars: 3 }
    ]
};

function openSingleInsigniaDetailModal(medalId) {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const medalsData = getMusicianMedalsData(musicianId);
    const medal = medalsData.find(m => m.id === medalId);
    if (!medal) return;

    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);

    const titleEl = document.getElementById("modal-insignia-detail-title");
    const iconEl = document.getElementById("modal-insignia-detail-icon");
    const iconWrapperEl = document.getElementById("modal-insignia-detail-icon-wrapper");
    const statusBadgeEl = document.getElementById("modal-insignia-detail-status-badge");
    const descEl = document.getElementById("modal-insignia-detail-desc");
    const progressTextEl = document.getElementById("modal-insignia-detail-progress-text");
    const progressBarEl = document.getElementById("modal-insignia-detail-progress-bar");
    const tiersSectionEl = document.getElementById("modal-insignia-detail-tiers-section");
    const tiersContainerEl = document.getElementById("modal-insignia-detail-tiers-container");
    const modal = document.getElementById("modal-single-insignia-detail");

    if (titleEl) titleEl.innerText = medal.title;
    if (iconEl) iconEl.innerText = medal.icon;
    if (descEl) descEl.innerText = medal.desc;
    if (progressTextEl) progressTextEl.innerText = medal.progressText;
    if (progressBarEl) progressBarEl.style.width = `${medal.progressPct}%`;

    // Estilo del icono circunscrito principal
    if (iconWrapperEl) {
        if (hasVolverEnsayar && medal.unlocked && !medal.isNegative) {
            iconWrapperEl.style.background = "rgba(231, 76, 60, 0.15)";
            iconWrapperEl.style.border = "2px solid #E74C3C";
            iconWrapperEl.style.boxShadow = "0 0 12px rgba(231, 76, 60, 0.3)";
            iconWrapperEl.style.opacity = "1";
            iconWrapperEl.style.filter = "none";
        } else if (medal.isNegative && medal.unlocked) {
            iconWrapperEl.style.background = "rgba(231, 76, 60, 0.15)";
            iconWrapperEl.style.border = "2px solid #E74C3C";
            iconWrapperEl.style.boxShadow = "0 0 12px rgba(231, 76, 60, 0.3)";
            iconWrapperEl.style.opacity = "1";
            iconWrapperEl.style.filter = "none";
        } else if (medal.unlocked) {
            iconWrapperEl.style.background = "rgba(212, 175, 55, 0.15)";
            iconWrapperEl.style.border = "2px solid #D4AF37";
            iconWrapperEl.style.boxShadow = "0 0 12px rgba(212, 175, 55, 0.3)";
            iconWrapperEl.style.opacity = "1";
            iconWrapperEl.style.filter = "none";
        } else {
            iconWrapperEl.style.background = "rgba(255, 255, 255, 0.03)";
            iconWrapperEl.style.border = "2px solid rgba(255, 255, 255, 0.12)";
            iconWrapperEl.style.boxShadow = "none";
            iconWrapperEl.style.opacity = "0.5";
            iconWrapperEl.style.filter = "grayscale(1)";
        }
    }

    // Estado general
    if (statusBadgeEl) {
        if (hasVolverEnsayar && medal.unlocked && !medal.isNegative) {
            statusBadgeEl.innerText = "Anulada";
            statusBadgeEl.style.background = "rgba(231, 76, 60, 0.15)";
            statusBadgeEl.style.color = "var(--color-absent)";
            statusBadgeEl.style.border = "1px solid rgba(231, 76, 60, 0.4)";
        } else if (medal.isNegative && medal.unlocked) {
            statusBadgeEl.innerText = "Alerta Activa";
            statusBadgeEl.style.background = "rgba(231, 76, 60, 0.15)";
            statusBadgeEl.style.color = "var(--color-absent)";
            statusBadgeEl.style.border = "1px solid rgba(231, 76, 60, 0.4)";
        } else if (medal.unlocked) {
            const starsText = medal.stars ? ` (${'★'.repeat(medal.stars)})` : '';
            statusBadgeEl.innerText = `Conseguida${starsText}`;
            statusBadgeEl.style.background = "rgba(212, 175, 55, 0.15)";
            statusBadgeEl.style.color = "#D4AF37";
            statusBadgeEl.style.border = "1px solid rgba(212, 175, 55, 0.4)";
        } else {
            statusBadgeEl.innerText = "Bloqueada";
            statusBadgeEl.style.background = "rgba(149, 165, 166, 0.15)";
            statusBadgeEl.style.color = "#95a5a6";
            statusBadgeEl.style.border = "1px solid rgba(149, 165, 166, 0.4)";
        }
    }

    // Generar niveles solo si la insignia tiene sistema de estrellas
    const tierDefs = MEDAL_TIER_DEFINITIONS[medal.id];
    if (tierDefs && tierDefs.length > 0) {
        if (tiersSectionEl) tiersSectionEl.style.display = "block";
        if (tiersContainerEl) {
            tiersContainerEl.innerHTML = "";
            const TIER_COLORS = {
                1: { color: "#CD7F32", bg: "rgba(205, 127, 50, 0.15)", border: "#CD7F32" }, // Bronce
                2: { color: "#C0C0C0", bg: "rgba(192, 192, 192, 0.15)", border: "#C0C0C0" }, // Plata
                3: { color: "#FFD700", bg: "rgba(255, 215, 0, 0.15)", border: "#FFD700" }   // Oro
            };

            tierDefs.forEach(tier => {
                const isAchieved = !hasVolverEnsayar && medal.unlocked && (medal.stars >= tier.stars);
                const isSuspended = hasVolverEnsayar && medal.unlocked && (medal.stars >= tier.stars);

                let badgeHTML = '';
                if (isSuspended) {
                    badgeHTML = '<span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 10px; font-weight: 600; background: rgba(231, 76, 60, 0.15); color: var(--color-absent);">⚠️ Anulada</span>';
                } else if (isAchieved) {
                    badgeHTML = '<span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 10px; font-weight: 600; background: rgba(46, 204, 113, 0.15); color: #2ecc71;">✔ Conseguido</span>';
                } else {
                    badgeHTML = '<span style="font-size: 0.72rem; padding: 2px 7px; border-radius: 10px; font-weight: 600; background: rgba(255, 255, 255, 0.05); color: var(--text-secondary);">🔒 Pendiente</span>';
                }

                const tc = TIER_COLORS[tier.stars] || TIER_COLORS[1];

                const tierRow = document.createElement("div");
                tierRow.style.cssText = "background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 10px; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between; gap: 10px;";
                tierRow.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid ${tc.border}; background: ${tc.bg}; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
                            <span style="font-size: 0.95rem; line-height: 1;">${medal.icon}</span>
                            <span style="font-size: 0.58rem; color: ${tc.color}; font-weight: 800; line-height: 1; margin-top: 1px;">${'★'.repeat(tier.stars)}</span>
                        </div>
                        <span style="color: var(--text-primary); font-size: 0.82rem; font-weight: 500; line-height: 1.3;">${tier.req}</span>
                    </div>
                    <div style="flex-shrink: 0;">${badgeHTML}</div>
                `;
                tiersContainerEl.appendChild(tierRow);
            });
        }
    } else {
        if (tiersSectionEl) tiersSectionEl.style.display = "none";
    }

    if (modal) modal.classList.add("active");
}



function renderComponentFicha() {
    invalidateMusicianStatsCache();
    const musicianId = sessionStorage.getItem("yacente_musician_id") || localStorage.getItem("yacente_musician_id");
    const musician = state.musicians.find(m => m.id == musicianId);
    if (!musician) {
        showToast("Músico no encontrado. Iniciando cierre de sesión.", "error");
        logoutComponent();
        return;
    }
    
    const parts = musician.name.trim().split(" ");
    const initials = parts.map(p => p[0]).slice(0, 2).join("").toUpperCase();
    
    const avatarLettersEl = document.getElementById("comp-avatar-letters");
    const avatarImgEl = document.getElementById("comp-avatar-img");
    const avatarWrapperEl = document.querySelector(".comp-profile-avatar-wrapper");
    if (avatarWrapperEl) {
        avatarWrapperEl.style.cursor = "pointer";
        avatarWrapperEl.title = "Ver foto en grande";
        avatarWrapperEl.onclick = () => openPhotoPreviewModal(musicianId);
    }
    if (musician.photo) {
        if (avatarImgEl) {
            avatarImgEl.src = musician.photo;
            avatarImgEl.classList.remove("hidden");
            avatarImgEl.style.cursor = "pointer";
            avatarImgEl.onclick = () => openPhotoPreviewModal(musicianId);
        }
        if (avatarLettersEl) {
            avatarLettersEl.classList.add("hidden");
        }
    } else {
        if (avatarLettersEl) {
            avatarLettersEl.innerText = initials;
            avatarLettersEl.classList.remove("hidden");
            avatarLettersEl.style.cursor = "pointer";
            avatarLettersEl.onclick = () => openPhotoPreviewModal(musicianId);
        }
        if (avatarImgEl) {
            avatarImgEl.classList.add("hidden");
        }
    }
    
    document.getElementById("comp-profile-name").innerText = musician.name;
    document.getElementById("comp-profile-details").innerText = `${musician.instrument} • ${musician.role || "Músico"}`;

    const bajaBanner = document.getElementById("comp-baja-banner");
    if (bajaBanner) {
        const todayStr = new Date().toISOString().split("T")[0];
        bajaBanner.classList.toggle("hidden", !isMusicianOnLeaveOnDate(musician, todayStr));
    }

    const currentStreak = calculateMusicianStreak(musicianId);
    document.getElementById("comp-streak-val").innerText = currentStreak;
    
    const streakBadge = document.getElementById("comp-streak-badge");
    if (streakBadge) {
        streakBadge.style.cursor = "pointer";
        streakBadge.onclick = () => openStreakInfoModal();
    }
    
    const metrics = getMusicianAttendanceMetrics(musicianId);
    const totalConvocated = metrics.totalConvocated;
    const attended = metrics.attended;
    const absent = metrics.absent;
    const justified = metrics.justified;
    const attendancePct = metrics.attendancePct;

    // Poblar debug box
    const debugBox = document.getElementById("ficha-debug-box");
    if (debugBox) {
        const dNow = new Date();
        const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;
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
    let strokeColor = "#2ECC71"; // green default
    if (attendancePct < 50) {
        strokeColor = "#E74C3C"; // red
    } else if (attendancePct < 80) {
        strokeColor = "#F1C40F"; // yellow
    }

    const percentageText = document.getElementById("comp-percentage-text");
    if (percentageText) {
        percentageText.textContent = `${Math.round(attendancePct)}%`;
        percentageText.style.removeProperty("fill");
    }
    
    const progressPath = document.getElementById("comp-progress-path");
    if (progressPath) {
        progressPath.setAttribute("stroke-dasharray", `${Math.round(attendancePct)}, 100`);
        progressPath.style.setProperty("stroke", strokeColor, "important");
        progressPath.style.removeProperty("filter");
    }
    
    const progressCircle = document.getElementById("comp-progress-circle");
    if (progressCircle) {
        const svgEl = progressCircle.querySelector(".circular-chart");
        if (svgEl) {
            svgEl.classList.remove("gold", "red", "yellow", "green");
            if (attendancePct < 50) {
                svgEl.classList.add("red");
            } else if (attendancePct < 80) {
                svgEl.classList.add("yellow");
            } else {
                svgEl.classList.add("green");
            }
        }
    }
    
    // --- EVALUAR MEDALLAS / INSIGNIAS ---
    const medalsData = getMusicianMedalsData(musicianId);
    const hasVolverEnsayar = medalsData.some(m => m.id === "volver_ensayar" && m.unlocked);

    medalsData.forEach(medal => {
        const medalCard = document.getElementById(`medal-${medal.id}`);
        if (medalCard) {
            medalCard.style.cursor = "pointer";
            medalCard.onclick = () => openSingleInsigniaDetailModal(medal.id);
            if (medal.isNegative) {
                medalCard.className = `medal-card ${medal.unlocked ? 'negative-unlocked' : 'locked'}`;
            } else {
                let activeClasses = `medal-card ${medal.unlocked ? 'unlocked' : 'locked'}`;
                if (medal.unlocked && medal.stars > 0) {
                    activeClasses += ` unlocked-${medal.stars}star`;
                }
                if (hasVolverEnsayar && medal.unlocked) {
                    activeClasses += ` annulled-medal`;
                }
                medalCard.className = activeClasses;
            }
            const descEl = medalCard.querySelector(".medal-desc");
            if (descEl && medal.desc) {
                descEl.innerText = (hasVolverEnsayar && medal.unlocked && !medal.isNegative)
                    ? "Insignia conseguida anulada temporalmente debido a la alerta de baja asistencia (Volver... a ensayar)."
                    : medal.desc;
            }
            const progressEl = medalCard.querySelector(".progress");
            if (progressEl) progressEl.style.width = `${medal.progressPct}%`;
            const textEl = medalCard.querySelector(".medal-progress-text");
            if (textEl) {
                if (hasVolverEnsayar && medal.unlocked && !medal.isNegative) {
                    textEl.innerHTML = '<span class="annulled-status-text" style="color: var(--color-absent); font-weight: 700;">Anulada</span>';
                } else {
                    textEl.innerText = medal.progressText;
                }
            }

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
        compInsigniasBadge.style.cursor = "pointer";
        compInsigniasBadge.onclick = () => openInsigniasInfoModal();
        const iconEl = compInsigniasBadge.querySelector(".insignias-badge-icon");
        if (hasVolverEnsayar) {
            compInsigniasBadge.classList.add("alarm-red");
            if (iconEl) iconEl.innerText = "⚠️";
        } else {
            compInsigniasBadge.classList.remove("alarm-red");
            if (iconEl) iconEl.innerText = "🏅";
        }
    }



    // Actualizar badge de notificaciones
    updateNotificationsBadge();

    // Renderizar ranking de los 25 mejores
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
        
        const metrics = getMusicianAttendanceMetrics(musicianId);
        const attendancePct = metrics.attendancePct;
        const currentStreak = calculateMusicianStreak(musicianId);
        
        // Insignias mostradas en la tarjeta (incluye "Top"): total real de insignias conseguidas.
        const medalsData = getMusicianMedalsData(musicianId);
        const unlockedInsigniasCount = countUnlockedBadgeStars(medalsData);

        // Insignias usadas para desempatar el ranking: excluye "Top" para que esta insignia
        // no se otorgue en base a un ranking que ella misma influye (ver getMusicianAttendanceRank).
        const baseBadgesCountForSort = countUnlockedBadgeStars(getMusicianBaseMedalsData(musicianId));

        return {
            id: musicianId,
            name: musician.name,
            photo: musician.photo || "",
            attendancePct,
            streak: currentStreak,
            badgesCount: unlockedInsigniasCount,
            baseBadgesCountForSort
        };
    });

    // Ordenar de mayor a menor porcentaje de asistencia.
    // Solo en caso de empate en el porcentaje de asistencia, se prioriza al músico con más insignias acumuladas.
    rankingData.sort((a, b) => {
        const roundDiff = Math.round(b.attendancePct) - Math.round(a.attendancePct);
        if (roundDiff !== 0) {
            return roundDiff;
        }

        // 1. Criterio de desempate por empate en % de asistencia: Mayor número de insignias acumuladas
        if (b.baseBadgesCountForSort !== a.baseBadgesCountForSort) {
            return b.baseBadgesCountForSort - a.baseBadgesCountForSort;
        }

        // 2. Si empatan también en insignias, comparar el porcentaje decimal exacto
        const exactDiff = b.attendancePct - a.attendancePct;
        if (Math.abs(exactDiff) > 0.0001) {
            return exactDiff;
        }

        // 3. Tercer desempate: Mayor racha de asistencia
        if (b.streak !== a.streak) {
            return b.streak - a.streak;
        }

        // 4. Cuarto desempate: Orden alfabético por nombre
        return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    });

    // Quedarse con los 25 mejores
    const top25 = rankingData.slice(0, 25);

    top25.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "comp-ranking-card";
        card.style.cursor = "pointer";

        // Estilo especial para el top 3
        let rankBadgeClass = "rank-badge";
        if (index === 0) rankBadgeClass += " rank-gold";
        else if (index === 1) rankBadgeClass += " rank-silver";
        else if (index === 2) rankBadgeClass += " rank-bronze";

        const avatarMarkup = item.photo
            ? `<img src="${item.photo}" alt="${item.name}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 50%; flex-shrink: 0; border: 1px solid var(--color-gold);">`
            : `<div style="width: 30px; height: 30px; border-radius: 50%; background: rgba(212, 175, 55, 0.15); color: var(--color-gold); border: 1px solid rgba(212, 175, 55, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 700; flex-shrink: 0;">${getInitials(item.name)}</div>`;

        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                <div class="${rankBadgeClass}">${index + 1}</div>
                ${avatarMarkup}
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

        card.addEventListener("click", () => openPeerDetailModal(item.id));

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
    
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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

    // Obtener todas las fechas en las que el músico está convocado (sólo pasadas, anteriores a hoy)
    const allConvocatedDates = allUniqueDates.filter(date => {
        if (!isSessionConcluded(date)) return false;
        
        const session = state.sessionTypes[date];
        if (session && session.type === "ensayo" && session.subtype !== "general" && session.convocatedVoices && session.convocatedVoices.length > 0) {
            if (!session.convocatedVoices.includes(musician.instrument)) {
                return false;
            }
        }
        return true;
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
        
        let sessionTitle = session.name || (session.type === "ensayo" ? typeLabel : "Actuación Oficial");
        const locationText = session.location || (session.type === "ensayo" ? "Parking" : "");
        const timeText = session.time ? ` • ${session.time}` : "";
        const subtitleText = locationText ? `${locationText}${timeText}` : (session.time ? `${session.time}` : typeLabel);
        
        const row = document.createElement("div");
        row.className = "comp-session-row comp-session-row-clickable";
        row.style.display = "flex";
        row.style.alignItems = "stretch";
        row.style.gap = "10px";
        row.style.width = "100%";
        row.style.cursor = "pointer";
        row.title = "Ver asistencia general y marchas tocadas";
        
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
                        <span class="comp-session-location" style="font-size: 0.78rem; color: var(--text-muted); font-weight: 500; display: block; margin-top: 2px;">${subtitleText}</span>
                    </div>
                </div>
                <div class="comp-session-status-row" style="display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0;">
                    <span class="comp-attendance-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
        `;
        
        row.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openCompRehearsalDetailModal(date);
        });

        container.appendChild(row);
    });
}

function openCompRehearsalDetailModal(date) {
    const modal = document.getElementById("modal-comp-rehearsal-detail");
    if (!modal) return;

    const sessionInfo = state.sessionTypes ? state.sessionTypes[date] : null;
    const sessionType = (sessionInfo && sessionInfo.type) || "ensayo";
    const rawDate = date.split("_")[0];
    
    // Check repertoire/played marchas: for performance check actuacionRepertoire first, then playedMarchas
    let playedTodayIds = [];
    if (sessionType === "actuacion") {
        playedTodayIds = (state && state.actuacionRepertoire && (state.actuacionRepertoire[date] || state.actuacionRepertoire[rawDate])) || [];
        if (playedTodayIds.length === 0) {
            playedTodayIds = (state && state.playedMarchas && (state.playedMarchas[date] || state.playedMarchas[rawDate])) || [];
        }
    } else {
        playedTodayIds = (state && state.playedMarchas && (state.playedMarchas[date] || state.playedMarchas[rawDate])) || [];
        if (playedTodayIds.length === 0) {
            playedTodayIds = (state && state.actuacionRepertoire && (state.actuacionRepertoire[date] || state.actuacionRepertoire[rawDate])) || [];
        }
    }

    // Title and Subtitle
    const titleEl = document.getElementById("comp-rehearsal-detail-title");
    const subtitleEl = document.getElementById("comp-rehearsal-detail-subtitle");
    
    const formattedDate = formatDateSpanish(date);
    if (titleEl) {
        titleEl.innerText = sessionType === "actuacion" ? `Actuación del ${formattedDate}` : `Ensayo del ${formattedDate}`;
    }

    let subtypeText = sessionType === "actuacion" ? "Actuación Oficial" : "Ensayo General";
    if (sessionInfo) {
        if (sessionType === "ensayo" && sessionInfo.subtype && sessionInfo.subtype !== "general") {
            const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
            const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
            subtypeText = `Ensayo por Voces (${convocated.join(", ")})`;
        } else if (sessionInfo.name) {
            subtypeText = sessionInfo.name;
        }
    }
    const locationVal = sessionInfo && sessionInfo.location ? sessionInfo.location : (sessionType === "ensayo" ? "Parking" : "");
    const timeVal = sessionInfo && sessionInfo.time ? ` • ${sessionInfo.time}` : "";
    const locTimeText = locationVal ? `${locationVal}${timeVal}` : timeVal;
    
    if (subtitleEl) {
        subtitleEl.innerText = `${subtypeText}${locTimeText ? ' • ' + locTimeText : ''}`;
    }

    // Calculate attendance statistics
    const isSpecialRehearsal = isSectionRehearsal(sessionInfo);
    const convocated = isSpecialRehearsal ? (sessionInfo.convocatedVoices || []) : [];
    const dayRecord = state.attendance ? state.attendance[date] : null;

    let presentCount = 0;
    let justifiedCount = 0;
    let absentCount = 0;
    let totalConvocated = 0;

    const musiciansList = (state && state.musicians) || [];
    musiciansList.forEach(m => {
        if (!m) return;
        if (isSpecialRehearsal && (!m.instrument || !convocated.includes(m.instrument))) {
            return;
        }
        // Excluir músicos en baja temporal en esta fecha (mismo criterio que
        // updateAttendanceStatsRibbon, renderEnsayosList y openRehearsalDetailModal): si no,
        // cuentan como falta y bajan el porcentaje aunque estuvieran de baja ese día.
        if (isMusicianOnLeaveOnDate(m, date)) {
            return;
        }
        totalConvocated++;
        const r = dayRecord ? (dayRecord[m.id] || dayRecord[String(m.id)]) : null;
        if (r) {
            if (r.status === "present") {
                presentCount++;
            } else if (r.justified || r.status === "justified") {
                justifiedCount++;
            } else {
                absentCount++;
            }
        } else {
            absentCount++;
        }
    });

    const pct = totalConvocated > 0 ? Math.round((presentCount / totalConvocated) * 100) : 0;

    const pctEl = document.getElementById("comp-rehearsal-detail-pct");
    const countsEl = document.getElementById("comp-rehearsal-detail-counts");

    if (pctEl) {
        pctEl.innerText = `${pct}%`;
        if (pct >= 80) pctEl.style.color = "#2ecc71";
        else if (pct >= 50) pctEl.style.color = "#f1c40f";
        else pctEl.style.color = "#e74c3c";
    }
    if (countsEl) {
        countsEl.innerText = `${presentCount} presentes de ${totalConvocated} convocados`;
    }

    // Section title label update ("Repertorio" for actuacion vs "Marchas Ensayadas" for ensayo)
    const marchasLabelEl = document.getElementById("comp-rehearsal-detail-marchas-label");
    if (marchasLabelEl) {
        marchasLabelEl.innerText = sessionType === "actuacion" ? "Repertorio" : "Marchas Ensayadas";
    }

    // Render Played Marches / Repertoire List
    const marchasContainer = document.getElementById("comp-rehearsal-detail-marchas");
    if (marchasContainer) {
        marchasContainer.innerHTML = "";
        marchasContainer.style.maxHeight = "250px";
        marchasContainer.style.overflowY = "auto";

        if (playedTodayIds.length === 0) {
            const emptyText = sessionType === "actuacion" 
                ? "No hay registro de repertorio en esta actuación." 
                : "No hay registro de marchas tocadas en este ensayo.";
            marchasContainer.innerHTML = `
                <div class="empty-state" style="padding: 16px; text-align: center; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed var(--border-color);">
                    <p class="text-muted" style="margin: 0; font-size: 0.85rem; font-style: italic;">${emptyText}</p>
                </div>
            `;
        } else {
            playedTodayIds.forEach(mId => {
                const marchasArray = (state && state.marchas) || [];
                const m = marchasArray.find(item => item.id === mId);
                const itemDiv = document.createElement("div");
                itemDiv.style.background = "rgba(212, 175, 55, 0.08)";
                itemDiv.style.border = "1px solid rgba(212, 175, 55, 0.2)";
                itemDiv.style.borderRadius = "6px";
                itemDiv.style.padding = "6px 10px";
                itemDiv.style.display = "flex";
                itemDiv.style.alignItems = "center";

                let statusCircle = "";
                let diffBadge = "";
                if (m) {
                    let statusTitle = "Por trabajar";
                    let circleSymbol = "🔴";
                    if (m.status === "green") { circleSymbol = "🟢"; statusTitle = "Bien trabajada"; }
                    else if (m.status === "yellow") { circleSymbol = "🟡"; statusTitle = "En proceso"; }
                    statusCircle = `<span title="${statusTitle}" style="font-size: 0.65rem; line-height: 1; flex-shrink: 0;">${circleSymbol}</span>`;

                    const diffNum = m.difficulty || 1;
                    diffBadge = `<span style="background: rgba(255, 255, 255, 0.08); border: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.6rem; font-weight: 600; padding: 1px 3px; border-radius: 3px; line-height: 1; flex-shrink: 0;">N${diffNum}</span>`;
                }

                const titleText = m ? m.title : `Marcha (${mId})`;
                itemDiv.innerHTML = `
                    <div style="min-width: 0; flex: 1; font-weight: 600; font-size: 0.85rem; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;">🎵 ${escapeHtml(titleText)}</span>
                        <div style="display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;">
                            ${statusCircle}
                            ${diffBadge}
                        </div>
                    </div>
                `;
                marchasContainer.appendChild(itemDiv);
            });
        }
    }

    modal.classList.add("active");
}

let currentUpcomingEventDate = null;

function openUpcomingEventDetailModal(date) {
    currentUpcomingEventDate = date;
    const modal = document.getElementById("modal-comp-upcoming-event-detail");
    if (!modal) return;

    const musicianId = getAuthMusicianId();
    const sessionInfo = state.sessionTypes ? state.sessionTypes[date] : null;
    const sessionType = (sessionInfo && sessionInfo.type) || "ensayo";

    // Title
    const titleEl = document.getElementById("upcoming-event-detail-title");

    let typeLabel = sessionType === "actuacion" ? "Actuación Oficial" : "Ensayo General";
    if (sessionInfo) {
        if (sessionType === "ensayo" && sessionInfo.subtype && sessionInfo.subtype !== "general") {
            typeLabel = "Ensayo por Voces";
        } else if (sessionInfo.name) {
            typeLabel = sessionInfo.name;
        }
    }

    if (titleEl) {
        titleEl.innerText = sessionInfo && sessionInfo.name ? sessionInfo.name : typeLabel;
    }

    // Badge styling & text below explanation
    const badgeEl = document.getElementById("upcoming-event-detail-badge");

    const record = (state.attendance && state.attendance[date] && musicianId) ? state.attendance[date][musicianId] : null;

    let badgeClass = "pending";
    let badgeText = "Pendiente";

    const isExplicitPreaviso = record && (record.preaviso === true || record.isPreaviso === true || record.status === "present" || record.justified === true || (record.reason && record.reason.trim().length > 0));

    if (isExplicitPreaviso) {
        if (record.status === "present") {
            badgeClass = "present";
            badgeText = "Asistiré";
        } else if (record.status === "absent") {
            if (record.justified) {
                badgeClass = "justified";
                badgeText = "Justificada";
            } else {
                badgeClass = "absent";
                badgeText = "Faltaré";
            }
        }
    }

    if (badgeEl) {
        badgeEl.className = `comp-attendance-badge ${badgeClass} clickable-badge`;
        badgeEl.innerText = badgeText;
    }

    // Date
    const dateEl = document.getElementById("upcoming-event-detail-date");
    if (dateEl) {
        dateEl.innerText = formatDateSpanish(date);
    }

    // Time
    const timeEl = document.getElementById("upcoming-event-detail-time");
    if (timeEl) {
        timeEl.innerText = sessionInfo && sessionInfo.time ? `${sessionInfo.time} h` : "Por determinar";
    }

    // Location & Maps Link
    const locEl = document.getElementById("upcoming-event-detail-location");
    const mapsBtn = document.getElementById("upcoming-event-detail-maps-btn");
    const mapBox = document.getElementById("upcoming-event-detail-map-box");
    const mapContent = document.getElementById("upcoming-event-detail-map-content");
    const locationName = sessionInfo && sessionInfo.location ? sessionInfo.location : (sessionType === "ensayo" ? "Parking" : "Por determinar");

    if (locEl) {
        locEl.innerText = locationName;
    }

    const locObj = (state.rehearsalLocations || []).find(l => l.name && locationName && l.name.trim().toLowerCase() === locationName.trim().toLowerCase());

    let targetMapsUrl = "";
    if (locationName && locationName !== "Por determinar") {
        let mapsUrl = (locObj && locObj.mapsUrl) ? locObj.mapsUrl.trim() : locationName;
        if (mapsUrl.startsWith("http://") || mapsUrl.startsWith("https://")) {
            targetMapsUrl = mapsUrl;
        } else {
            targetMapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapsUrl);
        }
    }

    if (mapsBtn) {
        if (!targetMapsUrl) {
            mapsBtn.classList.add("hidden");
        } else {
            mapsBtn.classList.remove("hidden");
            mapsBtn.href = targetMapsUrl;
        }
    }

    if (mapBox && mapContent) {
        if (locObj && locObj.image && locObj.image.trim()) {
            mapBox.classList.remove("hidden");
            if (targetMapsUrl) {
                mapContent.innerHTML = `
                    <a href="${escapeHtml(targetMapsUrl)}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; height: 100%; text-decoration: none; cursor: pointer;" title="Abrir ubicación en Google Maps">
                        <img src="${locObj.image}" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px; transition: transform 0.2s ease, filter 0.2s ease;" alt="${escapeHtml(locationName)}">
                    </a>
                `;
            } else {
                mapContent.innerHTML = `<img src="${locObj.image}" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 10px;" alt="${escapeHtml(locationName)}">`;
            }
        } else {
            mapBox.classList.add("hidden");
            mapContent.innerHTML = "";
        }
    }

    // Convocated Voices Box
    const convBox = document.getElementById("upcoming-event-detail-convocated-box");
    const convEl = document.getElementById("upcoming-event-detail-convocated");
    if (sessionInfo && sessionType === "ensayo" && sessionInfo.subtype !== "general" && sessionInfo.convocatedVoices && sessionInfo.convocatedVoices.length > 0) {
        if (convBox) convBox.classList.remove("hidden");
        if (convEl) convEl.innerText = sessionInfo.convocatedVoices.join(", ");
    } else {
        if (convBox) convBox.classList.add("hidden");
    }

    modal.classList.add("active");
}

function setupUpcomingEventDetailEvents() {
    const modal = document.getElementById("modal-comp-upcoming-event-detail");
    if (!modal) return;

    const btnClose = document.getElementById("btn-close-upcoming-event-detail");
    const btnCloseFooter = document.getElementById("btn-close-upcoming-event-detail-footer");
    const badgeBtn = document.getElementById("upcoming-event-detail-badge");

    const closeModal = () => {
        modal.classList.remove("active");
    };

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    if (badgeBtn) {
        badgeBtn.addEventListener("click", () => {
            closeModal();
            if (currentUpcomingEventDate) {
                openPreavisoModal(currentUpcomingEventDate);
            }
        });
    }

    const btnExportCalendar = document.getElementById("btn-export-calendar");
    if (btnExportCalendar) {
        btnExportCalendar.addEventListener("click", exportUpcomingEventsToICS);
    }
}

// Fechas de hoy en adelante en las que un músico concreto está convocado. Solo sessionTypes es
// la fuente fiable de eventos reales: un ensayo/actuación siempre crea su entrada en sessionTypes
// a la vez que en attendance (ver creación de ensayos), pero attendance puede tener una entrada
// vacía "huérfana" para hoy generada localmente por initializeAttendanceForDate() en dispositivos
// sin sincronización con la nube activa. Si se incluyera attendance aquí, esa entrada huérfana se
// mostraría como un "Ensayo General" fantasma que no existe para nadie más.
// Usada tanto por renderComponentEventos() como por exportUpcomingEventsToICS() para que la lista
// que se ve y la que se exporta sean siempre exactamente la misma.
function getUpcomingEventDatesForMusician(musician) {
    const dNow = new Date();
    const todayStr = `${dNow.getFullYear()}-${String(dNow.getMonth() + 1).padStart(2, '0')}-${String(dNow.getDate()).padStart(2, '0')}`;

    return Object.keys(state.sessionTypes)
        .filter(date => {
            if (date < todayStr) return false;

            const session = state.sessionTypes[date];
            const isSpecialRehearsal = session.type === "ensayo" && session.subtype !== "general" && session.convocatedVoices && session.convocatedVoices.length > 0;
            if (isSpecialRehearsal && !session.convocatedVoices.includes(musician.instrument)) {
                return false;
            }
            return true;
        })
        .sort((a, b) => a.localeCompare(b));
}

function getSessionTypeLabelPlain(session) {
    if (session.type !== "ensayo") return "Actuación";
    const labels = {
        general: "General",
        trompetas1: "Trompetas 1ª",
        bajos: "Bajos",
        trompetas2y3: "Trompetas 2ª y 3ª",
        cornetas: "Cornetas",
        percusion: "Percusión",
        voces: "Voces",
        primeras: "Primeras"
    };
    return labels[session.subtype || "general"] || "Ensayo";
}

function escapeICSText(str) {
    return String(str || "")
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\n/g, "\\n");
}

function exportUpcomingEventsToICS() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    const dates = getUpcomingEventDatesForMusician(musician);
    if (dates.length === 0) {
        showToast("No hay eventos próximos para exportar.", "warning");
        return;
    }

    const nowStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Yacente//Gestor de Banda//ES", "CALSCALE:GREGORIAN"];

    dates.forEach(date => {
        const session = state.sessionTypes[date];
        const typeLabel = getSessionTypeLabelPlain(session);
        const title = (session.name && session.name.trim())
            ? session.name.trim()
            : (session.type === "ensayo" ? `Ensayo ${typeLabel}` : "Actuación Oficial");
        const location = session.location || (session.type === "ensayo" ? "Parking" : "");
        const rawDate = date.split("_")[0]; // la clave puede llevar sufijo de subtipo (ej. "2026-08-26_voces")
        const dateDigits = rawDate.replace(/-/g, "");

        let dtStartLine, dtEndLine;
        if (session.time && /^\d{1,2}:\d{2}$/.test(session.time)) {
            const [h, m] = session.time.split(":");
            const hh = h.padStart(2, "0");
            const startDate = new Date(`${rawDate}T${hh}:${m}:00`);
            const endDate = new Date(startDate.getTime());
            endDate.setHours(endDate.getHours() + 2); // Duración por defecto: 2 horas
            const fmt = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`;
            dtStartLine = `DTSTART:${fmt(startDate)}`;
            dtEndLine = `DTEND:${fmt(endDate)}`;
        } else {
            // Sin hora conocida: evento de día completo
            const endDate = new Date(`${rawDate}T00:00:00`);
            endDate.setDate(endDate.getDate() + 1);
            const endDigits = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;
            dtStartLine = `DTSTART;VALUE=DATE:${dateDigits}`;
            dtEndLine = `DTEND;VALUE=DATE:${endDigits}`;
        }

        ics.push("BEGIN:VEVENT");
        ics.push(`UID:yacente-${date}-${musicianId}@yacente.app`);
        ics.push(`DTSTAMP:${nowStamp}`);
        ics.push(dtStartLine);
        ics.push(dtEndLine);
        ics.push(`SUMMARY:${escapeICSText(title)}`);
        if (location) ics.push(`LOCATION:${escapeICSText(location)}`);
        ics.push(`DESCRIPTION:${escapeICSText(typeLabel + " - Yacente")}`);
        ics.push("END:VEVENT");
    });

    ics.push("END:VCALENDAR");

    const blob = new Blob([ics.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yacente-ensayos.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Calendario exportado. Impórtalo en Google Calendar desde Ajustes ⚙️ > Importar y exportar > Importar.", "success");
}

function renderComponentEventos() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;



    const container = document.getElementById("componente-eventos-lista");
    if (!container) return;
    container.innerHTML = "";

    const dates = getUpcomingEventDatesForMusician(musician);

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

        const isExplicitPreaviso = record && (record.preaviso === true || record.isPreaviso === true || record.status === "present" || record.justified === true || (record.reason && record.reason.trim().length > 0));

        if (isExplicitPreaviso) {
            if (record.status === "present") {
                badgeClass = "present clickable-badge";
                badgeText = "Asistiré";
            } else if (record.status === "absent") {
                if (record.justified) {
                    badgeClass = "justified clickable-badge";
                    badgeText = "Justificada";
                } else {
                    badgeClass = "absent clickable-badge";
                    badgeText = "Faltaré";
                }
            }
        } else {
            badgeClass = "pending clickable-badge";
            badgeText = "Pendiente";
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
        
        let sessionTitle = session.name || (session.type === "ensayo" ? typeLabel : "Actuación Oficial");
        const locationText = session.location || (session.type === "ensayo" ? "Parking" : "");
        const timeText = session.time ? ` • ${session.time}` : "";
        const subtitleText = locationText ? `${locationText}${timeText}` : (session.time ? `${session.time}` : typeLabel);
        
        const row = document.createElement("div");
        row.className = "comp-session-row comp-session-row-clickable";
        row.style.display = "flex";
        row.style.alignItems = "stretch";
        row.style.gap = "10px";
        row.style.width = "100%";
        row.style.cursor = "pointer";
        row.title = "Ver detalle del evento y responder asistencia";
        
        const dateParts = date.split("-");
        const yr = dateParts[0];
        const moNum = parseInt(dateParts[1], 10);
        const dy = parseInt(dateParts[2], 10);
        const monthsAbbr = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        const moAbbr = monthsAbbr[moNum - 1] || "";
        
        row.innerHTML = `
            <div class="comp-date-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; width: 60px; min-width: 60px; padding: 6px; box-sizing: border-box; text-align: center; border-left: 3px solid var(--color-gold);">
                <div style="font-size: 1.35rem; font-weight: 700; color: var(--text-color); line-height: 1.1; font-family: 'Outfit', sans-serif;">${dy}</div>
                <div style="font-size: 0.65rem; text-transform: uppercase; color: var(--text-gold); font-weight: 600; margin-top: 2px; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">${moAbbr}</div>
                <div style="font-size: 0.62rem; color: var(--text-muted); font-weight: 500; font-family: 'Outfit', sans-serif; margin-top: 1px;">${yr}</div>
            </div>
            <div class="comp-session-card" style="flex: 1; min-width: 0; margin: 0; display: flex; justify-content: space-between; align-items: center;">
                <div class="comp-session-meta">
                    <h4 class="comp-session-title">${sessionTitle}</h4>
                    <div class="comp-session-details">
                        <span class="comp-session-location" style="font-size: 0.78rem; color: var(--text-muted); font-weight: 500; display: block; margin-top: 2px;">${subtitleText}</span>
                    </div>
                </div>
                <div class="comp-session-status-row" style="display: flex; align-items: center; justify-content: flex-end; flex-shrink: 0;">
                    <span class="comp-attendance-badge ${badgeClass}">${badgeText}</span>
                </div>
            </div>
        `;
        
        row.addEventListener("click", () => {
            openUpcomingEventDetailModal(date);
        });

        const badge = row.querySelector(".comp-attendance-badge");
        if (badge) {
            badge.addEventListener("click", (e) => {
                e.stopPropagation();
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

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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

    // Fecha de hoy para destacar y comparar días pasados
    const today = new Date();
    const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDay = today.getDate();
    const todayDateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

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

        const indicatorContainer = document.createElement("div");
        indicatorContainer.className = "comp-calendar-indicator-container";

        if (daySessions.length > 0) {
            const isPastDay = dateKey < todayDateKey;

            // Si hay alguna actuación en el día, se resalta la celda en verde
            const hasActuacion = daySessions.some(s => s.type === "actuacion");
            if (hasActuacion) {
                dayCell.classList.add("has-actuacion");
            }

            // Añadir manejador de click para abrir el modal correspondiente
            dayCell.addEventListener("click", () => {
                if (daySessions.length === 1) {
                    if (isPastDay) {
                        openCompRehearsalDetailModal(dateKey);
                    } else {
                        openUpcomingEventDetailModal(dateKey);
                    }
                } else {
                    openMultiEventSelectModal(dateKey, daySessions, isPastDay);
                }
            });

            daySessions.forEach(session => {
                const badge = document.createElement("span");
                
                // Determinar texto de la etiqueta rectangular
                let labelText = "general";
                if (session.type === "actuacion") {
                    labelText = "actuación";
                } else if (session.subtype === "secciones" || (session.convocatedVoices && session.convocatedVoices.length > 0 && session.subtype !== "general")) {
                    labelText = "voz";
                }

                // Determinar estado de preaviso o asistencia para la clase de color
                let badgeClass = "pending";
                const record = (state.attendance && state.attendance[dateKey]) ? state.attendance[dateKey][musicianId] : null;
                const isExplicitPreaviso = record && (record.preaviso === true || record.isPreaviso === true || record.status === "present" || record.justified === true || (record.reason && record.reason.trim().length > 0));

                if (isExplicitPreaviso) {
                    if (record.status === "present") {
                        badgeClass = "present";
                    } else if (record.status === "absent") {
                        badgeClass = record.justified ? "justified" : "absent";
                    }
                } else {
                    if (isPastDay) {
                        badgeClass = (record && record.status === "present") ? "present" : ((record && record.justified) ? "justified" : "absent");
                    } else {
                        badgeClass = "pending";
                    }
                }

                badge.className = `comp-calendar-badge ${badgeClass}`;
                badge.title = `${session.name || labelText.toUpperCase()}`;

                indicatorContainer.appendChild(badge);
            });
        }

        dayCell.appendChild(indicatorContainer);

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

function openMultiEventSelectModal(dateKey, daySessions, isPastDay) {
    const modal = document.getElementById("modal-comp-multi-event-select");
    const subtitleEl = document.getElementById("multi-event-select-date-subtitle");
    const listEl = document.getElementById("multi-event-select-list");
    if (!modal || !listEl) return;

    if (subtitleEl) {
        subtitleEl.innerText = `Eventos del ${formatDateSpanish(dateKey)}:`;
    }

    listEl.innerHTML = "";
    const musicianId = getAuthMusicianId();

    daySessions.forEach(session => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn";
        btn.style.cssText = "width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 10px; color: var(--text-primary); cursor: pointer; transition: all 0.2s ease; box-sizing: border-box; gap: 12px; text-align: left;";

        let labelText = "general";
        let badgeClass = "pending";

        if (session.type === "actuacion") {
            labelText = "actuación";
            badgeClass = "actuacion";
        } else if (session.subtype === "secciones" || (session.convocatedVoices && session.convocatedVoices.length > 0 && session.subtype !== "general")) {
            labelText = "voz";
        }

        const record = (state.attendance && state.attendance[dateKey]) ? state.attendance[dateKey][musicianId] : null;

        if (record) {
            if (record.status === "present") {
                badgeClass = "present";
            } else if (record.status === "absent") {
                badgeClass = record.justified ? "justified" : "absent";
            }
        } else if (isPastDay) {
            badgeClass = "absent";
        }

        const titleText = session.name || (session.type === "actuacion" ? "Actuación Oficial" : (labelText === "voz" ? "Ensayo por Voces" : "Ensayo General"));

        btn.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 3px; flex: 1; min-width: 0; word-break: break-word; overflow-wrap: anywhere;">
                <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-primary); line-height: 1.35; text-align: left; width: 100%;">${titleText}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; font-weight: 500;">
                    <span>⏰</span>
                    <span>${session.time ? session.time + ' h' : 'Hora por determinar'}</span>
                </div>
            </div>
            <span class="comp-multi-event-badge ${badgeClass}">${labelText}</span>
        `;

        btn.addEventListener("click", () => {
            modal.classList.remove("active");
            if (isPastDay) {
                openCompRehearsalDetailModal(dateKey);
            } else {
                openUpcomingEventDetailModal(dateKey);
            }
        });

        listEl.appendChild(btn);
    });

    modal.classList.add("active");
}

function setupMultiEventSelectModalEvents() {
    const modal = document.getElementById("modal-comp-multi-event-select");
    if (!modal) return;

    const btnClose = document.getElementById("btn-close-multi-event-select");
    const btnCloseFooter = document.getElementById("btn-close-multi-event-select-footer");

    const closeModal = () => {
        modal.classList.remove("active");
    };

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCloseFooter) btnCloseFooter.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}

function renderComponentRepertorio() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    // El músico siempre ve el repertorio de la temporada actual, sin selector de temporada.
    const currentSeasonMarchas = getMarchasForSeason(getCurrentSeasonLabel());
    const totalCount = currentSeasonMarchas.length;
    const titleEl = document.querySelector("#section-componente-repertorio h3");
    if (titleEl) {
        titleEl.textContent = `Mi Repertorio (${totalCount})`;
    }

    const searchVal = document.getElementById("search-comp-marcha").value.toLowerCase().trim();
    const container = document.getElementById("componente-repertorio-lista");
    container.innerHTML = "";

    if (currentSeasonMarchas.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay marchas registradas en el repertorio general.</p>
            </div>
        `;
        return;
    }

    const filtered = currentSeasonMarchas.filter(m => {
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
        card.style.cursor = "pointer";
        card.innerHTML = `
            <div class="comp-marcha-info">
                <h4 class="comp-marcha-title">${marcha.title}</h4>
                ${composerName ? `<span class="comp-marcha-composer">${composerName}</span>` : ""}
            </div>
            <button class="comp-status-btn-single status-${currentStatus || 'none'}" title="Cambiar dominio (Toca para alternar)"></button>
        `;
        
        const btn = card.querySelector(".comp-status-btn-single");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            let nextStatus = "";
            if (currentStatus === "") nextStatus = "red";
            else if (currentStatus === "red") nextStatus = "yellow";
            else if (currentStatus === "yellow") nextStatus = "green";
            else if (currentStatus === "green") nextStatus = "";
            
            updateMusicianMarchaStatus(musicianId, marcha.id, nextStatus);
        });

        card.addEventListener("click", () => {
            openMarchaAudioLinksModal(marcha.id);
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

function openAddMarchaModal() {
    const form = document.getElementById("form-marcha");
    if (form) form.reset();
    document.getElementById("marcha-id").value = "";
    document.getElementById("marcha-title-input").value = "";
    document.getElementById("marcha-status-input").value = "green";
    document.getElementById("marcha-difficulty-input").value = "1";
    if (document.getElementById("marcha-audio-youtube-input")) document.getElementById("marcha-audio-youtube-input").value = "";
    if (document.getElementById("marcha-audio-spotify-input")) document.getElementById("marcha-audio-spotify-input").value = "";
    
    const titleEl = document.getElementById("modal-marcha-title");
    if (titleEl) titleEl.innerText = "Añadir Nueva Marcha";
    
    const modal = document.getElementById("modal-marcha");
    if (modal) modal.classList.add("active");
}

function openEditMarchaModal(id) {
    const m = (state.marchas || []).find(item => String(item.id) === String(id));
    if (!m) return;
    
    document.getElementById("marcha-id").value = m.id;
    document.getElementById("marcha-title-input").value = m.title || "";
    document.getElementById("marcha-status-input").value = m.status || "green";
    document.getElementById("marcha-difficulty-input").value = m.difficulty || 1;
    
    if (document.getElementById("marcha-audio-youtube-input")) {
        document.getElementById("marcha-audio-youtube-input").value = m.youtubeUrl || "";
    }
    if (document.getElementById("marcha-audio-spotify-input")) {
        document.getElementById("marcha-audio-spotify-input").value = m.spotifyUrl || "";
    }
    
    const titleEl = document.getElementById("modal-marcha-title");
    if (titleEl) titleEl.innerText = "Editar Marcha";
    
    const modal = document.getElementById("modal-marcha");
    if (modal) modal.classList.add("active");
}

function setupMarchaModalEvents() {
    const btnAdd = document.getElementById("btn-add-marcha");
    const modal = document.getElementById("modal-marcha");
    const btnClose = document.getElementById("btn-close-marcha-modal");
    const btnCancel = document.getElementById("btn-cancel-marcha-modal");
    const form = document.getElementById("form-marcha");

    if (btnAdd) {
        btnAdd.addEventListener("click", () => {
            openAddMarchaModal();
        });
    }

    const closeModal = () => {
        if (modal) modal.classList.remove("active");
        if (form) form.reset();
    };

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("marcha-id").value;
            const title = document.getElementById("marcha-title-input").value.trim();
            const status = document.getElementById("marcha-status-input").value;
            const difficulty = document.getElementById("marcha-difficulty-input").value;
            const youtubeUrl = document.getElementById("marcha-audio-youtube-input") ? document.getElementById("marcha-audio-youtube-input").value.trim() : "";
            const spotifyUrl = document.getElementById("marcha-audio-spotify-input") ? document.getElementById("marcha-audio-spotify-input").value.trim() : "";

            if (!title) return;

            if (id) {
                const index = (state.marchas || []).findIndex(m => String(m.id) === String(id));
                if (index !== -1) {
                    state.marchas[index] = {
                        ...state.marchas[index],
                        title,
                        status,
                        difficulty,
                        youtubeUrl,
                        spotifyUrl
                    };
                    dbSaveMarcha(state.marchas[index]);
                    showToast("Marcha actualizada", "success");
                }
            } else {
                const newId = "marcha-" + Date.now();
                const marchasYearSelect = document.getElementById("marchas-filter-year");
                const addedInSeason = marchasYearSelect && marchasYearSelect.value ? marchasYearSelect.value : getCurrentSeasonLabel();
                const newMarcha = {
                    id: newId,
                    title,
                    status,
                    difficulty,
                    youtubeUrl,
                    spotifyUrl,
                    notes: "",
                    addedInSeason
                };
                if (!state.marchas) state.marchas = [];
                state.marchas.push(newMarcha);
                dbSaveMarcha(newMarcha);
                showToast(`Marcha añadida al repertorio de la temporada ${addedInSeason}`, "success");
            }

            saveStateToLocalStorage();
            closeModal();

            renderMarchasList();
            renderComponentRepertorio();
            renderRehearsalMarchasWidget();
        });
    }
}

function setupRepertoireLinksModalEvents() {
    const modal = document.getElementById("modal-repertoire-links");
    const btnEdit = document.getElementById("btn-edit-repertoire-links");
    const btnClose = document.getElementById("btn-close-repertoire-links-modal");
    const btnCancel = document.getElementById("btn-cancel-repertoire-links-modal");
    const form = document.getElementById("form-repertoire-links");

    const openModal = () => {
        const links = state.repertoireLinks || { youtube: "", spotify: "" };
        const youtubeInput = document.getElementById("repertoire-youtube-playlist-input");
        const spotifyInput = document.getElementById("repertoire-spotify-playlist-input");
        if (youtubeInput) youtubeInput.value = links.youtube || "";
        if (spotifyInput) spotifyInput.value = links.spotify || "";
        if (modal) modal.classList.add("active");
    };

    const closeModal = () => {
        if (modal) modal.classList.remove("active");
    };

    if (btnEdit) btnEdit.addEventListener("click", openModal);
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Si el enlace todavía no está configurado, el propio botón abre el editor
    const adminYoutubeLink = document.getElementById("admin-repertoire-youtube-link");
    const adminSpotifyLink = document.getElementById("admin-repertoire-spotify-link");
    [adminYoutubeLink, adminSpotifyLink].forEach(link => {
        if (!link) return;
        link.addEventListener("click", (e) => {
            if (!link.getAttribute("href") || link.getAttribute("href") === "#") {
                e.preventDefault();
                openModal();
            }
        });
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const youtubeUrl = document.getElementById("repertoire-youtube-playlist-input").value.trim();
            const spotifyUrl = document.getElementById("repertoire-spotify-playlist-input").value.trim();

            dbSaveRepertoireLinks({ youtube: youtubeUrl, spotify: spotifyUrl });
            showToast("Enlaces de playlists actualizados", "success");
            closeModal();
        });
    }
}

function openMarchaAudioLinksModal(marchaId) {
    const marcha = (state.marchas || []).find(m => String(m.id) === String(marchaId));
    if (!marcha) return;

    const modal = document.getElementById("modal-marcha-audio-links");
    if (!modal) return;

    const titleEl = document.getElementById("modal-audio-links-title");
    const composerEl = document.getElementById("modal-audio-links-composer");
    const container = document.getElementById("modal-audio-links-container");

    if (titleEl) titleEl.innerText = `🎧 ${marcha.title}`;
    if (composerEl) composerEl.innerText = marcha.composer || marcha.author || "Repertorio Oficial";

    if (container) {
        container.innerHTML = "";
        const youtubeUrl = (marcha.youtubeUrl || "").trim();
        const spotifyUrl = (marcha.spotifyUrl || "").trim();

        const hasLinks = youtubeUrl || spotifyUrl;

        if (!hasLinks) {
            container.innerHTML = `
                <div style="text-align: center; padding: 24px 14px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-color); border-radius: 10px;">
                    <div style="font-size: 2rem; margin-bottom: 8px;">🎧</div>
                    <p class="text-muted" style="margin: 0; font-size: 0.88rem; line-height: 1.4;">
                        La directiva aún no ha añadido enlaces de audio para esta marcha.
                    </p>
                </div>
            `;
        } else {
            if (youtubeUrl) {
                const linkBtn = document.createElement("a");
                linkBtn.href = youtubeUrl;
                linkBtn.target = "_blank";
                linkBtn.rel = "noopener noreferrer";
                linkBtn.style.cssText = "width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.35); border-radius: 10px; color: #ff4d4d; font-weight: 700; text-decoration: none; box-sizing: border-box; transition: transform 0.2s ease, background 0.2s ease;";
                linkBtn.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000" style="display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        <span style="font-size: 0.92rem;">Escuchar en YouTube</span>
                    </div>
                    <span style="font-size: 0.8rem; opacity: 0.85; display: inline-flex; align-items: center; gap: 4px;">Abrir ↗</span>
                `;
                container.appendChild(linkBtn);
            }

            if (spotifyUrl) {
                const linkBtn = document.createElement("a");
                linkBtn.href = spotifyUrl;
                linkBtn.target = "_blank";
                linkBtn.rel = "noopener noreferrer";
                linkBtn.style.cssText = "width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(29, 185, 84, 0.1); border: 1px solid rgba(29, 185, 84, 0.35); border-radius: 10px; color: #1db954; font-weight: 700; text-decoration: none; box-sizing: border-box; transition: transform 0.2s ease, background 0.2s ease;";
                linkBtn.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954" style="display: inline-block; vertical-align: middle; flex-shrink: 0;"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.38-1.32 9.78-.66 13.5 1.62.36.18.6.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                        <span style="font-size: 0.92rem;">Escuchar en Spotify</span>
                    </div>
                    <span style="font-size: 0.8rem; opacity: 0.85; display: inline-flex; align-items: center; gap: 4px;">Abrir ↗</span>
                `;
                container.appendChild(linkBtn);
            }
        }
    }

    modal.classList.add("active");
}

function setupMarchaAudioLinksModalEvents() {
    const modal = document.getElementById("modal-marcha-audio-links");
    if (!modal) return;

    const btnClose = document.getElementById("btn-close-marcha-audio-links-modal");
    const btnFooter = document.getElementById("btn-close-marcha-audio-links-footer");

    const closeModal = () => {
        modal.classList.remove("active");
    };

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnFooter) btnFooter.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
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
    const currentMusicianId = getAuthMusicianId();
    const currentMusician = state.musicians.find(m => String(m.id) === String(currentMusicianId));
    if (currentMusician && isMusicianOnLeaveOnDate(currentMusician, date)) {
        showToast("Estás de baja temporal y no puedes registrar preavisos.", "error");
        return;
    }

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

    const isExplicitPreaviso = record && (record.preaviso === true || record.isPreaviso === true || record.status === "present" || record.justified === true || (record.reason && record.reason.trim().length > 0));

    if (isExplicitPreaviso) {
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

            const savingMusician = state.musicians.find(m => String(m.id) === String(musicianId));
            if (savingMusician && isMusicianOnLeaveOnDate(savingMusician, date)) {
                showToast("Estás de baja temporal y no puedes registrar preavisos.", "error");
                return;
            }

            let recordObj = null;
            if (preavisoSelectedStatus === "present") {
                recordObj = {
                    status: "present",
                    justified: false,
                    reason: "",
                    preaviso: true
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
                    reason: reason,
                    preaviso: true
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

function setupProfilePhotoEvents() {
    const avatarContainer = document.getElementById("comp-profile-avatar-container");
    const btnEditModal = document.getElementById("btn-edit-photo-modal");
    const fileInputModal = document.getElementById("modal-photo-file-input");
    const compFileInput = document.getElementById("comp-photo-file-input");

    // En la ficha del músico, hacer clic en el avatar SOLO abre la foto en grande
    if (avatarContainer) {
        avatarContainer.onclick = (e) => {
            e.stopPropagation();
            const musicianId = getAuthMusicianId();
            if (musicianId) {
                openPhotoPreviewModal(musicianId);
            }
        };
    }

    // Botón "Cambiar foto de perfil" dentro del modal en grande
    if (btnEditModal && fileInputModal) {
        btnEditModal.onclick = (e) => {
            e.stopPropagation();
            fileInputModal.click();
        };
    }

    const processPhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const musicianId = getAuthMusicianId();
        if (!musicianId) return;

        const musician = state.musicians.find(m => String(m.id) === String(musicianId));
        if (!musician) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxDim = 800; // Alta resolución HD sin pérdida de calidad visual
                let width = img.width;
                let height = img.height;

                const minDim = Math.min(width, height);
                const sx = (width - minDim) / 2;
                const sy = (height - minDim) / 2;

                canvas.width = maxDim;
                canvas.height = maxDim;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, maxDim, maxDim);

                const base64Photo = canvas.toDataURL("image/jpeg", 0.88);
                musician.photo = base64Photo;

                saveStateToLocalStorage();
                dbSaveMusician(musician);

                // Actualizar imagen en el modal en tiempo real
                const modalImg = document.getElementById("photo-preview-img");
                const modalInitials = document.getElementById("photo-preview-initials");
                if (modalImg) {
                    modalImg.src = base64Photo;
                    modalImg.classList.remove("hidden");
                }
                if (modalInitials) {
                    modalInitials.classList.add("hidden");
                }

                renderComponentFicha();
                renderAttendance();
                renderPlantillaTable();
                showToast("Foto de perfil actualizada con alta calidad", "success");
            };
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    if (fileInputModal) {
        fileInputModal.addEventListener("change", processPhotoUpload);
    }
    if (compFileInput) {
        compFileInput.addEventListener("change", processPhotoUpload);
    }
}

function setupMusicianDrawerAndSettingsEvents() {
    const btnHamburger = document.getElementById("btn-musician-hamburger");
    const modalDrawer = document.getElementById("modal-musician-drawer");
    const btnCloseDrawer = document.getElementById("btn-close-musician-drawer");

    const openDrawer = () => {
        if (modalDrawer) modalDrawer.classList.add("active");
        const currentSection = document.querySelector(".app-section.active");
        const currentId = currentSection ? currentSection.id : null;
        document.querySelectorAll(".drawer-item").forEach(d => {
            d.classList.toggle("active", d.getAttribute("data-target") === currentId);
        });
    };

    const closeDrawer = () => {
        if (modalDrawer) modalDrawer.classList.remove("active");
    };

    if (btnHamburger) btnHamburger.addEventListener("click", openDrawer);
    if (btnCloseDrawer) btnCloseDrawer.addEventListener("click", closeDrawer);

    if (modalDrawer) {
        modalDrawer.addEventListener("click", (e) => {
            if (e.target === modalDrawer) closeDrawer();
        });
    }

    // Enlaces dentro del menú drawer
    document.querySelectorAll(".drawer-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            closeDrawer();
            if (!targetId) return;

            document.querySelectorAll(".drawer-item").forEach(d => d.classList.remove("active"));
            item.classList.add("active");

            // Sincronizar también con los ítems de la barra inferior
            document.querySelectorAll(".mobile-nav-item").forEach(nav => {
                if (nav.getAttribute("data-target") === targetId) {
                    nav.classList.add("active");
                } else {
                    nav.classList.remove("active");
                }
            });

            renderActiveSection(targetId);
        });
    });

    // Formulario de cambio de PIN en Ajustes
    const formPin = document.getElementById("form-change-pin-ajustes");
    if (formPin) {
        formPin.addEventListener("submit", (e) => {
            e.preventDefault();
            const musicianId = getAuthMusicianId();
            if (!musicianId) {
                showToast("Sesión de músico no válida", "error");
                return;
            }

            const inputPin = document.getElementById("change-pin-new-ajustes");
            const newPin = inputPin ? inputPin.value.trim() : "";

            if (!/^\d{4}$/.test(newPin)) {
                showToast("El PIN debe constar exactamente de 4 números.", "warning");
                return;
            }

            const musician = state.musicians.find(m => String(m.id) === String(musicianId));
            if (!musician) {
                showToast("Músico no encontrado en la base de datos", "error");
                return;
            }

            musician.pin = newPin;
            saveStateToLocalStorage();
            dbSaveMusician(musician);

            if (inputPin) inputPin.value = "";
            showToast("PIN de acceso actualizado correctamente", "success");
        });
    }

    // Event listeners para botones de cerrar sesión del músico (.btn-logout-component)
    // Se excluyen los de la barra inferior (.mobile-nav-item), que ya gestiona su propio handler genérico
    document.querySelectorAll(".btn-logout-component:not(.mobile-nav-item)").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            logoutComponent();
        });
    });
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
}

const SUGGESTION_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function getSuggestionCooldownEnd(musicianId) {
    if (!musicianId) return null;
    const mySuggestions = (state.suggestions || []).filter(s => String(s.authorId) === String(musicianId));
    let lastDate = mySuggestions.reduce((latest, s) => {
        const t = new Date(s.date).getTime();
        return (t && !isNaN(t) && t > latest) ? t : latest;
    }, 0);

    const storedLastDateStr = localStorage.getItem("yacente_last_suggestion_date_" + musicianId);
    if (storedLastDateStr) {
        const tStored = new Date(storedLastDateStr).getTime();
        if (tStored && !isNaN(tStored) && tStored > lastDate) {
            lastDate = tStored;
        }
    }

    if (!lastDate) return null;
    const cooldownEnd = lastDate + SUGGESTION_COOLDOWN_MS;
    return cooldownEnd > Date.now() ? new Date(cooldownEnd) : null;
}

function renderComponentSugerenciasPage() {
    const musicianId = getAuthMusicianId();
    const form = document.getElementById("form-suggestion-mailbox");
    const notice = document.getElementById("suggestion-limit-notice");
    const noticeDate = document.getElementById("suggestion-limit-date");
    if (!form || !notice) return;

    const cooldownEnd = musicianId ? getSuggestionCooldownEnd(musicianId) : null;
    if (cooldownEnd) {
        form.classList.add("hidden");
        notice.classList.remove("hidden");
        if (noticeDate) {
            noticeDate.innerText = cooldownEnd.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    } else {
        form.classList.remove("hidden");
        notice.classList.add("hidden");
    }
}

function renderMySuggestionHistory() {
    const musicianId = getAuthMusicianId();
    const container = document.getElementById("my-suggestions-history-list");
    const emptyState = document.getElementById("my-suggestions-history-empty");
    if (!container || !musicianId) return;

    const getTimestamp = (d) => {
        if (!d) return 0;
        const t = new Date(d).getTime();
        return isNaN(t) ? 0 : t;
    };

    const mine = (state.suggestions || [])
        .filter(s => String(s.authorId) === String(musicianId) && !s.deletedByMusician)
        .sort((a, b) => getTimestamp(b.date) - getTimestamp(a.date));

    container.innerHTML = "";

    if (mine.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    mine.forEach(sug => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "card-item";
        itemDiv.style.cssText = `
            padding: 14px;
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 4px;
        `;

        const anonymousTag = sug.anonymous ? `<span style="font-size: 0.68rem; color: var(--text-muted);">Enviada de forma anónima</span>` : "";

        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <span style="font-size: 0.72rem; color: var(--text-muted);">${new Date(sug.date).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                <button type="button" class="btn-delete-my-suggestion" title="Eliminar sugerencia" aria-label="Eliminar sugerencia" style="background: none; border: none; cursor: pointer; color: var(--color-absent); padding: 2px; display: inline-flex; align-items: center;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
            <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: var(--text-color); white-space: pre-wrap;">${escapeHtml(sug.text)}</p>
            ${anonymousTag}
        `;

        const deleteBtn = itemDiv.querySelector(".btn-delete-my-suggestion");
        deleteBtn.addEventListener("click", () => {
            if (!confirm("¿Estás seguro de que quieres eliminar esta sugerencia de tu historial? Esta acción no se puede deshacer.")) return;
            dbDeleteSuggestionByMusician(sug)
                .then(() => {
                    showToast("Sugerencia eliminada de tu historial", "success");
                    renderMySuggestionHistory();
                    renderComponentSugerenciasPage();
                    updateSuggestionsBadge();
                })
                .catch(() => {
                    showToast("No se ha podido eliminar la sugerencia.", "error");
                });
        });

        container.appendChild(itemDiv);
    });
}

function setupSuggestionsMailboxEvents() {
    // Formulario de envío de sugerencia (vista músico)
    const formSuggestion = document.getElementById("form-suggestion-mailbox");
    if (formSuggestion) {
        formSuggestion.addEventListener("submit", (e) => {
            e.preventDefault();
            const musicianId = getAuthMusicianId();
            if (!musicianId) {
                showToast("Sesión de músico no válida", "error");
                return;
            }
            const cooldownEnd = getSuggestionCooldownEnd(musicianId);
            if (cooldownEnd) {
                showToast("Solo puedes enviar una sugerencia por semana.", "warning");
                renderComponentSugerenciasPage();
                return;
            }

            const musician = state.musicians.find(m => String(m.id) === String(musicianId));
            const textInput = document.getElementById("suggestion-text");
            const text = textInput ? textInput.value.trim() : "";
            const anonymous = !!document.getElementById("suggestion-anonymous-toggle")?.checked;

            if (!text) {
                showToast("Escribe una sugerencia antes de enviarla.", "warning");
                return;
            }

            const suggestionObj = {
                id: "sug_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
                text: text,
                authorId: musicianId,
                authorName: musician ? musician.name : "Desconocido",
                anonymous: anonymous,
                date: new Date().toISOString(),
                read: false
            };

            const submitBtn = formSuggestion.querySelector("button[type=submit]");
            if (submitBtn) submitBtn.disabled = true;

            dbSaveSuggestion(suggestionObj)
                .then(() => {
                    if (textInput) textInput.value = "";
                    const toggle = document.getElementById("suggestion-anonymous-toggle");
                    if (toggle) toggle.checked = false;
                    showToast("Sugerencia enviada a la directiva. ¡Gracias!", "success");
                    renderComponentSugerenciasPage();
                    renderMySuggestionHistory();
                })
                .catch(() => {
                    showToast("No se ha podido enviar la sugerencia. Comprueba tu conexión e inténtalo de nuevo.", "error");
                })
                .finally(() => {
                    if (submitBtn) submitBtn.disabled = false;
                });
        });
    }

    // Tarjeta "Buzón de Sugerencias" dentro de Otros (vista admin)
    document.querySelectorAll(".otros-nav-card").forEach(card => {
        card.addEventListener("click", () => {
            const targetId = card.getAttribute("data-target");
            if (targetId) renderActiveSection(targetId);
        });
    });

    // Enlace "Volver a Otros" dentro del detalle del buzón (vista admin)
    document.querySelectorAll(".otros-back-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");
            if (targetId) renderActiveSection(targetId);
        });
    });
}

// ==========================================================================
// GESTIÓN DE LUGARES DE ENSAYO (DIRECTOR Y DESPLEGABLES)
// ==========================================================================

function dbSaveRehearsalLocations() {
    saveStateToLocalStorage();
    if (isCloudActive()) {
        const db = firebase.firestore();
        db.collection("settings").doc("rehearsalLocations").set({ list: state.rehearsalLocations || [] })
            .catch(err => console.error("Error al guardar lugares de ensayo en la nube:", err));
    }
}

function renderRehearsalLocationOptions() {
    const rehearsalSelect = document.getElementById("rehearsal-location-input");
    const quickSelect = document.getElementById("quick-session-location");

    const locations = (state.rehearsalLocations && state.rehearsalLocations.length > 0)
        ? state.rehearsalLocations
        : [
            { id: "loc_parking", name: "Parking", address: "Parking de la Sede" },
            { id: "loc_arrabal", name: "Arrabal", address: "Arrabal" },
            { id: "loc_sanblas", name: "San Blas", address: "San Blas" }
        ];

    let optionsHtml = locations.map(l => `<option value="${escapeHtml(l.name)}">${escapeHtml(l.name)}</option>`).join("");

    if (rehearsalSelect) {
        rehearsalSelect.innerHTML = optionsHtml;
    }
    if (quickSelect) {
        quickSelect.innerHTML = optionsHtml;
    }
}

function compressImageFile(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth || height > maxHeight) {
                if (width / height > maxWidth / maxHeight) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
            callback(dataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function renderLocationMapContent(loc) {
    if (!loc) return "";

    if (loc.image) {
        return `<img src="${loc.image}" style="width:100%; height:100%; object-fit:cover; display:block;" alt="${escapeHtml(loc.name)}">`;
    }

    return `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(212,175,55,0.18) 0%, rgba(15,15,15,0.92) 85%); color: var(--text-muted); text-align: center; padding: 20px; box-sizing: border-box;">
            <span style="font-size: 3rem; margin-bottom: 8px; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.6));">📍</span>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-gold); font-family: 'Outfit', sans-serif;">${escapeHtml(loc.name || "Lugar de Ensayo")}</div>
        </div>
    `;
}

function renderAdminLugaresEnsayoList() {
    const container = document.getElementById("admin-lugares-ensayo-list");
    const emptyEl = document.getElementById("admin-lugares-ensayo-empty");
    if (!container) return;

    const locations = state.rehearsalLocations || [];

    if (locations.length === 0) {
        container.innerHTML = "";
        if (emptyEl) emptyEl.classList.remove("hidden");
        return;
    }

    if (emptyEl) emptyEl.classList.add("hidden");

    container.innerHTML = locations.map(loc => `
        <div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; border-radius: 14px; border: 1px solid var(--border-color); background: var(--bg-card);">
            <!-- Marco Cuadrado para Foto o Mapa -->
            <div style="width: 100%; aspect-ratio: 1 / 1; background: #000; border-bottom: 1px solid var(--border-color); position: relative; overflow: hidden;">
                ${renderLocationMapContent(loc)}
            </div>
            
            <!-- Detalles y Acciones -->
            <div style="padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; justify-content: space-between;">
                <div>
                    <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                        <span>📍</span> ${escapeHtml(loc.name)}
                    </div>
                    ${loc.mapsUrl ? `
                        <a href="${escapeHtml(loc.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.78rem; color: var(--color-gold); text-decoration: none; margin-top: 6px; font-weight: 600;">
                            <span>🗺️</span> Enlace Google Maps
                        </a>
                    ` : ''}
                </div>
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06);">
                    <button class="btn btn-secondary btn-sm edit-lugar-ensayo-btn" data-id="${loc.id}" style="padding: 6px 12px; font-size: 0.8rem; font-weight: 600;">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-secondary btn-sm delete-lugar-ensayo-btn" data-id="${loc.id}" style="padding: 6px 10px; font-size: 0.8rem; color: var(--color-absent);">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    // Bind Edit
    container.querySelectorAll(".edit-lugar-ensayo-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const locId = btn.dataset.id;
            openLugarEnsayoModal(locId);
        });
    });

    // Bind Delete
    container.querySelectorAll(".delete-lugar-ensayo-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (state.pastLockEnabled) {
                showToast("Bloqueo de pasado activado, no se pueden eliminar lugares de ensayo.", "warning");
                return;
            }
            const locId = btn.dataset.id;
            const loc = state.rehearsalLocations.find(l => l.id === locId);
            if (!loc) return;
            if (confirm(`¿Estás seguro de eliminar el lugar de ensayo "${loc.name}"?`)) {
                state.rehearsalLocations = state.rehearsalLocations.filter(l => l.id !== locId);
                dbSaveRehearsalLocations();
                renderAdminLugaresEnsayoList();
                renderRehearsalLocationOptions();
                showToast("Lugar de ensayo eliminado", "info");
            }
        });
    });
}

let currentLugarEnsayoImageDataUrl = "";

let advancedStatsSelectedMusicianId = "";

const MESES_CORTO_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatMonthShortLabelEs(monthStr) {
    const [y, m] = monthStr.split("-");
    return `${MESES_CORTO_ES[parseInt(m, 10) - 1]} ${y.slice(2)}`;
}

// ==========================================================================
// TREEMAP POR VOZ/SECCIÓN (Estadísticas Avanzadas)
// ==========================================================================
// Algoritmo "squarified treemap" (Bruls, Huizing & van Wijk): coloca los rectángulos
// en filas/columnas eligiendo en cada paso la orientación que mantiene los rectángulos
// lo más cuadrados posible, en vez de simplemente repartir el ancho en proporción al valor.
// Trabaja en un sistema de coordenadas normalizado (w × h) que luego se traduce a
// porcentajes CSS, así que no depende del tamaño real en píxeles del contenedor.
function squarifyTreemapLayout(items, x, y, w, h) {
    const results = [];

    function worstRatio(rowAreas, sideLength) {
        const sum = rowAreas.reduce((a, b) => a + b, 0);
        if (sum <= 0) return Infinity;
        const maxA = Math.max(...rowAreas);
        const minA = Math.min(...rowAreas);
        const sideSq = sideLength * sideLength;
        const sumSq = sum * sum;
        return Math.max((sideSq * maxA) / sumSq, sumSq / (sideSq * minA));
    }

    function layout(items, x, y, w, h) {
        if (items.length === 0 || w <= 0 || h <= 0) return;
        if (items.length === 1) {
            results.push({ item: items[0], x, y, w, h });
            return;
        }

        const shortSide = Math.min(w, h);
        let row = [items[0]];
        let rowAreas = [items[0].area];
        let i = 1;
        while (i < items.length) {
            const nextRowAreas = rowAreas.concat([items[i].area]);
            if (worstRatio(nextRowAreas, shortSide) <= worstRatio(rowAreas, shortSide)) {
                row.push(items[i]);
                rowAreas = nextRowAreas;
                i++;
            } else {
                break;
            }
        }

        const rowAreaSum = rowAreas.reduce((a, b) => a + b, 0);
        const remaining = items.slice(i);

        if (w >= h) {
            // Contenedor apaisado: el lado corto es la altura -> se apila una columna
            // vertical a la izquierda que ocupa toda la altura disponible.
            const colWidth = h > 0 ? rowAreaSum / h : 0;
            let offsetY = y;
            row.forEach((it, idx) => {
                const itH = colWidth > 0 ? rowAreas[idx] / colWidth : 0;
                results.push({ item: it, x, y: offsetY, w: colWidth, h: itH });
                offsetY += itH;
            });
            layout(remaining, x + colWidth, y, w - colWidth, h);
        } else {
            // Contenedor apaisado en vertical: el lado corto es el ancho -> se apila una
            // fila horizontal arriba que ocupa todo el ancho disponible.
            const rowHeight = w > 0 ? rowAreaSum / w : 0;
            let offsetX = x;
            row.forEach((it, idx) => {
                const itW = rowHeight > 0 ? rowAreas[idx] / rowHeight : 0;
                results.push({ item: it, x: offsetX, y, w: itW, h: rowHeight });
                offsetX += itW;
            });
            layout(remaining, x, y + rowHeight, w, h - rowHeight);
        }
    }

    const total = items.reduce((s, it) => s + it.value, 0);
    if (total <= 0) return [];
    const scale = (w * h) / total;
    const scaledItems = items.map(it => ({ ...it, area: it.value * scale }));
    layout(scaledItems, x, y, w, h);
    return results;
}

// Asistencia media histórica (todas las convocatorias concluidas, sin filtros) y
// tamaño (nº de componentes activos) de cada sección, para el treemap.
function computeSectionTreemapData() {
    const sectionAttendance = {};
    SECCIONES_ORDEN.forEach(sec => { sectionAttendance[sec] = { totalCheck: 0, presents: 0 }; });

    const allDates = getAllSessionDatesCached();
    allDates.forEach(date => {
        if (!isSessionConcluded(date)) return;
        const dayRecord = state.attendance[date] || {};
        state.musicians.forEach(m => {
            const record = dayRecord[m.id];
            if (!record) return;
            if (isMusicianOnLeaveOnDate(m, date)) return;
            const bucket = sectionAttendance[m.instrument];
            if (!bucket) return;
            bucket.totalCheck++;
            if (record.status === "present") bucket.presents++;
        });
    });

    const sectionCounts = {};
    (state.musicians || []).forEach(m => {
        if (m.status === "inactive") return;
        sectionCounts[m.instrument] = (sectionCounts[m.instrument] || 0) + 1;
    });

    return SECCIONES_ORDEN
        .map(sec => {
            const count = sectionCounts[sec] || 0;
            const att = sectionAttendance[sec];
            const pct = att.totalCheck > 0 ? Math.round((att.presents / att.totalCheck) * 100) : null;
            return { section: sec, value: count, pct };
        })
        .filter(s => s.value > 0);
}

function renderStatsSectionTreemap() {
    const container = document.getElementById("advanced-stats-treemap-container");
    try {
        renderStatsSectionTreemapUnsafe();
    } catch (err) {
        console.error("[Treemap secciones] Error al renderizar:", err);
        if (container) {
            container.classList.remove("hidden");
            container.innerHTML = `<p class="text-muted" style="padding: 20px; color: var(--color-absent);">No se ha podido generar el treemap (${escapeHtml(err.message || String(err))}). Revisa la consola para más detalle.</p>`;
        }
        const emptyState = document.getElementById("advanced-stats-treemap-empty");
        if (emptyState) emptyState.classList.add("hidden");
    }
}

function renderStatsSectionTreemapUnsafe() {
    const container = document.getElementById("advanced-stats-treemap-container");
    const emptyState = document.getElementById("advanced-stats-treemap-empty");
    if (!container) return;

    const data = computeSectionTreemapData();

    if (data.length === 0) {
        container.innerHTML = "";
        container.classList.add("hidden");
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    container.classList.remove("hidden");
    if (emptyState) emptyState.classList.add("hidden");

    // Coordenadas normalizadas: la relación 1000x460 aproxima el ancho/alto típico de la
    // tarjeta para que los rectángulos salgan razonablemente cuadrados en escritorio.
    const LAYOUT_W = 1000;
    const LAYOUT_H = 460;
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const rects = squarifyTreemapLayout(sorted, 0, 0, LAYOUT_W, LAYOUT_H);

    container.style.position = "relative";
    container.style.width = "100%";
    container.style.height = "380px";
    container.innerHTML = "";

    rects.forEach(r => {
        const d = r.item;
        let color = "rgba(255,255,255,0.12)";
        let pctLabel = "Sin datos";
        if (d.pct !== null) {
            color = "var(--color-present)";
            if (d.pct < 80) color = "var(--color-justified)";
            if (d.pct < 50) color = "var(--color-absent)";
            pctLabel = `${d.pct}% asistencia`;
        }

        const areaPx = (r.w / LAYOUT_W) * (r.h / LAYOUT_H); // fracción del área total (0-1)
        const showSubtitle = areaPx > 0.02 && r.h > (LAYOUT_H * 0.09);
        const fontSize = areaPx > 0.09 ? "0.95rem" : (areaPx > 0.035 ? "0.82rem" : "0.72rem");

        const cell = document.createElement("div");
        cell.title = `${d.section}: ${pctLabel} · ${d.value} componente${d.value === 1 ? '' : 's'}`;
        cell.style.position = "absolute";
        cell.style.left = `${(r.x / LAYOUT_W) * 100}%`;
        cell.style.top = `${(r.y / LAYOUT_H) * 100}%`;
        cell.style.width = `${(r.w / LAYOUT_W) * 100}%`;
        cell.style.height = `${(r.h / LAYOUT_H) * 100}%`;
        cell.style.boxSizing = "border-box";
        cell.style.border = "2px solid var(--bg-primary)";
        cell.style.background = color;
        cell.style.color = "#FFF";
        cell.style.display = "flex";
        cell.style.flexDirection = "column";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.textAlign = "center";
        cell.style.padding = "4px";
        cell.style.overflow = "hidden";
        cell.style.cursor = "default";
        cell.style.transition = "filter 0.15s ease";
        cell.onmouseenter = () => { cell.style.filter = "brightness(1.12)"; };
        cell.onmouseleave = () => { cell.style.filter = "none"; };

        cell.innerHTML = `
            <span style="font-weight: 700; font-size: ${fontSize}; line-height: 1.2; text-shadow: 0 1px 3px rgba(0,0,0,0.4); overflow-wrap: anywhere;">${d.section}</span>
            ${showSubtitle ? `<span style="font-size: 0.78rem; opacity: 0.92; margin-top: 3px; font-weight: 600; text-shadow: 0 1px 3px rgba(0,0,0,0.4);">${pctLabel}</span>` : ''}
        `;

        container.appendChild(cell);
    });
}

// ==========================================================================
// SUNBURST DE MOTIVOS DE FALTA (Estadísticas Avanzadas)
// ==========================================================================
function hexToRgbParts(hex) {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

// percent > 0 aclara hacia blanco, percent < 0 oscurece hacia negro (-100..100)
function shadeHexColor(hex, percent) {
    const { r, g, b } = hexToRgbParts(hex);
    const target = percent < 0 ? 0 : 255;
    const p = Math.min(Math.abs(percent), 100) / 100;
    const nr = Math.round((target - r) * p + r);
    const ng = Math.round((target - g) * p + g);
    const nb = Math.round((target - b) * p + b);
    return `rgb(${nr}, ${ng}, ${nb})`;
}

function polarToCartesian(cx, cy, r, angleDeg) {
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

// Genera el "d" de un anillo/gajo de donut entre dos radios y dos ángulos (grados, 0 = arriba,
// sentido horario). Se recorta el tramo a un máximo de 359.9° para evitar el caso degenerado
// de un arco SVG con el mismo punto de inicio y fin (círculo completo).
function donutSlicePath(cx, cy, innerR, outerR, startAngle, endAngle) {
    let end = endAngle;
    if (end - startAngle >= 359.9) end = startAngle + 359.9;
    const largeArc = (end - startAngle) > 180 ? 1 : 0;
    const p1 = polarToCartesian(cx, cy, outerR, end);
    const p2 = polarToCartesian(cx, cy, outerR, startAngle);
    const p3 = polarToCartesian(cx, cy, innerR, startAngle);
    const p4 = polarToCartesian(cx, cy, innerR, end);
    return [
        `M ${p1.x} ${p1.y}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 0 ${p2.x} ${p2.y}`,
        `L ${p3.x} ${p3.y}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 1 ${p4.x} ${p4.y}`,
        "Z"
    ].join(" ");
}

// Recorta simétricamente un pequeño hueco angular entre gajos contiguos, salvo que el gajo
// sea demasiado fino (en cuyo caso se dibuja sin hueco para no invertir el arco).
function trimAngleGap(start, end, gapDeg) {
    const span = end - start;
    if (span <= gapDeg * 3) return { start, end };
    return { start: start + gapDeg / 2, end: end - gapDeg / 2 };
}

// Todas las convocatorias históricas (concluidas, sin filtros), agrupadas por
// asistió / falta justificada / falta no justificada. Dentro de "asistió" se subdivide
// por si hubo o no preaviso explícito del músico (desde su portal); dentro de cada tipo
// de falta se subdivide por el motivo exacto introducido.
function computeAttendanceSunburstData() {
    const groups = {
        asistio: { total: 0, withPreaviso: 0 },
        justificada: { total: 0, reasons: {} },
        no_justificada: { total: 0, reasons: {} }
    };

    const allDates = getAllSessionDatesCached();
    allDates.forEach(date => {
        if (!isSessionConcluded(date)) return;
        const dayRecord = state.attendance[date] || {};
        state.musicians.forEach(m => {
            const record = dayRecord[m.id];
            if (!record) return;
            if (isMusicianOnLeaveOnDate(m, date)) return;

            if (record.status === "present") {
                groups.asistio.total++;
                if (record.preaviso === true) groups.asistio.withPreaviso++;
                return;
            }

            const bucket = record.justified ? groups.justificada : groups.no_justificada;
            bucket.total++;
            const reason = (record.reason || "").trim() || "Sin especificar";
            bucket.reasons[reason] = (bucket.reasons[reason] || 0) + 1;
        });
    });

    return groups;
}

function renderStatsAttendanceSunburst() {
    const container = document.getElementById("advanced-stats-sunburst-container");
    try {
        renderStatsAttendanceSunburstUnsafe();
    } catch (err) {
        console.error("[Sunburst asistencia] Error al renderizar:", err);
        if (container) {
            container.classList.remove("hidden");
            container.innerHTML = `<p class="text-muted" style="padding: 20px; color: var(--color-absent);">No se ha podido generar el sunburst (${escapeHtml(err.message || String(err))}). Revisa la consola para más detalle.</p>`;
        }
        const emptyState = document.getElementById("advanced-stats-sunburst-empty");
        if (emptyState) emptyState.classList.add("hidden");
    }
}

function renderStatsAttendanceSunburstUnsafe() {
    const container = document.getElementById("advanced-stats-sunburst-container");
    const emptyState = document.getElementById("advanced-stats-sunburst-empty");
    if (!container) return;

    const groups = computeAttendanceSunburstData();
    const totalRecords = groups.asistio.total + groups.justificada.total + groups.no_justificada.total;

    container.innerHTML = "";

    if (totalRecords === 0) {
        container.classList.add("hidden");
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    container.classList.remove("hidden");
    if (emptyState) emptyState.classList.add("hidden");

    const CX = 200, CY = 200;
    const INNER_R0 = 54, INNER_R1 = 106;
    const OUTER_R0 = 110, OUTER_R1 = 174;
    const GAP_DEG = 0.8;

    const groupDefs = [
        {
            key: "asistio", label: "Asistió", baseColor: "#2ECC71", unit: "asistencia",
            getEntries: grp => {
                const withP = grp.withPreaviso;
                const withoutP = grp.total - grp.withPreaviso;
                const entries = [];
                if (withP > 0) entries.push(["Con preaviso", withP]);
                if (withoutP > 0) entries.push(["Sin preaviso", withoutP]);
                return entries;
            }
        },
        {
            key: "justificada", label: "Falta justificada", baseColor: "#E67E22", unit: "falta",
            getEntries: grp => Object.entries(grp.reasons).sort((a, b) => b[1] - a[1])
        },
        {
            key: "no_justificada", label: "Falta no justificada", baseColor: "#E74C3C", unit: "falta",
            getEntries: grp => Object.entries(grp.reasons).sort((a, b) => b[1] - a[1])
        }
    ];

    let innerPaths = "";
    let outerPaths = "";
    const legendGroups = [];
    let angleCursor = 0;

    groupDefs.forEach(gd => {
        const grp = groups[gd.key];
        if (grp.total === 0) return;

        const span = (grp.total / totalRecords) * 360;
        const start = angleCursor;
        const end = angleCursor + span;
        const pct = Math.round((grp.total / totalRecords) * 100);

        const innerTrim = trimAngleGap(start, end, GAP_DEG);
        innerPaths += `<path d="${donutSlicePath(CX, CY, INNER_R0, INNER_R1, innerTrim.start, innerTrim.end)}" fill="${gd.baseColor}" stroke="var(--bg-primary)" stroke-width="1.5"><title>${gd.label}: ${grp.total} ${gd.unit}${grp.total === 1 ? '' : 's'} (${pct}%)</title></path>`;

        const entries = gd.getEntries(grp);
        const legendEntries = [];
        let subCursor = start;
        entries.forEach(([entryLabel, count], idx) => {
            const subSpan = (count / grp.total) * span;
            const subStart = subCursor;
            const subEnd = subCursor + subSpan;
            const shadePct = entries.length <= 1 ? 0 : -25 + (idx / (entries.length - 1)) * 55;
            const color = shadeHexColor(gd.baseColor, shadePct);
            const entryPct = Math.round((count / totalRecords) * 100);

            const safeLabel = escapeHtml(entryLabel);
            const outerTrim = trimAngleGap(subStart, subEnd, GAP_DEG);
            outerPaths += `<path d="${donutSlicePath(CX, CY, OUTER_R0, OUTER_R1, outerTrim.start, outerTrim.end)}" fill="${color}" stroke="var(--bg-primary)" stroke-width="1.5"><title>${safeLabel} (${gd.label}): ${count} ${gd.unit}${count === 1 ? '' : 's'} (${entryPct}%)</title></path>`;

            legendEntries.push({ label: safeLabel, count, color });
            subCursor = subEnd;
        });

        legendGroups.push({ label: gd.label, color: gd.baseColor, total: grp.total, pct, entries: legendEntries });
        angleCursor = end;
    });

    const svg = `
        <svg viewBox="0 0 400 400" width="320" height="320" style="flex-shrink: 0;">
            ${outerPaths}
            ${innerPaths}
            <circle cx="${CX}" cy="${CY}" r="${INNER_R0 - 4}" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="1"></circle>
            <text x="${CX}" y="${CY - 6}" text-anchor="middle" style="font-family: 'Cinzel', serif; font-size: 28px; font-weight: 700; fill: var(--text-primary);">${totalRecords}</text>
            <text x="${CX}" y="${CY + 16}" text-anchor="middle" style="font-size: 12px; fill: var(--text-muted);">registro${totalRecords === 1 ? '' : 's'}</text>
        </svg>
    `;

    let legendHTML = `<div style="display: flex; flex-direction: column; gap: 18px; min-width: 220px; max-width: 320px;">`;
    legendGroups.forEach(g => {
        legendHTML += `
            <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="width: 12px; height: 12px; border-radius: 3px; background: ${g.color}; display: inline-block; flex-shrink: 0;"></span>
                    <strong style="font-size: 0.9rem; color: var(--text-primary);">${g.label}</strong>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${g.total} (${g.pct}%)</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 20px;">
                    ${g.entries.map(e => `
                        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary);">
                            <span style="width: 9px; height: 9px; border-radius: 2px; background: ${e.color}; display: inline-block; flex-shrink: 0;"></span>
                            <span style="flex: 1; overflow-wrap: anywhere;">${e.label}</span>
                            <span style="font-weight: 600; color: var(--text-primary);">${e.count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    legendHTML += `</div>`;

    container.innerHTML = svg + legendHTML;
}

// ==========================================================================
// CALENDAR HEATMAP ANUAL (Estadísticas Avanzadas)
// ==========================================================================
const MESES_CORTO_ES_HEATMAP = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

// Asistencia media (día completo, todas las convocatorias de ese día) por fecha de calendario
// del año indicado. Varias sesiones el mismo día (p.ej. "2024-03-15" y "2024-03-15_actuacion")
// se agregan en una sola celda.
function computeSeasonAttendanceHeatmapData(seasonLabel) {
    const dayBuckets = {};

    const allDates = getAllSessionDatesCached();
    allDates.forEach(dateKey => {
        if (!isSessionConcluded(dateKey)) return;
        const rawDate = dateKey.split("_")[0];
        if (!isDateInSeason(rawDate, seasonLabel)) return;

        const dayRecord = state.attendance[dateKey] || {};
        state.musicians.forEach(m => {
            const record = dayRecord[m.id];
            if (!record) return;
            if (isMusicianOnLeaveOnDate(m, dateKey)) return;

            if (!dayBuckets[rawDate]) dayBuckets[rawDate] = { presents: 0, total: 0 };
            dayBuckets[rawDate].total++;
            if (record.status === "present") dayBuckets[rawDate].presents++;
        });
    });

    return dayBuckets;
}

// Posiciona cada día de la temporada (1 sept. año1 -> 31 ago. año2) en la cuadrícula estilo
// GitHub: filas = día de la semana (0 = lunes ... 6 = domingo), columnas = nº de semana desde
// el lunes anterior (o igual) al 1 de septiembre, para que las columnas completas representen
// semanas naturales.
function computeSeasonHeatmapLayout(seasonLabel) {
    const { year1, year2 } = getSeasonBounds(seasonLabel);
    if (isNaN(year1) || isNaN(year2)) return [];

    const seasonStart = new Date(year1, 8, 1); // 1 de septiembre
    const seasonEnd = new Date(year2, 7, 31); // 31 de agosto
    const mondayOffset = (seasonStart.getDay() + 6) % 7; // 0 si el 1 de septiembre ya es lunes
    const gridStart = new Date(year1, 8, 1 - mondayOffset);

    const days = [];
    const cursor = new Date(gridStart);
    let index = 0;
    while (cursor <= seasonEnd) {
        if (cursor >= seasonStart) {
            const row = (cursor.getDay() + 6) % 7;
            const col = Math.floor(index / 7);
            const dateStr = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
            days.push({ date: dateStr, row, col, month: cursor.getMonth() });
        }
        cursor.setDate(cursor.getDate() + 1);
        index++;
    }
    return days;
}

// Mismo esquema semántico rojo/ámbar/verde que el resto de "Estadísticas Avanzadas", pero
// con la opacidad graduada dentro de cada franja para lograr el efecto "heatmap".
function getHeatmapDayColor(pct) {
    if (pct === null) return "var(--bg-compact-card)";
    let base, zoneMin, zoneMax;
    if (pct >= 80) { base = "#2ECC71"; zoneMin = 80; zoneMax = 100; }
    else if (pct >= 50) { base = "#E67E22"; zoneMin = 50; zoneMax = 79; }
    else { base = "#E74C3C"; zoneMin = 0; zoneMax = 49; }

    const t = zoneMax > zoneMin ? (pct - zoneMin) / (zoneMax - zoneMin) : 1;
    const opacity = (0.45 + t * 0.55).toFixed(2);
    const { r, g, b } = hexToRgbParts(base);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function renderStatsCalendarHeatmap() {
    const container = document.getElementById("advanced-stats-heatmap-container");
    try {
        renderStatsCalendarHeatmapUnsafe();
    } catch (err) {
        console.error("[Calendar heatmap] Error al renderizar:", err);
        if (container) {
            container.classList.remove("hidden");
            container.innerHTML = `<p class="text-muted" style="padding: 20px; color: var(--color-absent);">No se ha podido generar el calendario (${escapeHtml(err.message || String(err))}). Revisa la consola para más detalle.</p>`;
        }
        const emptyState = document.getElementById("advanced-stats-heatmap-empty");
        if (emptyState) emptyState.classList.add("hidden");
    }
}

function renderStatsCalendarHeatmapUnsafe() {
    const container = document.getElementById("advanced-stats-heatmap-container");
    const emptyState = document.getElementById("advanced-stats-heatmap-empty");
    const yearSelect = document.getElementById("advanced-stats-heatmap-year-select");
    if (!container) return;

    const allDates = getAllSessionDatesCached();
    const seasons = Array.from(new Set(
        allDates.map(d => getSeasonLabelForDate(d.split("_")[0])).filter(Boolean)
    )).sort().reverse();

    if (seasons.length === 0) {
        container.innerHTML = "";
        container.classList.add("hidden");
        if (yearSelect) yearSelect.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    container.classList.remove("hidden");
    if (emptyState) emptyState.classList.add("hidden");

    if (yearSelect) {
        const wantedOptions = seasons;
        const currentOptions = Array.from(yearSelect.options).map(o => o.value);
        const optionsMatch = currentOptions.length === wantedOptions.length && currentOptions.every((v, i) => v === wantedOptions[i]);
        if (!optionsMatch) {
            yearSelect.innerHTML = "";
            seasons.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s;
                opt.innerText = s;
                yearSelect.appendChild(opt);
            });
        }
        if (!state.statsHeatmapSelectedSeason || !seasons.includes(state.statsHeatmapSelectedSeason)) {
            state.statsHeatmapSelectedSeason = seasons[0];
        }
        yearSelect.value = state.statsHeatmapSelectedSeason;
    }

    const season = yearSelect ? yearSelect.value : seasons[0];
    const dayBuckets = computeSeasonAttendanceHeatmapData(season);
    const layout = computeSeasonHeatmapLayout(season);

    const CELL = 11, GAP = 3, STEP = CELL + GAP;
    const LEFT_MARGIN = 26, TOP_MARGIN = 18;
    const numCols = layout.reduce((max, d) => Math.max(max, d.col), 0) + 1;
    const width = LEFT_MARGIN + numCols * STEP;
    const height = TOP_MARGIN + 7 * STEP;

    let cellsSVG = "";
    layout.forEach(d => {
        const bucket = dayBuckets[d.date];
        const pct = bucket && bucket.total > 0 ? Math.round((bucket.presents / bucket.total) * 100) : null;
        const color = getHeatmapDayColor(pct);
        const x = LEFT_MARGIN + d.col * STEP;
        const y = TOP_MARGIN + d.row * STEP;
        const label = pct === null
            ? `${formatDateSpanish(d.date)}: sin convocatoria`
            : `${formatDateSpanish(d.date)}: ${pct}% asistencia (${bucket.presents}/${bucket.total})`;
        cellsSVG += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="2.5" fill="${color}" stroke="var(--border-color)" stroke-width="0.5"><title>${label}</title></rect>`;
    });

    // Etiquetas de mes: se coloca cada una en la columna de su primer día dentro de la temporada (Sep -> Ago).
    const SEASON_MONTH_ORDER_IDX = [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7];
    let monthLabelsSVG = "";
    let lastLabelCol = -3;
    SEASON_MONTH_ORDER_IDX.forEach(m => {
        const firstDay = layout.find(d => d.month === m);
        if (!firstDay) return;
        if (firstDay.col - lastLabelCol < 2) return; // evita solapes en meses muy cortos
        const x = LEFT_MARGIN + firstDay.col * STEP;
        monthLabelsSVG += `<text x="${x}" y="${TOP_MARGIN - 6}" style="font-size: 10px; fill: var(--text-muted);">${MESES_CORTO_ES_HEATMAP[m]}</text>`;
        lastLabelCol = firstDay.col;
    });

    // Etiquetas de día de la semana (solo Lun/Mié/Vie, como GitHub, para no saturar).
    const dayLabels = [{ row: 0, label: "Lun" }, { row: 2, label: "Mié" }, { row: 4, label: "Vie" }];
    let dayLabelsSVG = "";
    dayLabels.forEach(dl => {
        const y = TOP_MARGIN + dl.row * STEP + CELL - 1;
        dayLabelsSVG += `<text x="0" y="${y}" style="font-size: 9px; fill: var(--text-muted);">${dl.label}</text>`;
    });

    container.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="max-width: 100%;">
            ${monthLabelsSVG}
            ${dayLabelsSVG}
            ${cellsSVG}
        </svg>
    `;
}

// Calcula, para cada uno de los últimos "maxMonths" meses con datos, la posición de cada
// músico en el ranking de asistencia DE ESE MES (no acumulado), reutilizando la misma
// función de métricas que el resto de la app mediante su filtro de fechas opcional.
function getMonthlyRankingSeries(maxMonths = 6) {
    const monthSet = new Set();
    Object.keys(state.attendance || {}).forEach(dateKey => {
        if (!isSessionConcluded(dateKey)) return;
        monthSet.add(dateKey.split("_")[0].slice(0, 7));
    });

    let months = Array.from(monthSet).sort();
    if (months.length > maxMonths) {
        months = months.slice(-maxMonths);
    }

    const perMonthEntries = months.map(monthStr => {
        const dateFilterFn = d => d.split("_")[0].slice(0, 7) === monthStr;
        const entries = (state.musicians || []).map(m => {
            const metrics = getMusicianAttendanceMetrics(m.id, dateFilterFn);
            return { id: m.id, name: m.name, pct: metrics.attendancePct, attended: metrics.attended, total: metrics.totalConvocated };
        }).filter(e => e.total > 0);

        entries.sort((a, b) => {
            const pctDiff = b.pct - a.pct;
            if (Math.abs(pctDiff) > 0.0001) return pctDiff;
            if (b.attended !== a.attended) return b.attended - a.attended;
            return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        });

        const ranks = {};
        entries.forEach((e, idx) => { ranks[e.id] = idx + 1; });
        return { month: monthStr, ranks };
    });

    const series = (state.musicians || []).map(m => ({
        id: m.id,
        name: m.name,
        ranks: perMonthEntries.map(pm => pm.ranks[m.id] || null)
    })).filter(s => s.ranks.some(r => r !== null));

    return { months, series };
}

function renderAdvancedStatsBumpChart() {
    const container = document.getElementById("advanced-stats-bump-chart-container");
    const emptyState = document.getElementById("advanced-stats-bump-empty");
    const selectEl = document.getElementById("advanced-stats-musician-select");
    if (!container) return;

    if (selectEl && selectEl.dataset.populated !== "true") {
        const sortedMusicians = [...(state.musicians || [])].sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
        selectEl.innerHTML = `<option value="">Top 3 (por defecto)</option>` +
            sortedMusicians.map(m => `<option value="${m.id}">${escapeHtml(m.name)}</option>`).join("");
        selectEl.dataset.populated = "true";
    }
    if (selectEl) selectEl.value = advancedStatsSelectedMusicianId || "";

    const { months, series } = getMonthlyRankingSeries(6);

    if (months.length < 2 || series.length === 0) {
        container.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    let maxRank = 1;
    series.forEach(s => {
        s.ranks.forEach(r => { if (r && r > maxRank) maxRank = r; });
    });

    let top3Ids = [];
    for (let idx = months.length - 1; idx >= 0; idx--) {
        const rankedThisMonth = series
            .filter(s => s.ranks[idx] !== null)
            .sort((a, b) => a.ranks[idx] - b.ranks[idx]);
        if (rankedThisMonth.length > 0) {
            top3Ids = rankedThisMonth.slice(0, 3).map(s => s.id);
            break;
        }
    }

    const topColors = ["#D4AF37", "#C0C0C0", "#CD7F32"];
    const selected = advancedStatsSelectedMusicianId;

    const rowHeight = maxRank > 35 ? 11 : maxRank > 20 ? 14 : maxRank > 10 ? 18 : 24;
    const leftPad = 34, rightPad = 140, topPad = 16, bottomPad = 34;
    const chartWidth = 700;
    const chartHeight = topPad + (maxRank - 1) * rowHeight + bottomPad;
    const xStep = months.length > 1 ? (chartWidth - leftPad - rightPad) / (months.length - 1) : 0;

    const xFor = idx => leftPad + idx * xStep;
    const yFor = rank => topPad + (rank - 1) * rowHeight;

    function buildSeriesMarkup(s, color, strokeWidth, labeled) {
        const allPoints = [];
        s.ranks.forEach((r, idx) => { if (r !== null) allPoints.push({ idx, r }); });

        let markup = "";
        let segStart = 0;
        for (let i = 1; i <= allPoints.length; i++) {
            const brokenHere = i === allPoints.length || allPoints[i].idx !== allPoints[i - 1].idx + 1;
            if (brokenHere) {
                const seg = allPoints.slice(segStart, i);
                if (seg.length > 1) {
                    const d = seg.map((p, j) => `${j === 0 ? "M" : "L"}${xFor(p.idx)},${yFor(p.r)}`).join(" ");
                    markup += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"/>`;
                }
                segStart = i;
            }
        }

        allPoints.forEach(p => {
            markup += `<circle cx="${xFor(p.idx)}" cy="${yFor(p.r)}" r="${labeled ? 3.5 : 2.5}" fill="${color}" style="pointer-events:none;"/>`;
        });

        const hitD = allPoints.map((p, i) => `${i === 0 ? "M" : "L"}${xFor(p.idx)},${yFor(p.r)}`).join(" ");
        markup += `<path d="${hitD}" fill="none" stroke="transparent" stroke-width="14" data-musician-id="${s.id}"><title>${escapeHtml(s.name)}</title></path>`;

        if (labeled && allPoints.length > 0) {
            const last = allPoints[allPoints.length - 1];
            markup += `<circle cx="${xFor(last.idx)}" cy="${yFor(last.r)}" r="6" fill="${color}" style="pointer-events:none;"/>`;
            markup += `<text x="${xFor(last.idx) + 12}" y="${yFor(last.r) + 4}" font-size="12" fill="var(--text-primary)" style="pointer-events:none;">${escapeHtml(s.name)}</text>`;
        }

        return markup;
    }

    let svg = `<svg viewBox="0 0 ${chartWidth} ${chartHeight}" width="${chartWidth}" height="${chartHeight}" style="width:100%; height:auto; min-width:560px; display:block;" role="img" aria-label="Evolución mensual de la posición en el ranking de asistencia">`;

    const gridStep = Math.max(1, Math.round(maxRank / 12));
    for (let r = 1; r <= maxRank; r += gridStep) {
        svg += `<line x1="${leftPad - 8}" y1="${yFor(r)}" x2="${chartWidth - rightPad + 8}" y2="${yFor(r)}" stroke="var(--text-muted)" stroke-opacity="0.08" stroke-width="1"/>`;
    }
    months.forEach((m, idx) => {
        svg += `<text x="${xFor(idx)}" y="${chartHeight - 12}" text-anchor="middle" font-size="11" fill="var(--text-muted)">${formatMonthShortLabelEs(m)}</text>`;
    });

    const backgroundSeries = series.filter(s => selected ? s.id !== selected : !top3Ids.includes(s.id));
    backgroundSeries.forEach(s => {
        svg += buildSeriesMarkup(s, "var(--text-muted)", 1.5, false);
    });

    if (selected) {
        const s = series.find(x => x.id === selected);
        if (s) svg += buildSeriesMarkup(s, "#D4AF37", 3, true);
    } else {
        top3Ids.forEach((id, i) => {
            const s = series.find(x => x.id === id);
            if (s) svg += buildSeriesMarkup(s, topColors[i], 2.5, true);
        });
    }

    svg += `</svg>`;
    container.innerHTML = svg;

    container.querySelectorAll("[data-musician-id]").forEach(el => {
        el.style.cursor = "pointer";
        el.addEventListener("click", () => {
            const id = el.getAttribute("data-musician-id");
            advancedStatsSelectedMusicianId = (advancedStatsSelectedMusicianId === id) ? "" : id;
            renderAdvancedStatsBumpChart();
        });
    });
}

function setupAdvancedStatsEvents() {
    const selectEl = document.getElementById("advanced-stats-musician-select");
    if (selectEl) {
        selectEl.addEventListener("change", () => {
            advancedStatsSelectedMusicianId = selectEl.value || "";
            renderAdvancedStatsBumpChart();
        });
    }
}

function updateLugarEnsayoImagePreview() {
    const placeholder = document.getElementById("lugar-ensayo-image-placeholder");
    const img = document.getElementById("lugar-ensayo-image-img");
    const btnRemove = document.getElementById("btn-remove-lugar-ensayo-image");

    if (currentLugarEnsayoImageDataUrl) {
        if (img) {
            img.src = currentLugarEnsayoImageDataUrl;
            img.classList.remove("hidden");
        }
        if (placeholder) placeholder.classList.add("hidden");
        if (btnRemove) btnRemove.classList.remove("hidden");
    } else {
        if (img) {
            img.src = "";
            img.classList.add("hidden");
        }
        if (placeholder) placeholder.classList.remove("hidden");
        if (btnRemove) btnRemove.classList.add("hidden");
    }
}

function openLugarEnsayoModal(id = null) {
    const modal = document.getElementById("modal-lugar-ensayo");
    const titleEl = document.getElementById("modal-lugar-ensayo-title");
    const idInput = document.getElementById("lugar-ensayo-id");
    const nameInput = document.getElementById("lugar-ensayo-nombre-input");
    const mapsUrlInput = document.getElementById("lugar-ensayo-maps-url-input");

    if (!modal) return;

    if (id) {
        const loc = (state.rehearsalLocations || []).find(l => l.id === id);
        if (loc) {
            if (titleEl) titleEl.innerText = "Editar Lugar de Ensayo";
            if (idInput) idInput.value = loc.id;
            if (nameInput) nameInput.value = loc.name || "";
            if (mapsUrlInput) mapsUrlInput.value = loc.mapsUrl || "";
            currentLugarEnsayoImageDataUrl = loc.image || "";
        }
    } else {
        if (titleEl) titleEl.innerText = "Añadir Lugar de Ensayo";
        if (idInput) idInput.value = "";
        if (nameInput) nameInput.value = "";
        if (mapsUrlInput) mapsUrlInput.value = "";
        currentLugarEnsayoImageDataUrl = "";
    }

    updateLugarEnsayoImagePreview();
    modal.classList.add("active");
}

function setupLugaresEnsayoEvents() {
    const btnAdd = document.getElementById("btn-add-lugar-ensayo");
    if (btnAdd) {
        btnAdd.addEventListener("click", () => openLugarEnsayoModal());
    }

    const modal = document.getElementById("modal-lugar-ensayo");
    const btnClose = document.getElementById("btn-close-lugar-ensayo-modal");
    const btnCancel = document.getElementById("btn-cancel-lugar-ensayo-modal");
    const form = document.getElementById("form-lugar-ensayo");

    const btnUploadImg = document.getElementById("btn-upload-lugar-ensayo-image");
    const fileInputImg = document.getElementById("lugar-ensayo-image-file");
    const btnRemoveImg = document.getElementById("btn-remove-lugar-ensayo-image");

    if (btnUploadImg && fileInputImg) {
        btnUploadImg.addEventListener("click", () => fileInputImg.click());
    }

    if (fileInputImg) {
        fileInputImg.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            compressImageFile(file, 800, 800, (dataUrl) => {
                currentLugarEnsayoImageDataUrl = dataUrl;
                updateLugarEnsayoImagePreview();
            });
        });
    }

    if (btnRemoveImg) {
        btnRemoveImg.addEventListener("click", () => {
            currentLugarEnsayoImageDataUrl = "";
            if (fileInputImg) fileInputImg.value = "";
            updateLugarEnsayoImagePreview();
        });
    }

    const closeModal = () => {
        if (modal) modal.classList.remove("active");
    };

    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("lugar-ensayo-id").value;
            const name = document.getElementById("lugar-ensayo-nombre-input").value.trim();
            const mapsUrlInput = document.getElementById("lugar-ensayo-maps-url-input");
            const mapsUrl = mapsUrlInput ? mapsUrlInput.value.trim() : "";

            if (!name) {
                showToast("Por favor introduce el nombre del lugar", "error");
                return;
            }

            if (!state.rehearsalLocations) state.rehearsalLocations = [];

            if (id) {
                const idx = state.rehearsalLocations.findIndex(l => l.id === id);
                if (idx !== -1) {
                    state.rehearsalLocations[idx].name = name;
                    state.rehearsalLocations[idx].mapsUrl = mapsUrl;
                    state.rehearsalLocations[idx].image = currentLugarEnsayoImageDataUrl;
                }
            } else {
                const newLoc = {
                    id: "loc_" + Date.now(),
                    name: name,
                    mapsUrl: mapsUrl,
                    image: currentLugarEnsayoImageDataUrl
                };
                state.rehearsalLocations.push(newLoc);
            }

            dbSaveRehearsalLocations();
            renderAdminLugaresEnsayoList();
            renderRehearsalLocationOptions();
            closeModal();
            showToast("Lugar de ensayo guardado correctamente", "success");
        });
    }
}

function renderAdminSuggestionsList() {
    const container = document.getElementById("admin-suggestions-list");
    const emptyState = document.getElementById("admin-suggestions-empty");
    if (!container) return;

    const visibleSuggestions = (state.suggestions || []).filter(s => !s.deletedByAdmin);
    container.innerHTML = "";

    if (visibleSuggestions.length === 0) {
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    }
    if (emptyState) emptyState.classList.add("hidden");

    const getTimestamp = (d) => {
        if (!d) return 0;
        const t = new Date(d).getTime();
        return isNaN(t) ? 0 : t;
    };

    const sorted = [...visibleSuggestions].sort((a, b) => getTimestamp(b.date) - getTimestamp(a.date));

    sorted.forEach(sug => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "card-item";
        itemDiv.style.cssText = `
            padding: 14px;
            border-radius: 8px;
            background: rgba(255,255,255,0.02);
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 4px;
        `;

        const authorLabel = sug.anonymous ? "Anónimo" : escapeHtml(sug.authorName || "Desconocido");

        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-gold);">${authorLabel}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 0.72rem; color: var(--text-muted);">${new Date(sug.date).toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit'})}</span>
                    <button type="button" class="btn-delete-suggestion" title="Eliminar sugerencia" aria-label="Eliminar sugerencia" style="background: none; border: none; cursor: pointer; color: var(--color-absent); padding: 2px; display: inline-flex; align-items: center;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
            <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: var(--text-color); white-space: pre-wrap;">${escapeHtml(sug.text)}</p>
        `;

        const deleteBtn = itemDiv.querySelector(".btn-delete-suggestion");
        deleteBtn.addEventListener("click", () => {
            if (!confirm("¿Estás seguro de que quieres eliminar esta sugerencia? Esta acción no se puede deshacer.")) return;
            dbDeleteSuggestionByAdmin(sug)
                .then(() => {
                    showToast("Sugerencia eliminada", "success");
                    renderAdminSuggestionsList();
                    updateSuggestionsBadge();
                })
                .catch(() => {
                    showToast("No se ha podido eliminar la sugerencia.", "error");
                });
        });

        container.appendChild(itemDiv);
    });
}

function renderGeneralOverviewChart() {
    const container = document.getElementById("stats-ov-chart-container");
    if (!container) return;

    // 1. Gather all rehearsal sessions (only past ones, matching other stats)
    const rehearsalDates = Object.keys(state.attendance).filter(dateKey => {
        const session = state.sessionTypes[dateKey];
        const isPast = isSessionConcluded(dateKey);
        return isPast && (!session || session.type === "ensayo");
    });

    // 2. Dynamic Season Dropdown Population
    const ovYearSelect = document.getElementById("stats-ov-year-select");
    if (ovYearSelect) {
        populateSeasonSelect(ovYearSelect, rehearsalDates, false, state.statsOvSelectedSeason);
        state.statsOvSelectedSeason = ovYearSelect.value;
    }

    if (rehearsalDates.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center; border-left: 2px solid var(--border-color); border-bottom: 2px solid var(--border-color); box-sizing: border-box; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay ensayos registrados de forma histórica para generar gráficos.</p>
            </div>
        `;
        return;
    }

    if (state.statsOvMode === "sessions") {
        renderOverviewSessionsChart(container, rehearsalDates);
        return;
    }

    let chartData = []; // Array of { label: string, pct: number, count: number }

    if (state.statsOvMode === "years") {
        const seasonsData = {};
        rehearsalDates.forEach(date => {
            const season = getSeasonLabelForDate(date);
            if (!seasonsData[season]) {
                seasonsData[season] = { presents: 0, total: 0, count: 0 };
            }

            const dayRecord = state.attendance[date];
            state.musicians.forEach(m => {
                if (isMusicianOnLeaveOnDate(m, date)) return;
                const r = dayRecord[m.id];
                if (r) {
                    seasonsData[season].total++;
                    if (r.status === "present") {
                        seasonsData[season].presents++;
                    }
                }
            });
            seasonsData[season].count++;
        });

        const sortedSeasons = Object.keys(seasonsData).sort((a,b) => a.localeCompare(b));
        sortedSeasons.forEach(season => {
            const data = seasonsData[season];
            const pct = data.total > 0 ? Math.round((data.presents / data.total) * 100) : 0;
            chartData.push({ label: season, pct: pct, count: data.count });
        });
    } else {
        const selectedSeason = state.statsOvSelectedSeason || getCurrentSeasonLabel();
        const seasonMonths = getSeasonMonthsArray(selectedSeason);

        const monthsData = Array.from({ length: 12 }, () => ({ presents: 0, total: 0, count: 0 }));
        
        rehearsalDates.forEach(date => {
            const dateParts = date.split("-");
            const y = dateParts[0];
            const m = parseInt(dateParts[1], 10);
            
            const idx = seasonMonths.findIndex(sm => sm.year === y && sm.monthNum === m);
            if (idx !== -1) {
                const dayRecord = state.attendance[date];
                state.musicians.forEach(m => {
                    if (isMusicianOnLeaveOnDate(m, date)) return;
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

    const barMaxWidth = state.statsOvMode === "years" ? "96px" : "60px";

    let barsHTML = "";
    chartData.forEach(item => {
        const heightPct = item.pct;
        const tooltip = `${item.label}: ${item.pct}% asistencia (${item.count} ensayo${item.count !== 1 ? 's' : ''})`;
        const displayValue = item.count > 0 ? `${item.pct}%` : "-";

        barsHTML += `
            <div class="chart-bar-wrapper" style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 32px; max-width: ${barMaxWidth}; height: 100%; justify-content: flex-end; position: relative;">
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

// Vista "Ensayos" de Visión General: un punto de asistencia % por cada ensayo de la temporada
// seleccionada, unidos por una línea, para ver la evolución ensayo a ensayo (no por período).
function renderOverviewSessionsChart(container, rehearsalDates) {
    const selectedSeason = state.statsOvSelectedSeason || getCurrentSeasonLabel();

    const points = rehearsalDates
        .filter(date => isDateInSeason(date, selectedSeason))
        .sort((a, b) => a.localeCompare(b))
        .map(date => {
            let presents = 0;
            let total = 0;
            const dayRecord = state.attendance[date];
            state.musicians.forEach(m => {
                if (isMusicianOnLeaveOnDate(m, date)) return;
                const r = dayRecord[m.id];
                if (r) {
                    total++;
                    if (r.status === "present") presents++;
                }
            });
            const pct = total > 0 ? Math.round((presents / total) * 100) : null;
            return { date, pct, presents, total };
        })
        .filter(p => p.pct !== null);

    if (points.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px 10px; text-align: center; border-left: 2px solid var(--border-color); border-bottom: 2px solid var(--border-color); box-sizing: border-box; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                <p class="text-muted" style="margin: 0; font-size: 0.88rem;">No hay ensayos registrados en la temporada ${selectedSeason}.</p>
            </div>
        `;
        return;
    }

    const plotHeight = 250, topMargin = 20, bottomMargin = 34, leftMargin = 42, stepX = 46, rightPad = 20;
    const width = leftMargin + Math.max(points.length - 1, 0) * stepX + rightPad;
    const svgHeight = topMargin + plotHeight + bottomMargin;
    const yForPct = pct => topMargin + plotHeight - (pct / 100) * plotHeight;

    let gridLinesSVG = "";
    [0, 25, 50, 75, 100].forEach(mark => {
        const y = yForPct(mark);
        gridLinesSVG += `<line x1="${leftMargin}" y1="${y}" x2="${width - rightPad + 10}" y2="${y}" stroke="${mark === 0 ? "var(--border-color)" : "rgba(255,255,255,0.06)"}" stroke-width="1" stroke-dasharray="${mark === 0 ? "0" : "3,3"}" />`;
        gridLinesSVG += `<text x="${leftMargin - 8}" y="${y + 3}" text-anchor="end" style="font-size: 9px; fill: var(--text-muted);">${mark}%</text>`;
    });

    const coords = points.map((p, i) => ({ ...p, x: leftMargin + i * stepX, y: yForPct(p.pct) }));
    const polylinePoints = coords.map(c => `${c.x},${c.y}`).join(" ");

    let dotsSVG = "";
    let xLabelsSVG = "";
    coords.forEach(c => {
        const dateParts = c.date.split("-");
        const shortLabel = `${dateParts[2]}/${dateParts[1]}`;
        const tooltip = `${formatDateSpanish(c.date)}: ${c.pct}% asistencia (${c.presents}/${c.total})`;
        dotsSVG += `<circle cx="${c.x}" cy="${c.y}" r="4" fill="var(--color-gold)" stroke="var(--bg-card)" stroke-width="1.5" style="cursor: help;"><title>${tooltip}</title></circle>`;
        xLabelsSVG += `<text x="${c.x}" y="${topMargin + plotHeight + 18}" text-anchor="middle" style="font-size: 9px; fill: var(--text-color); font-weight: 600;">${shortLabel}</text>`;
    });

    container.innerHTML = `
        <div style="overflow-x: auto; width: 100%;">
            <svg viewBox="0 0 ${width} ${svgHeight}" width="${width}" height="${svgHeight}" style="min-width: ${width}px; font-family: 'Outfit', sans-serif;">
                ${gridLinesSVG}
                <polyline points="${polylinePoints}" fill="none" stroke="var(--color-gold)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
                ${dotsSVG}
                ${xLabelsSVG}
            </svg>
        </div>
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
    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
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



function purgeExpiredNotifications(notifs) {
    if (!Array.isArray(notifs)) return [];
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 días (1 semana)
    const now = Date.now();
    const clearedAtTime = state.notificationsClearedAt ? new Date(state.notificationsClearedAt).getTime() : null;
    return notifs.filter(n => {
        if (!n) return false;
        if (!n.date) return true;
        const notifTime = new Date(n.date).getTime();
        if (isNaN(notifTime)) return true;
        if (clearedAtTime && !isNaN(clearedAtTime) && notifTime <= clearedAtTime) return false;
        return (now - notifTime) <= ONE_WEEK_MS;
    });
}

function updateNotificationsBadge() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;
    
    const deletedIds = getDeletedNotificationIds(musicianId);
    let notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
    
    // Purga de notificaciones mayores a 7 días y filtro de eliminadas
    const validNotifs = purgeExpiredNotifications(notifs).filter(n => !deletedIds.includes(n.id));
    if (validNotifs.length !== notifs.length) {
        localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(validNotifs));
    }

    const unseenCount = validNotifs.filter(n => !n.seen).length;
    
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

function formatNotificationTimestamp(dateInput) {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "";

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    const timeStr = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

    if (d >= todayStart) {
        return `Hoy, ${timeStr}`;
    } else if (d >= yesterdayStart) {
        return `Ayer, ${timeStr}`;
    } else {
        const day = d.getDate();
        const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
        const month = months[d.getMonth()];
        return `${day} ${month}, ${timeStr}`;
    }
}

function dispatchSessionNotification(sessionKey, sessionData, isSilent = false, isUpdate = false, isDeleted = false) {
    if (!sessionData) return;

    const rawDate = sessionKey.split("_")[0];
    const formattedDate = formatDateShortSpanish(rawDate);
    let title;
    if (isDeleted) {
        title = sessionData.type === "actuacion" ? "Actuación Eliminada" : "Ensayo Eliminado";
    } else if (isUpdate) {
        title = sessionData.type === "actuacion" ? "Actuación Actualizada" : "Ensayo Actualizado";
    } else {
        title = sessionData.type === "actuacion" ? "Nueva Actuación Creada" : "Nuevo Ensayo Creado";
    }
    let body = "";
    if (sessionData.type === "ensayo") {
        const subtypeText = getRehearsalSubtypeText(sessionData.subtype);
        const locationVal = sessionData.location || "Parking";
        const timeStr = sessionData.time ? ` ${sessionData.time}` : "";
        body = `${subtypeText}${timeStr} - ${formattedDate} (${locationVal})`;
    } else {
        body = `${sessionData.name || "Actuación"} - ${formattedDate}`;
    }

    // El borrado usa un id distinto al de creación/actualización para que aparezca como un aviso
    // nuevo aparte, en vez de sobrescribir (y hacer desaparecer) el aviso original de "Ensayo Creado".
    const notifId = isDeleted ? `session_${sessionKey}_${sessionData.type}_deleted` : `session_${sessionKey}_${sessionData.type}`;
    // En una actualización o un borrado se usa la fecha actual (no la de creación original) para que
    // la notificación resurja como reciente en vez de quedar enterrada u ordenada por su antigüedad.
    const creationDate = (isUpdate || isDeleted) ? new Date().toISOString() : (sessionData.createdAt || sessionData.date || new Date().toISOString());

    const musicians = state.musicians || [];
    musicians.forEach(m => {
        if (!m || !m.id) return;
        if (isMusicianConvocated(m.id, sessionData)) {
            const key = "yacente_notifications_" + m.id;
            const deletedIds = getDeletedNotificationIds(m.id);
            if (deletedIds.includes(notifId)) return;

            let notifs = JSON.parse(localStorage.getItem(key) || "[]");
            notifs = purgeExpiredNotifications(notifs);

            const existingIdx = notifs.findIndex(n => n.id === notifId);
            const notifObj = {
                id: notifId,
                title: title,
                body: body,
                date: creationDate,
                // Una actualización real (lugar/hora) o un borrado deben volver a aparecer como no
                // leídos, aunque el músico ya hubiera visto el aviso original de creación.
                seen: (isUpdate || isDeleted) ? false : (existingIdx !== -1 ? (notifs[existingIdx].seen || false) : false),
                type: sessionData.type
            };

            if (existingIdx !== -1) {
                notifs[existingIdx] = notifObj;
            } else {
                notifs.unshift(notifObj);
            }

            // Ordenamiento cronológico inverso por fecha de creación
            notifs.sort((a, b) => {
                const tA = a.date ? new Date(a.date).getTime() : 0;
                const tB = b.date ? new Date(b.date).getTime() : 0;
                return tB - tA;
            });

            localStorage.setItem(key, JSON.stringify(notifs));
        }
    });

    updateNotificationsBadge();
    if (document.body.classList.contains("component-portal")) {
        if (!isSilent) {
            sendBrowserNotification(title, body);
        }
        renderComponentNotificationsList();
    }
}

function syncAllSessionNotifications() {
    if (!state.sessionTypes) return;
    const keys = Object.keys(state.sessionTypes);
    keys.forEach(key => {
        const sessionData = state.sessionTypes[key];
        if (sessionData) {
            dispatchSessionNotification(key, sessionData, true);
        }
    });
}

function renderComponentNotificationsList() {
    const musicianId = getAuthMusicianId();
    if (!musicianId) return;

    const deletedIds = getDeletedNotificationIds(musicianId);
    let notifs = JSON.parse(localStorage.getItem("yacente_notifications_" + musicianId) || "[]");
    
    // Purga de notificaciones mayores a 7 días y filtro de eliminadas
    const validNotifs = purgeExpiredNotifications(notifs).filter(n => !deletedIds.includes(n.id));
    if (validNotifs.length !== notifs.length) {
        notifs = validNotifs;
    } else {
        notifs = validNotifs;
    }

    // Ordenamiento cronológico inverso estricto por fecha de emisión
    notifs.sort((a, b) => {
        const tA = a.date ? new Date(a.date).getTime() : 0;
        const tB = b.date ? new Date(b.date).getTime() : 0;
        return tB - tA;
    });

    localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));

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

        const isAnnouncement = notif.type === "announcement" || (notif.title && notif.title.includes("📢"));
        const announcementBadge = isAnnouncement ? `<span style="display: inline-block; font-size: 0.65rem; background: rgba(212,175,55,0.2); color: var(--color-gold); border: 1px solid var(--color-gold); padding: 1px 6px; border-radius: 10px; font-weight: 700; margin-bottom: 4px; align-self: flex-start; pointer-events: none;">Aviso Directiva</span>` : '';

        itemDiv.innerHTML = `
            ${announcementBadge}
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; pointer-events: none;">
                <h4 style="margin: 0; font-size: 0.9rem; font-weight: 700; color: ${notif.seen ? 'var(--text-primary)' : 'var(--color-gold)'};">${notif.title}</h4>
                <span style="font-size: 0.72rem; color: var(--text-muted);">${formatNotificationTimestamp(notif.date)}</span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-color); pointer-events: none;">${notif.body}</p>
        `;

        // Swipe-to-delete gestures
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isDragging = false;
        let hasMoved = false;
        let gestureDirection = null;

        const handleStart = (clientX, clientY) => {
            startX = clientX;
            startY = clientY;
            isDragging = true;
            hasMoved = false;
            gestureDirection = null;
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
                            const deletedId = notif.id;
                            notifs.splice(index, 1);
                            localStorage.setItem("yacente_notifications_" + musicianId, JSON.stringify(notifs));
                            saveDeletedNotificationId(musicianId, deletedId);

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
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }, { passive: true });

        itemDiv.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            if (gestureDirection === null) {
                if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) return;
                gestureDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
                if (gestureDirection === "vertical") {
                    // Gesto vertical: se aborta el swipe-to-delete y se deja hacer scroll nativo a la página
                    isDragging = false;
                    itemDiv.style.transform = "translateX(0)";
                    itemDiv.style.opacity = "1";
                    return;
                }
            }

            if (e.cancelable) e.preventDefault();
            handleMove(touch.clientX);
        }, { passive: false });
        
        itemDiv.addEventListener("touchend", handleEnd);
        itemDiv.addEventListener("touchcancel", handleEnd);

        itemDiv.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Prevent text selection and drag start
            handleStart(e.clientX, e.clientY);
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

function setupAnnouncementEvents() {
    const btnOpen = document.getElementById("btn-open-announcement-modal");
    const modal = document.getElementById("modal-send-announcement");
    if (!modal) return;

    const btnClose = document.getElementById("btn-close-announcement-modal");
    const btnCancel = document.getElementById("btn-cancel-announcement-modal");
    const btnClearAllNotifications = document.getElementById("btn-clear-all-notifications");
    const form = document.getElementById("form-send-announcement");
    const titleInput = document.getElementById("announcement-title-input");
    const bodyInput = document.getElementById("announcement-body-input");
    const targetSelect = document.getElementById("announcement-target-select");
    const quickPills = document.querySelectorAll("#announcement-quick-pills .quick-announcement-pill");

    const openModal = () => {
        if (getAuthRole() === "component") {
            showToast("Solo la dirección puede emitir comunicados.", "error");
            return;
        }
        if (titleInput) titleInput.value = "";
        if (bodyInput) bodyInput.value = "";
        if (targetSelect) targetSelect.value = "all";
        modal.classList.add("active");
    };

    const closeModal = () => {
        modal.classList.remove("active");
    };

    if (btnOpen) btnOpen.addEventListener("click", openModal);
    if (btnClose) btnClose.addEventListener("click", closeModal);
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    if (btnClearAllNotifications) {
        btnClearAllNotifications.addEventListener("click", () => {
            if (confirm("¿Vaciar el buzón de notificaciones de TODOS los músicos? Se borrarán los comunicados guardados y se ocultarán los avisos de ensayos/actuaciones anteriores a este momento en cualquier dispositivo. Esto no afecta a la asistencia, el repertorio ni al resto de datos de la banda.")) {
                clearAllMusicianNotifications();
            }
        });
    }

    quickPills.forEach(pill => {
        pill.addEventListener("click", () => {
            const pTitle = pill.getAttribute("data-title");
            const pBody = pill.getAttribute("data-body");
            if (titleInput && pTitle) titleInput.value = pTitle;
            if (bodyInput && pBody) bodyInput.value = pBody;
        });
    });

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const rawTitle = titleInput ? titleInput.value.trim() : "";
            const body = bodyInput ? bodyInput.value.trim() : "";
            const targetSection = targetSelect ? targetSelect.value : "all";

            if (!rawTitle || !body) {
                showToast("Por favor, rellena el título y el mensaje del comunicado.", "error");
                return;
            }

            const title = rawTitle.startsWith("📢") ? rawTitle : `📢 ${rawTitle}`;

            const annObj = {
                id: "ann_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
                title: title,
                body: body,
                targetSection: targetSection,
                date: new Date().toISOString(),
                seen: false,
                type: "announcement"
            };

            // 1. Guardar en Firestore si la nube está activa
            if (isCloudActive()) {
                const db = firebase.firestore();
                db.collection("announcements").add(annObj)
                    .then(() => {
                        showToast("Comunicado enviado y publicado en la nube para la banda.", "success");
                    })
                    .catch(err => {
                        console.error("Error al enviar comunicado a Firestore:", err);
                        showToast("Comunicado enviado en modo local (offline)", "warning");
                    });
            } else {
                showToast("Comunicado enviado localmente a la banda", "success");
            }

            // 2. Distribuir a las notificaciones locales de los músicos convocados
            const musicians = state.musicians || [];
            musicians.forEach(m => {
                if (targetSection === "all" || m.instrument === targetSection) {
                    const key = "yacente_notifications_" + m.id;
                    const notifs = JSON.parse(localStorage.getItem(key) || "[]");
                    notifs.unshift(annObj);
                    localStorage.setItem(key, JSON.stringify(notifs));
                }
            });

            // 3. Notificación del navegador si aplica
            sendBrowserNotification(annObj.title, annObj.body);

            closeModal();
            updateNotificationsBadge();
            renderComponentNotificationsList();
        });
    }
}

// ==========================================================================
// GRÁFICO DE BARRAS DE ASISTENCIA POR DÍAS DE LA SEMANA (ESTILO VISIÓN GENERAL)
// ==========================================================================
function renderDayHeatmap(filteredDates) {
    const container = document.getElementById("stats-day-heatmap-container");
    if (!container) return;

    if (!filteredDates || filteredDates.length === 0 || !state.musicians || state.musicians.length === 0) {
        container.innerHTML = `<p class="text-muted text-center" style="padding: 20px 0;">No hay datos de convocatorias para generar el gráfico de barras por días de la semana en este período.</p>`;
        return;
    }

    const dayNames = [
        { name: "Lunes", short: "Lun" },
        { name: "Martes", short: "Mar" },
        { name: "Miércoles", short: "Mié" },
        { name: "Jueves", short: "Jue" },
        { name: "Viernes", short: "Vie" },
        { name: "Sábado", short: "Sáb" },
        { name: "Domingo", short: "Dom" }
    ];

    const dayStats = Array.from({ length: 7 }, (_, i) => ({
        index: i,
        name: dayNames[i].name,
        short: dayNames[i].short,
        sessionsCount: 0,
        totalPossible: 0,
        totalPresents: 0,
        avgPct: 0
    }));

    filteredDates.forEach(dateStr => {
        // dateStr puede llevar sufijo (p.ej. "2026-05-01_1" o "2026-05-01_trompetas1" para sesiones
        // múltiples/especiales el mismo día); hay que quedarse solo con la fecha real antes de parsear,
        // si no new Date(...) da Invalid Date y dayIdx sale NaN.
        const rawDateStr = dateStr.split("_")[0];
        const dateObj = new Date(rawDateStr.replace(/-/g, "/"));
        const jsDay = dateObj.getDay(); // 0 = Domingo, 1 = Lunes, ...
        if (isNaN(jsDay)) return;
        const dayIdx = jsDay === 0 ? 6 : jsDay - 1; // 0 = Lunes ... 6 = Domingo
        if (!dayStats[dayIdx]) return;

        const attendanceForDay = state.attendance[dateStr] || {};
        let dayPresents = 0;
        let dayPossible = 0;

        state.musicians.forEach(m => {
            if (m.status === "inactive") return;
            if (isMusicianOnLeaveOnDate(m, dateStr)) return;
            dayPossible++;
            const rec = attendanceForDay[m.id];
            if (rec && rec.status === "present") {
                dayPresents++;
            }
        });

        if (dayPossible > 0) {
            dayStats[dayIdx].sessionsCount++;
            dayStats[dayIdx].totalPossible += dayPossible;
            dayStats[dayIdx].totalPresents += dayPresents;
        }
    });

    let bestDay = null;
    let worstDay = null;
    let maxPct = -1;
    let minPct = 101;

    dayStats.forEach(stat => {
        if (stat.totalPossible > 0) {
            stat.avgPct = Math.round((stat.totalPresents / stat.totalPossible) * 100);
            if (stat.avgPct > maxPct) {
                maxPct = stat.avgPct;
                bestDay = stat;
            }
            if (stat.avgPct < minPct) {
                minPct = stat.avgPct;
                worstDay = stat;
            }
        }
    });

    let barsHTML = "";
    dayStats.forEach(stat => {
        const hasData = stat.sessionsCount > 0;
        const heightPct = hasData ? stat.avgPct : 0;
        const displayValue = hasData ? `${stat.avgPct}%` : "-";
        const tooltip = `${stat.name}: ${hasData ? stat.avgPct + '%' : 'Sin convocatorias'} (${stat.sessionsCount} convocatoria${stat.sessionsCount !== 1 ? 's' : ''})`;

        let barGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 100%)";
        let valColor = "var(--text-muted)";

        if (hasData) {
            if (stat.avgPct >= 80) {
                barGradient = "linear-gradient(180deg, #2ecc71 0%, rgba(46, 204, 113, 0.35) 100%)";
                valColor = "#2ecc71";
            } else if (stat.avgPct >= 60) {
                barGradient = "linear-gradient(180deg, var(--color-gold) 0%, rgba(212, 175, 55, 0.35) 100%)";
                valColor = "var(--color-gold)";
            } else {
                barGradient = "linear-gradient(180deg, #e74c3c 0%, rgba(231, 76, 60, 0.35) 100%)";
                valColor = "#e74c3c";
            }
        }

        barsHTML += `
            <div class="chart-bar-wrapper" style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 32px; max-width: 60px; height: 100%; justify-content: flex-end; position: relative;">
                <span class="bar-value" style="font-size: 0.75rem; font-weight: 700; color: ${valColor}; margin-bottom: 6px; z-index: 2; transition: opacity 0.2s;">
                    ${displayValue}
                </span>
                <div class="bar-fill" style="width: 55%; height: ${heightPct}%; background: ${barGradient}; border-radius: 4px 4px 0 0; transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: help; min-height: ${hasData ? '4px' : '0px'}" title="${tooltip}"></div>
                <span class="bar-label" style="position: absolute; bottom: -24px; font-size: 0.75rem; color: var(--text-color); font-weight: 600; white-space: nowrap;">
                    ${stat.short}
                </span>
            </div>
        `;
    });

    let insightsHTML = "";
    if (bestDay && bestDay.avgPct > 0) {
        let insightText = `El día preferido y con mayor asistencia media del grupo es el <strong>${bestDay.name}</strong> con un <strong>${bestDay.avgPct}%</strong> (${bestDay.sessionsCount} ${bestDay.sessionsCount === 1 ? 'convocatoria' : 'convocatorias'}).`;
        if (worstDay && worstDay.sessionsCount > 0 && worstDay.name !== bestDay.name) {
            insightText += ` El día con menor concurrencia es el <strong>${worstDay.name}</strong> (<strong>${worstDay.avgPct}%</strong>).`;
        }
        insightsHTML = `
            <div class="day-heatmap-insight-box" style="margin-top: 28px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2rem;">💡</span>
                    <span style="font-size: 0.88rem; color: var(--text-primary);">${insightText}</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="custom-vertical-chart" style="display: flex; height: 260px; width: 100%; border-bottom: 2px solid var(--border-color); border-left: 2px solid var(--border-color); position: relative; padding: 20px 10px 0 45px; box-sizing: border-box; font-family: 'Outfit', sans-serif;">
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

            <div class="bars-container" style="display: flex; flex: 1; justify-content: space-around; align-items: flex-end; height: 100%; z-index: 1; padding-bottom: 30px; box-sizing: border-box; gap: 8px;">
                ${barsHTML}
            </div>
        </div>
        ${insightsHTML}
    `;
}

// ==========================================================================
// GRÁFICO DE EVOLUCIÓN TEMPORAL MENSUAL INDIVIDUAL
// ==========================================================================
function renderMusicianMonthlyEvolution(musicianId) {
    const container = document.getElementById("detail-monthly-chart-container");
    if (!container) return;

    const musician = state.musicians.find(m => String(m.id) === String(musicianId));
    if (!musician) return;

    const yearFilter = document.getElementById("detail-filter-year").value;
    const typeFilter = document.getElementById("detail-filter-type").value;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const seasonMonths = getSeasonMonthsArray(yearFilter === "all" ? getCurrentSeasonLabel() : yearFilter);

    let maxMonthPct = -1;
    let bestMonth = null;

    const monthsData = seasonMonths.map(sm => {
        let presents = 0;
        let total = 0;

        Object.keys(state.attendance).forEach(dateStr => {
            if (!isSessionConcluded(dateStr)) return;
            const dateParts = dateStr.split("-");
            const y = dateParts[0];
            const m = parseInt(dateParts[1], 10);

            if (y === sm.year && m === sm.monthNum) {
                if (isMusicianOnLeaveOnDate(musician, dateStr)) return;
                const sessionType = state.sessionTypes[dateStr] ? state.sessionTypes[dateStr].type : "ensayo";
                if (typeFilter !== "all" && sessionType !== typeFilter) return;

                const rec = state.attendance[dateStr] ? state.attendance[dateStr][musicianId] : null;
                if (rec) {
                    total++;
                    if (rec.status === "present") presents++;
                }
            }
        });

        const pct = total > 0 ? Math.round((presents / total) * 100) : null;
        if (pct !== null && pct > maxMonthPct) {
            maxMonthPct = pct;
            bestMonth = sm.label;
        }
        return { label: sm.label, monthNum: sm.monthNum, year: sm.year, presents, total, pct };
    });

    let barsHTML = "";
    monthsData.forEach(item => {
        const hasData = item.pct !== null;
        const heightPct = hasData ? item.pct : 0;
        const displayValue = hasData ? `${item.pct}%` : "-";
        const tooltip = `${item.label} ${item.year}: ${hasData ? item.pct + '%' : 'Sin datos'} (${item.presents} de ${item.total} convocatorias)`;

        let barGradient = "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)";
        let valColor = "var(--text-muted)";

        if (hasData) {
            if (item.pct >= 80) {
                barGradient = "linear-gradient(180deg, #2ecc71 0%, rgba(46, 204, 113, 0.35) 100%)";
                valColor = "#2ecc71";
            } else if (item.pct >= 60) {
                barGradient = "linear-gradient(180deg, var(--color-gold) 0%, rgba(212, 175, 55, 0.35) 100%)";
                valColor = "var(--color-gold)";
            } else {
                barGradient = "linear-gradient(180deg, #e74c3c 0%, rgba(231, 76, 60, 0.35) 100%)";
                valColor = "#e74c3c";
            }
        }

        barsHTML += `
            <div class="chart-bar-wrapper" style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 20px; max-width: 40px; height: 100%; justify-content: flex-end; position: relative;">
                <span class="bar-value" style="font-size: 0.65rem; font-weight: 700; color: ${valColor}; margin-bottom: 4px; z-index: 2;">
                    ${displayValue}
                </span>
                <div class="bar-fill" style="width: 55%; height: ${heightPct}%; background: ${barGradient}; border-radius: 3px 3px 0 0; transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 6px rgba(0,0,0,0.3); cursor: help; min-height: ${hasData ? '3px' : '0px'}" title="${tooltip}"></div>
                <span class="bar-label" style="position: absolute; bottom: -22px; font-size: 0.65rem; color: var(--text-color); font-weight: 600; white-space: nowrap;">
                    ${item.label}
                </span>
            </div>
        `;
    });

    let trendNote = "";
    if (bestMonth && maxMonthPct >= 0) {
        trendNote = `
            <div style="margin-top: 24px; font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; background: rgba(212, 175, 55, 0.06); padding: 8px 12px; border-radius: 6px; border: 1px solid rgba(212, 175, 55, 0.15);">
                <span>💡</span>
                <span>Pico máximo del período: <strong>${bestMonth} (${maxMonthPct}%)</strong>.</span>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="custom-vertical-chart" style="display: flex; height: 180px; width: 100%; border-bottom: 2px solid var(--border-color); border-left: 2px solid var(--border-color); position: relative; padding: 15px 5px 0 35px; box-sizing: border-box; font-family: 'Outfit', sans-serif;">
            <div class="y-axis" style="position: absolute; left: 0; top: 0; bottom: 26px; width: 28px; display: flex; flex-direction: column; justify-content: space-between; align-items: flex-end; font-size: 0.65rem; color: var(--text-muted); padding-right: 4px; box-sizing: border-box;">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>
            
            <div class="grid-lines" style="position: absolute; left: 28px; right: 0; top: 0; bottom: 26px; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; z-index: 0;">
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px dashed rgba(255,255,255,0.06); width: 100%;"></div>
                <div style="border-top: 1px solid var(--border-color); width: 100%;"></div>
            </div>

            <div class="bars-container" style="display: flex; flex: 1; justify-content: space-around; align-items: flex-end; height: 100%; z-index: 1; padding-bottom: 26px; box-sizing: border-box; gap: 4px;">
                ${barsHTML}
            </div>
        </div>
        ${trendNote}
    `;
}



