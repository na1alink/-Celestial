//sublist
document.addEventListener('DOMContentLoaded', function () {
	const dropdowns = document.querySelectorAll('.nav__item-dropdown')

	dropdowns.forEach(function (dropdown) {
		dropdown.addEventListener('click', function (event) {
			dropdown.classList.toggle('active')
			event.stopPropagation() // предотвращаем всплытие события
		})
	})

	document.addEventListener('click', function () {
		dropdowns.forEach(function (dropdown) {
			dropdown.classList.remove('active')
		})
	})
})

// catalogue

document.addEventListener('DOMContentLoaded', function () {
	const menuCheckbox = document.getElementById('menu__checkbox')
	const menu = document.querySelector('.catalogue__menu')

	menuCheckbox.addEventListener('change', function () {
		menu.style.display = this.checked ? 'block' : 'none'
	})

	document.addEventListener('mousedown', function (event) {
		const isClickInsideMenu = menu.contains(event.target)
		const isClickOnCheckbox = event.target === menuCheckbox

		if (!isClickInsideMenu && !isClickOnCheckbox) {
			menuCheckbox.checked = false
			menu.style.display = 'none'
		}
	})

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			menuCheckbox.checked = false
			menu.style.display = 'none'
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput')
	const clearSearchInput = document.getElementById('clearSearchInput')

	searchInput.addEventListener('input', function () {
		clearSearchInput.style.display = this.value !== '' ? 'block' : 'none'
	})

	clearSearchInput.addEventListener('click', function () {
		searchInput.value = ''
		clearSearchInput.style.display = 'none'
	})
})

//  Форма входа в аккаунт
function showLoginForm() {
	let loginForm = document.getElementById('loginForm')
	let overlay = document.createElement('div')
	overlay.className = 'overlay'
	document.body.appendChild(overlay)
	document.body.classList.add('form-open')
	loginForm.style.display = 'block'
}

function closeLoginForm() {
	let loginForm = document.getElementById('loginForm')
	let overlay = document.querySelector('.overlay')
	document.body.classList.remove('form-open')
	document.body.removeChild(overlay)
	loginForm.style.display = 'none'
	loginForm.reset()
}

function openLoginFormFullScreen() {
	let loginForm = document.getElementById('loginForm')
	let overlay = document.createElement('div')
	overlay.className = 'overlay'
	document.body.appendChild(overlay)
	document.body.classList.add('form-open')
	loginForm.style.display = 'block'
}

function validateEmail(emailInput) {
	const emailValue = emailInput.value
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (!emailRegex.test(emailValue)) {
		emailInput.classList.add('error')
	} else {
		emailInput.classList.remove('error')
	}
}

function validatePassword(passwordInput) {
	const passwordValue = passwordInput.value

	if (passwordValue.length < 6) {
		passwordInput.classList.add('error')
	} else {
		passwordInput.classList.remove('error')
	}
}
document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		closeLoginForm()
	}
})

// Input
function moveLabelUp(input) {
	const label = input.nextElementSibling // assuming label follows the input
	if (input.value.trim() !== '') {
		label.style.top = '8px'
		label.style.fontSize = '13px'
		label.style.lineHeight = '140%'
	}
}

function moveLabelDown(input) {
	const label = input.nextElementSibling // assuming label follows the input
	if (input.value.trim() === '') {
		label.style.top = '20px'
		label.style.fontSize = '16px'
		label.style.lineHeight = '140%'
	}
}

function togglePasswordVisibility(inputId) {
	let passwordInput = document.getElementById(inputId)
	let showImage = document.getElementById('showImage')
	let hideImage = document.getElementById('hideImage')

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text'
		showImage.style.display = 'none'
		hideImage.style.display = 'inline'
	} else {
		passwordInput.type = 'password'
		showImage.style.display = 'inline'
		hideImage.style.display = 'none'
	}
}

