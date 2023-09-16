const $dietDescr = document.getElementById('diet-descr')
const $terrDescr = document.getElementById('territorialDescr')
const $terrErr = document.getElementById('tempDescrError')
const $land = document.getElementById('daytime-phone')
const $cell = document.getElementById('cell-phone')
const $weekError = document.getElementById('weekDaysError')
const $weekdays = document.getElementById('weekDays').getElementsByTagName('input')
let $headerH = 0
let $bannerH = 0
let $footerH = 0
let $WH = 0
   

function radioHandler(radio){
   if (radio.value === 'territorial'){
      $terrDescr.hidden = false
   }
   else{
      $terrDescr.hidden = true
      $terrErr.innerText = ''
   }
}

function configTime(){
  let arriveDropdown = document.getElementById("arrive");
  let leaveDropdown = document.getElementById("leave");

 for (let hour = 6; hour < 12; hour++) {
    arriveDropdown.options[arriveDropdown.options.length] = new Option(hour + ":00 AM");
    arriveDropdown.options[arriveDropdown.options.length] = new Option(hour + ":30 AM");
         
 }
 arriveDropdown.options[arriveDropdown.options.length] = new Option('12' + ":00 PM")

 for (let hour = 10; hour < 12; hour++) {
    leaveDropdown.options[leaveDropdown.options.length] = new Option(hour + ":00 AM");
    leaveDropdown.options[leaveDropdown.options.length] = new Option(hour + ":30 AM");
 }
 leaveDropdown.options[leaveDropdown.options.length] = new Option(12 + ":00 PM");
 leaveDropdown.options[leaveDropdown.options.length] = new Option(12 + ":30 PM");
 for (let hour = 1; hour < 6; hour++) {
    leaveDropdown.options[leaveDropdown.options.length] = new Option(hour + ":00 PM");
    leaveDropdown.options[leaveDropdown.options.length] = new Option(hour + ":30 PM");
 }
 leaveDropdown.options[leaveDropdown.options.length] = new Option(6 + ":00 PM");
}


function validateField(fname, errorMsg){
   let $valid = true
   const $input = document.getElementById(fname)
   const $errDiv = document.getElementById(fname + 'Error')
   if (!$input.parentElement.hidden && $input.value == ''){
      $errDiv.textContent = errorMsg
      $input.addEventListener("input", clearError)
      $valid = false
   }
   return $valid
}

function clearError(e){
   console.log(e)
   const $el = e.target
   $el.nextElementSibling.textContent = ''
   $el.removeEventListener(e.type, clearError)
}

function validateWeekD(){
   let $valid = false
   for (let day of $weekdays){
      if (day.checked){
         $valid = true
         break
      }
   }

   if (!$valid){
      $weekError.textContent = 'Please choose at least 1 day'
      for (let day of $weekdays){
         day.addEventListener('change', clearWDError)
      }
   }

   return $valid
}

function clearWDError(e){
   $weekError.textContent = ''
   for (let day of $weekdays){
      day.addEventListener(e.type, clearWDError)
   }
}

function validateAge(){
   let $valid = false
   const $ageError = document.getElementById('catAgeError')
   let $age = document.getElementsByClassName('age')[0].getElementsByTagName('input')[0].value
   try{
      if ($age === '' || parseInt($age) < 0){
         $ageError.textContent = 'Wrong age'
         //add event listenner to clear the error on click
      }
      else {
         $valid = true
         $ageError.textContent = ''
      }
      return $valid
   }

   catch(err){
      console.log('oops')
   }
}

function validateTime(){
   let $valid = true
   let $baseDate = new Date(2000, 1, 1)
   $baseDate = $baseDate.toDateString()
   const $dropVal = document.getElementById('arrive').value
   const $pickVal = document.getElementById('leave').value
   const $start = new Date($baseDate + ' ' + $dropVal)
   const $end = new Date($baseDate + ' ' + $pickVal)
   if ($start.getTime() - $end.getTime() >= 0){
      $valid = false
      document.getElementById('timeError').textContent = 'Drop-in time should be before Pick-up time'
      document.getElementById('arrive').addEventListener('click', clearTimeError)
      document.getElementById('leave').addEventListener('click', clearTimeError)
   }
   return $valid
}

