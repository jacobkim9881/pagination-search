function Tags(element) {
  var DOMParent = element;
  var DOMList;
  var DOMInput;
  var dataAttribute;
  var arrayOfList;
  var input;

  function DOMCreate() {
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    input = document.createElement('input');
    var title_txt = document.title;
    if(title_txt.indexOf("Suppliers") >= 0) {
      input.className = "email_input";
      input.setAttribute("placeholder", "Separate emails with comma or press enter");
    } else {
      input.className = "variant_input";
      input.setAttribute("placeholder", "Separate options with comma or press enter");      
    }    
    DOMParent.appendChild(ul);
    DOMParent.appendChild(input); // first child is <ul>

    DOMList = DOMParent.firstElementChild; // last child is <input>

    DOMInput = DOMParent.lastElementChild;
  }

  function DOMRender() {
    // clear the entire <li> inside <ul> 
    DOMList.innerHTML = ''; // render each <li> to <ul>

    arrayOfList.forEach(function (currentValue, index) {
      var li = document.createElement('li');
      li.innerHTML = "".concat(currentValue, " <a>&times;</a>");
      li.querySelector('a').addEventListener('click', function () {
        onDelete(index);
        return false;
      });
      if(currentValue == "") return;
      var li_array = DOMList.querySelectorAll('li');
      if(li_array.length != 0) {
        for(let i = 0; i < li_array.length; i ++) {
          if(li_array[i].innerText == (currentValue + " ×")) return false;
        }
      }
      DOMList.appendChild(li);
      // console.log(DOMList.querySelectorAll('li').length);
      // if(arrayOfList.length != 0 && DOMList.querySelectorAll('li').length != 0) {
      //   input.setAttribute("placeholder", "");
      // } else { input.setAttribute("placeholder", "Separate options with a comma or press enter"); }
      setAttribute();
    });
    if(DOMParent.firstElementChild.childNodes.length != 0) input.setAttribute("placeholder", "");
    else {
      var title_txt = document.title;
      if(title_txt.indexOf("Suppliers") >= 0) {
        input.className = "email_input";
        input.setAttribute("placeholder", "Separate emails with comma or press enter");
      } else {
        input.className = "variant_input";
        input.setAttribute("placeholder", "Separate options with comma or press enter");      
      }
    }
  }

  function onKeyUp() {
    DOMInput.addEventListener('keyup', function (event) {
      var text = this.value.trim(); // check if ',' or 'enter' key was press

      if (text.includes(',') || event.keyCode == 13) {
        // check if empty text when ',' is remove
        if (text.replace(',', '') != '') {
          // push to array and remove ','
          arrayOfList.push(text.replace(',', ''));
        } // clear input


        this.value = '';
        DOMRender();
      }

    });
  }

  function onDelete(id) {
    arrayOfList = arrayOfList.filter(function (currentValue, index) {
      if (index == id) {
        return false;
      }
      return currentValue;
    });
    DOMRender();
  }

  function getAttribute() {
    dataAttribute = DOMParent.getAttribute('data-simple-tags');
    dataAttribute = dataAttribute.split(','); // store array of data attribute in arrayOfList

    arrayOfList = dataAttribute.map(function (currentValue) {
      return currentValue.trim();
    });
  }

  function setAttribute() {
    DOMParent.setAttribute('data-simple-tags', arrayOfList.toString());
  }

  getAttribute();
  DOMCreate();
  DOMRender();
  onKeyUp();
} // run immediately
