/* global alert */
window.onload = function () {
  const milesDriven = document.getElementById('case_contact_miles_driven')
  if (!milesDriven) return

  const durationHours = document.getElementById('case-contact-duration-hours')
  const durationHourDisplay = document.getElementById('casa-contact-duration-hours-display')
  const durationMinutes = document.getElementById('case-contact-duration-minutes')
  const durationMinuteDisplay = document.getElementById('casa-contact-duration-minutes-display')
  const caseContactSubmit = document.getElementById('case-contact-submit')

  milesDriven.onchange = function () {
    const contactMedium = document.getElementById('case_contact_medium_type').value || '(contact medium not set)'
    const contactMediumInPerson = `${contactMedium}` === 'in-person'
    if (milesDriven.value > 0 && !contactMediumInPerson) {
      alert(`Just checking: you drove ${milesDriven.value} miles for a ${contactMedium} contact?`)
    }
  }

  durationHours.onchange = function () {
    if (durationHourDisplay.value !== durationHours.value) {
      durationHourDisplay.value = durationHours.value
    }
  }
  durationHourDisplay.onchange = function () { updateHours() }
  durationHourDisplay.onkeyup = function () { updateHours() }

  durationMinutes.onchange = function () {
    if (durationMinuteDisplay.value !== durationMinutes.value) {
      durationMinuteDisplay.value = durationMinutes.value
    }
  }
  durationMinuteDisplay.onchange = function () { updateMinutes() }
  durationMinuteDisplay.onkeyup = function () { updateMinutes() }

  function updateMinutes () {
    if (durationMinuteDisplay.value !== durationMinutes.value) {
      durationMinutes.value = durationMinuteDisplay.value
    }
  }

  function updateHours () {
    if (durationHourDisplay.value !== durationHours.value) {
      durationHours.value = durationHourDisplay.value
    }
  }

  function validateAtLeastOneChecked (elements) {
    // convert to Array
    const elementsArray = Array.prototype.slice.call(elements)

    const numChecked = elementsArray.filter(x => x.checked).length
    if (numChecked === 0) {
      elementsArray[0].required = true
    } else {
      elementsArray[0].required = false
    }
  }

  function validateDuration () {
    const msg = 'Please enter a minimum duration of 15 minutes (even if you spent less time than this).'
    const fifteenMinutes = 15
    const totalMinutes = durationMinutes.value + durationHours.value * 60

    if (totalMinutes < fifteenMinutes) {
      durationMinutes.setCustomValidity(msg)
    } else {
      durationMinutes.setCustomValidity('')
    }
  }

  caseContactSubmit.onclick = function () {
    validateAtLeastOneChecked(document.querySelectorAll('.casa-case-id'))
    validateAtLeastOneChecked(document.querySelectorAll('.case-contact-contact-type'))

    validateDuration()
  }
}
$('document').ready(() => {
  $('.add-disallow-edit-tooltip a').tooltip('disable')
})