function clearTimeError(){
   document.getElementById('timeError').textContent = ''
   document.getElementById('arrive').removeEventListener('click', clearTimeError)
   document.getElementById('leave').removeEventListener('click', clearTimeError)
}

function validatePhone(num){
   $valid = false
   //from MDN example
   const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/
   $valid = re.exec(num)
   return $valid ? true : false
}

function validateECP(){
   let $valid = validateField('emContPhone', 'Emergency contact phone # required')
   const $input = document.getElementById('emContPhone')
   if($valid){
      const $num = $input.value
      $valid = validatePhone($num)
      if (!$valid){
         document.getElementById('emContPhoneError').textContent = 'Invalid phone # format'
      }
   }
   if (!$valid){
      $input.addEventListener("input", clearError)
   }
   return $valid
}

function validateOP(){
   let $valid = true
   if ($land.value == '' && $cell.value == ''){
      $valid = false
      document.getElementById('daytime-phoneError').textContent = 'Either phone or cell phone is required'
      document.getElementById('cell-phoneError').textContent = 'Either phone or cell phone is required'
      $land.addEventListener('input', clearOPError)
      $cell.addEventListener('input', clearOPError)
   }
   if (!$land.value == ''){
      $valid = $valid && validatePhone($land.value)
      if (!$valid){
         document.getElementById('daytime-phoneError').textContent = 'Invalid phone # format'
         $land.addEventListener('input', clearError)
      }
   }
   if (!$cell.value == ''){
      $valid = $valid && validatePhone($cell.value)
      if (!$valid){
         document.getElementById('cell-phoneError').textContent = 'Invalid phone # format'
         $cell.addEventListener('input', clearError)
      }
   }
   return $valid
}

function clearOPError(){
   document.getElementById('daytime-phoneError').textContent = ''
   document.getElementById('cell-phoneError').textContent = ''
   $land.removeEventListener('input', clearOPError)
   $cell.removeEventListener('input', clearOPError)
}

function validateForm(){
   // const $catNameF = validateCatN()
   // const $diet = validateDiet()
   // const $temp = validateTerr()
   const $catNameF = validateField('catName','Please enter cat\'s name')
   const $catAge = validateAge()
   const $diet = validateField('dDescription', 'Please specify diet details')
   const $temp = validateField('tempDescr', 'Please specify details')
   const $cat = $catNameF && $catAge && $diet && $temp
   
   const $weekDays = validateWeekD()
   const $time = validateTime()
      
   const $ownerN = validateField('ownersName', 'Owner\'s name is required')
   const $ownerP = validateOP()
   const $owner = $ownerN && $ownerP

   const $ECN = validateField('emContName', 'Emergency contact is required')
   const $ECP = validateECP()
   const $EC = $ECN && $ECP


   return ($cat && $weekDays && $time && $owner && $EC )
}

function formSize(){
      $headerH = document.getElementsByClassName('header')[0].clientHeight
      $bannerH = document.getElementsByClassName('banner')[0].clientHeight
      $footerH = document.getElementsByClassName('footer')[0].clientHeight
      $WH = window.innerHeight
      const $formC = document.getElementsByClassName('formContainer')[0]
      console.log($WH - $headerH - $bannerH - $footerH)
      $formC.style.height = $WH - $headerH - $bannerH - $footerH + 'px'
   }

function init(){
//Initial elements states
   $dietDescr.hidden = true
   $terrDescr.hidden = true
   // $terrDescr.style.display = 'none'
   document.getElementById('sat').disabled = true
   document.getElementById('sun').disabled = true
   configTime()

//Controls states and events
   const $diet = document.getElementById('diet')
   $diet.addEventListener('change', function(){
   $dietDescr.hidden = !$dietDescr.hidden
   if ($dietDescr.hidden){
      document.getElementById('dDescription').value = ''
      document.getElementById('dDescriptionError').textContent = ''
   }
   })
     
   const $radios = document.querySelectorAll('input[type=radio]')
   $radios.forEach($radio => $radio.addEventListener('change', function(e){
      console.log(e)
      radioHandler(e.target)
   }))

   const $form = document.getElementsByTagName('form')[0]
   $form.addEventListener('submit', function(e){
      if (!validateForm()){
         e.preventDefault()
      }
   })

   document.onload = formSize
   window.onload = formSize
   window.onresize = formSize   
   

}

init()