//верхнее меню на моб.
function toggleMenu() {
	const burger = document.querySelector('.burger')
	const menu = document.querySelector('.top__menu')

	burger.classList.toggle('open')
	menu.classList.toggle('open')

	if (menu.classList.contains('open')) {
		document.body.style.overflow = 'hidden'
		// Добавьте обработчик потери фокуса
		burger.addEventListener('blur', closeMenu)
	} else {
		document.body.style.overflow = 'auto'
		// Уберите обработчик потери фокуса
		burger.removeEventListener('blur', closeMenu)
	}
}

function closeMenu() {
	const burger = document.querySelector('.burger')
	const menu = document.querySelector('.top__menu')

	burger.classList.remove('open')
	menu.classList.remove('open')

	document.body.style.overflow = 'auto'
}

// Слайдер
let currentSlide = 0
const sliderWrapper = document.querySelector('.slider__wrapper')
const totalSlides = document.querySelectorAll('.slider__item').length
const paginationContainer = document.querySelector('.slider__pagination')

// Initialize pagination
for (let i = 0; i < totalSlides; i++) {
	const pageIndicator = document.createElement('span')
	pageIndicator.className = 'slider__pagination-item'
	pageIndicator.setAttribute('data-index', i)
	pageIndicator.addEventListener('click', function () {
		showSlide(parseInt(this.getAttribute('data-index')))
	})
	paginationContainer.appendChild(pageIndicator)
}

function updatePagination() {
	const pageIndicators = document.querySelectorAll('.slider__pagination-item')
	pageIndicators.forEach((indicator, index) => {
		if (index === currentSlide) {
			indicator.classList.add('active')
		} else {
			indicator.classList.remove('active')
		}
	})
}

function showSlide(index) {
	if (index < 0) {
		currentSlide = 0
	} else if (index >= totalSlides) {
		currentSlide = totalSlides - 1
	} else {
		currentSlide = index
	}

	const translationValue = -currentSlide * 100 + '%'
	sliderWrapper.style.transform = 'translateX(' + translationValue + ')'

	updatePagination()
}

function prevSlide() {
	showSlide(currentSlide - 1)
}

function nextSlide() {
	showSlide(currentSlide + 1)
}

updatePagination()

// Карта

