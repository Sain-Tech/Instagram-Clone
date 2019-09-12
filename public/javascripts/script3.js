function SearchBarExtension() {
  var Cover = document.getElementById('searchbarcover');
  var Icon = document.getElementById('searchbaricon');
  var Clear = document.getElementById('searchbarclear');
  Cover.style.visibility = 'hidden';
  Icon.style.visibility = 'visible';
  Clear.style.visibility = 'visible';
  Icon.style.left = 10 + 'px';
  Icon.style.position = "absolute";
  Icon.style.top = 5 + 'px';
  document.getElementById('searchbarCore').focus();
}
var isClearFocused = 0;
function ClearGot() {
  isClearFocused = 1;
}
function ClearLost() {
  isClearFocused = 0;
}

function SearchBarOnBlur() {
  if (isClearFocused == 0) {
    var InputCore = document.getElementById('searchbarCore')
    var Cover = document.getElementById('searchbarcover');
    var Icon = document.getElementById('searchbaricon');
    var Clear = document.getElementById('searchbarclear');
    var SearchText = document.getElementById('searchBarText');
    Cover.style.visibility = 'visible';
    Clear.style.visibility = 'hidden';
    Icon.style.left = 0 + 'px';
    Icon.style.position = "inherit";
    Icon.style.top = 0 + 'px';
    if (InputCore.value != "") {
      SearchText.innerHTML=InputCore.value;
    }
    else {
      SearchText.innerHTML="검색";
    }
  }
}

function SearchBarClear() {
  document.getElementById('searchbarCore').value = "";
  var Cover = document.getElementById('searchbarcover');
  var Icon = document.getElementById('searchbaricon');
  var Clear = document.getElementById('searchbarclear');
  var SearchText = document.getElementById('searchBarText');
  Cover.style.visibility = 'visible';
  Clear.style.visibility = 'hidden';
  Icon.style.left = 0 + 'px';
  Icon.style.position = "inherit";
  Icon.style.top = 0 + 'px';
  SearchText.innerHTML="검색";
}

function ModalDialogAction(arg) {
  if (arg == 0) {
  }
  /*.............................*/
  else if (arg == 4) {
    location.replace('/logout');
  }
}

function ModalDialogOpen(id) {
  var modalDialog = document.getElementById(id);
  modalDialog.style.display = "block";
}

function ModalDialogClose(id) {
  var modalDialog = document.getElementById(id);
  modalDialog.style.display = "none";
}

function ModalDialogOver(mElement) {
  document.getElementById(mElement).style.backgroundColor="#f0f0f0";
}

function FDModalDialogOpen(dlgid, imgid, imgsrc) {
  var modalDialog = document.getElementById(dlgid);
  modalDialog.style.display = "block";
  document.getElementById(imgid).src = imgsrc;
}

function FDModalDialogClose(dlgid) {
  var modalDialog = document.getElementById(dlgid);
  modalDialog.style.display = "block";
}

function ModalDialogOut(mElement) {
  document.getElementById(mElement).style.backgroundColor="#fff";
}

function HiddenPopupShow(mElement) {
  document.getElementById(mElement).style.zIndex="1";
}
function HiddenPopupOut(mElement) {
  document.getElementById(mElement).style.zIndex="-1";
}

window.onclick = function(event) {
  var modalDialog = document.getElementById('modaldialog');
  var modalDialog2 = document.getElementById('modaldialog2');
  var feedModal = document.getElementById('feedModalDialog');
  if (event.target == modalDialog) {
    modalDialog.style.display = "none";
  }
  else if (event.target == modalDialog2) {
    modalDialog2.style.display = "none";
  }
  else if (event.target == feedModal) {
    feedModal.style.display = "none";
  }
}

