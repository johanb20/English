// ===== SISTEMA DE UNIDADES =====
// Variables de estado
let currentUnit = 'unit1'; // Unidad visible inicialmente

// Función para obtener el nivel actual basado en la clase del body
function getCurrentLevel() {
    if (document.body.classList.contains('theme-pink')) return 'A1';
    if (document.body.classList.contains('theme-blue')) return 'A2';
    return 'default';
}

// Función para abrir/cerrar el menú de unidades
function toggleUnitsMenu() {
    const unitsPanel = document.getElementById('unitsPanel');
    const unitsOverlay = document.getElementById('unitsOverlay');
    
    if (!unitsPanel || !unitsOverlay) return;
    
    unitsPanel.classList.toggle('open');
    unitsOverlay.classList.toggle('active');
    
    // Prevenir scroll del body
    document.body.style.overflow = unitsPanel.classList.contains('open') ? 'hidden' : '';
}

// Función para cerrar el menú de unidades
function closeUnitsMenu() {
    const unitsPanel = document.getElementById('unitsPanel');
    const unitsOverlay = document.getElementById('unitsOverlay');
    
    if (!unitsPanel || !unitsOverlay) return;
    
    unitsPanel.classList.remove('open');
    unitsOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para cambiar de unidad (VERSIÓN ÚNICA Y COMPLETA)
function switchUnit(unitId) {
    console.log('Cambiando a unidad:', unitId); // ← AÑADE ESTO
    
    // Ocultar todas las unidades
    document.querySelectorAll('.unit-container').forEach(unit => {
        unit.classList.remove('active');
    });
    
    // Mostrar la unidad seleccionada
    const selectedUnit = document.getElementById(unitId);
    if (selectedUnit) {
        console.log('Unidad encontrada, activando'); // ← AÑADE ESTO
        
        selectedUnit.classList.add('active');
        currentUnit = unitId;
        
        // Scroll suave al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Actualizar el título en el indicador
        const unitTitle = selectedUnit.querySelector('h1').textContent;
        const titleElement = document.getElementById('currentUnitTitle');
        if (titleElement) {
            titleElement.textContent = unitTitle;
        }
        
        // Actualizar la clase active en el menú de unidades
        document.querySelectorAll('.unit-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.unit === unitId) {
                link.classList.add('active');
            }
        });
        
        // Cerrar el menú después de seleccionar
        closeUnitsMenu();
        
        // Guardar la última unidad vista POR NIVEL
        const level = getCurrentLevel();
        localStorage.setItem(`lastUnit_${level}`, unitId);
    } else {
        console.log('ERROR: No se encontró la unidad:', unitId); // ← AÑADE ESTO
    }
}

// Inicializar el sistema de unidades
function initUnitsSystem() {
    // Configurar los enlaces del menú de unidades
    document.querySelectorAll('.unit-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir navegación
            const unitId = link.dataset.unit;
            if (unitId) {
                switchUnit(unitId);
            }
        });
    });
    
    // 🔥 FORZAR UNIDAD 1 EN A1 (IGNORAR LOCALSTORAGE)
    const level = getCurrentLevel();
    
    if (level === 'A1') {
        // SIEMPRE abrir unidad 1 en A1, sin importar lo que haya en localStorage
        console.log('Forzando unidad 1 en A1');
        switchUnit('unit1');
        
        // Opcional: limpiar el localStorage de A1 para empezar fresco
        localStorage.removeItem('lastUnit_A1');
    } else if (level === 'A2') {
        // Para A2 (cuando tenga unidades)
        console.log('Nivel A2 - aquí irán sus unidades');
        // switchUnit('unit1_a2');
    }
    
    // Cerrar menú al hacer click en overlay
    const unitsOverlay = document.getElementById('unitsOverlay');
    if (unitsOverlay) {
        unitsOverlay.addEventListener('click', closeUnitsMenu);
    }
    
    console.log(`✅ Sistema de unidades inicializado para ${level}`);
}

// ===== menu.js - Menú flotante tipo hamburguesa =====
// Función para abrir/cerrar el menú principal
function toggleMenu() {
    const menuPanel = document.getElementById('menuPanel');
    const overlay = document.getElementById('menuOverlay');
    const icon = document.querySelector('.menu-icon');
    
    if (!menuPanel || !overlay) return;
    
    menuPanel.classList.toggle('open');
    overlay.classList.toggle('active');
    
    if (icon) {
        icon.textContent = menuPanel.classList.contains('open') ? '✕' : '☰';
    }
    
    document.body.style.overflow = menuPanel.classList.contains('open') ? 'hidden' : '';
}

// Función para cerrar el menú principal
function closeMenu() {
    const menuPanel = document.getElementById('menuPanel');
    const overlay = document.getElementById('menuOverlay');
    const icon = document.querySelector('.menu-icon');
    
    if (!menuPanel || !overlay) return;
    
    menuPanel.classList.remove('open');
    overlay.classList.remove('active');
    if (icon) icon.textContent = '☰';
    document.body.style.overflow = '';
}

// Marcar enlace activo del menú principal
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.toggle('active', linkPage === currentPage);
    });
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar menú principal
    setActiveLink();
    
    const overlay = document.getElementById('menuOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    const closeBtn = document.querySelector('.menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Inicializar sistema de unidades
    initUnitsSystem();
    
    console.log('✅ Todo inicializado correctamente');
});

// Exponer funciones globalmente
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.toggleUnitsMenu = toggleUnitsMenu;
window.closeUnitsMenu = closeUnitsMenu;
window.switchUnit = switchUnit;