function init() {
	let map = new ymaps.Map(
		'map',
		{
			center: [56.817629942137515, 60.675255344601226],
			zoom: 11,
		},
		{
			geolocationControlFloat: 'right',
			geolocationControlPosition: { top: 350, right: 7 },
		}
	)

	// // Создаем кнопку увеличения
	let zoomInButton = new ymaps.control.Button({
		data: { content: '+' },
		options: { maxWidth: 30 },
	})

	// Создаем кнопку уменьшения
	let zoomOutButton = new ymaps.control.Button({
		data: { content: '-' },
		options: { maxWidth: 30 },
	})

	// Добавляем обработчики клика по кнопкам
	zoomInButton.events.add('click', function () {
		let currentZoom = map.getZoom()
		map.setZoom(currentZoom + 1, { checkZoomRange: true })

		map.setCenter(placemark2.geometry.getCoordinates(), currentZoom + 1, {
			duration: 500,
		})
	})

	zoomOutButton.events.add('click', function () {
		let currentZoom = map.getZoom()
		map.setZoom(currentZoom - 1, { checkZoomRange: true })
	})

	// Добавляем кнопки на карту
	map.controls.add(zoomInButton, {
		float: 'none',
		position: { top: 250, right: 7 },
	})
	map.controls.add(zoomOutButton, {
		float: 'none',
		position: { top: 300, right: 7 },
	})

	// Создание меток
	let placemark1 = new ymaps.Placemark(
		[56.750492567966525, 60.74176199999998],
		{
			balloonContent: `

			<div class="balloon">
				<h3 class="balloon__title">Магазин на Черняховского</h3>
				<p class="balloon__address">улица Черняховского, 99</p>
				<a class="balloon__tel" href="tel:+79990123456">
					+7 (999) 012-34-56
				</a>
				<p class="balloon__text">
					Ежедневно с&nbsp;09:00 до&nbsp;22:00
				</p>
			</div>


		`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: './img/map-icon.svg',
			iconImageSize: [44, 44],
			iconImageOffset: [-19, -44],
		}
	)
	let placemark2 = new ymaps.Placemark(
		[56.86525956783924, 60.66798349999997],
		{
			balloonContent: `
				<div class="balloon">
					<h3 class="balloon__title">Магазин на Блюхера</h3>
					<p class="balloon__address">улица Блюхера, 99</p>
					<a class="balloon__tel" href="tel:+79990123456">
					+7 (999) 012-34-56 (доб. 02)
					</a>
					<p class="balloon__text">
					Ежедневно с&nbsp;10:00 до&nbsp;21:00
					</p>
				</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: './img/map-icon.svg',
			iconImageSize: [44, 44],
			iconImageOffset: [-19, -44],
		}
	)

	placemark1.events.add('click', function () {
		map.setCenter(placemark1.geometry.getCoordinates(), 15)
	})

	placemark2.events.add('click', function () {
		map.setCenter(placemark2.geometry.getCoordinates(), 15)
	})

	// map.controls.remove('geolocationControl') // удаляем геолокацию
	map.controls.remove('searchControl') // удаляем поиск
	map.controls.remove('trafficControl') // удаляем контроль трафика
	map.controls.remove('typeSelector') // удаляем тип
	map.controls.remove('fullscreenControl') // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('zoomControl') // удаляем контрол зуммирования
	map.controls.remove('rulerControl') // удаляем контрол правил
	// map.behaviors.disable(['scrollZoom']) // отключаем скролл карты (опционально)

	// Добавление меток на карту
	map.geoObjects.add(placemark1)
	map.geoObjects.add(placemark2)
}

ymaps.ready(init)

const mainButton = document.getElementById('mainButton')

mainButton.addEventListener('click', () => {
	window.location.href = 'index.html'
})

// Проверка текущей страницы при загрузке
if (window.location.href.endsWith('index.html')) {
	mainButton.classList.add('active')
}

// Каталог
document.addEventListener('DOMContentLoaded', function () {
	const menuButton = document.querySelector('.nav__btn-catalogue')
	const catalogueMenu = document.querySelector('.catalogue__menu')

	menuButton.addEventListener('click', function () {
		// Toggle the visibility of the menu
		if (
			catalogueMenu.style.display === 'none' ||
			catalogueMenu.style.display === ''
		) {
			catalogueMenu.style.display = 'block'
		} else {
			catalogueMenu.style.display = 'none'
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const menuButton = document.getElementById('toggleCatalog')
	const catalogueMenu = document.querySelector('.catalogue__menu')
	const menuHeader = document.querySelector('.catalogue__header')
	const backToCatalogButton = document.getElementById('backToCatalog')
	const currentCategory = document.getElementById('currentCategory')
	const closeMenuButton = document.getElementById('closeMenu')

	menuButton.addEventListener('click', function () {
		// Toggle the visibility of the menu and menu header
		catalogueMenu.style.display = 'block'
		menuHeader.style.display = 'block'

		currentCategory.textContent = 'Каталог товаров'
	})

	closeMenuButton.addEventListener('click', function () {
		// Hide the menu and menu header
		catalogueMenu.style.display = 'none'
		menuHeader.style.display = 'none'
		// Clear the current category
		currentCategory.textContent = ''
	})

	backToCatalogButton.addEventListener('click', function () {
		// Hide the current submenu and update the header
		hideSubMenu()
		currentCategory.textContent = ''
	})

	function hideSubMenu() {
		// Hide the submenu
		document
			.querySelectorAll('.catalogue__submenu-level')
			.forEach(function (submenu) {
				submenu.style.display = 'none'
			})
	}

	function showSubMenu(submenu) {
		// Show the specified submenu and update the header
		hideSubMenu()
		submenu.style.display = 'block'
		currentCategory.textContent = submenu.previousElementSibling.textContent
	}

	catalogueMenu.addEventListener('click', function (event) {
		var target = event.target

		if (target.classList.contains('catalogue__link')) {
			// Check if the clicked item has a submenu
			var submenu = target.nextElementSibling
			if (submenu && submenu.classList.contains('catalogue__submenu-level')) {
				// Show the submenu
				showSubMenu(submenu)
			}
		}
	})
})