function CreateFeed() {
  var favoritesArr = [13, 5, 66, 74, 23, 64];
  var commentsArr = [25, 17, 127, 47, 59, 33];
  var imgArr = ["images/f_sampleimg1.jpg", "images/f_sampleimg2.jpg", "images/f_sampleimg3.jpg", "images/f_sampleimg4.jpg", "images/f_sampleimg5.jpg", "images/f_sampleimg6.jpg"];

  document.getElementById('cntFeeds').innerHTML=imgArr.length;

  for(var j = 0; j < imgArr.length / 3; j++) {
    var feedSection_id = "feedSection_" + j;

    var fdSec = document.createElement("div");
    fdSec.setAttribute("id", feedSection_id);
    fdSec.setAttribute("class", "feedSection");

    document.getElementById('feedParent').appendChild(fdSec);

    for(var i = 0; i < 3; i++) {
      var feed_id = "feed_" + ((j * 3) + i);
      var feed_id_hid = "feed_" + ((j * 3) + i) + "_hid"

      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", feed_id);
      newDiv.setAttribute("class", "feedDivid");
      newDiv.setAttribute("onmouseover", "HiddenPopupShow("+"'"+feed_id_hid+"'"+")");
      newDiv.setAttribute("onmouseout", "HiddenPopupOut("+"'"+feed_id_hid+"'"+")");

      var html ='<a href="#">';
      html += ' <div class="feedDivid feedDividA">';
      html += '   <div id='+'"'+feed_id_hid+'"'+' class="hiddenPopup" onClick="FDModalDialogOpen('+"'feedModalDialog', 'feedModalImage', '"+imgArr[((j * 3) + i)]+"'"+')">';
      html += '     <div class="internalDiv">';
      html += '       <a style="padding: 0px 28px 0px 0px; margin: 0;">';
      html += '         <img style="margin-bottom: -6px;" src="images/hid_favorite.png" alt="">';
      html += '         '+favoritesArr[((j * 3) + i)]+'<span href="#">개</span>';
      html += '       </a>';
      html += '        <a style="margin: 0; padding: 0;">';
      html += '         <img style="margin-bottom: -6px;" src="images/hid_comment.png" alt="">';
      html += '         '+commentsArr[((j * 3) + i)]+'<span href="#">개</span>';
      html += '       </a>';
      html += '     </div>';
      html += '   </div>';
      html += '   <div class="feedimgFrame">';
      if(imgArr[((j * 3) + i)] == undefined) {
        html += '     <img src="" class="feedImageCore" alt="" decoding="auto" sizes="256px">';
      }
      else {
        html += '     <img src='+'"'+imgArr[((j * 3) + i)]+'"'+' class="feedImageCore" alt="" decoding="auto" sizes="256px">';
      }
      html += '   </div>';
      html += '   <div class="feedimgFrame feedimgSupport"></div>';
      html += '   </div>';
      html += '</a>';

      newDiv.innerHTML = html;
      document.getElementById(feedSection_id).appendChild(newDiv);
    }
  }
}

var isFirstScroll = 0;

window.addEventListener('scroll', function() {
  if(window.scrollY >= 64) {
    var mTopTableP = document.getElementById('tTableP');
    mTopTableP.style.height="55px";
    document.getElementById('tTableC').style.height="55px";
    document.getElementById('mLogoFull').style.opacity="0";
    document.getElementById('mLogoShort').style.opacity="1";
    mTopTableP.classList.remove('TopTableShadowOut');
    mTopTableP.classList.add('TopTableShadowIn');
    isFirstScroll = 1;
  }
  else {
    var mTopTableP = document.getElementById('tTableP');
    mTopTableP.style.height="77px";
    document.getElementById('tTableC').style.height="77px";
    document.getElementById('mLogoFull').style.opacity="1";
    document.getElementById('mLogoShort').style.opacity="0";
    if(isFirstScroll != 0) {
      mTopTableP.classList.remove('TopTableShadowIn');
      mTopTableP.classList.add('TopTableShadowOut');
    }
  }
});
