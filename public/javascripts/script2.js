var currentUser = "sky0501";

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

var commentIndexId = new Array();
var mfeedIndex = 0;
var mlistid = 0;

function ModalDialogAction(arg) {
  if (arg == 0) {
  }
  /*.............................*/
  else if (arg == 3) {
    var parent = document.getElementById("commentAppended_"+mfeedIndex);
    var list = document.getElementById("commentList_"+mfeedIndex+"_"+mlistid);
    parent.removeChild(list);
    commentIndexId[mfeedIndex]--;
    ModalDialogClose('modalDelComment');
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

function ModalDialogOut(mElement) {
  document.getElementById(mElement).style.backgroundColor="#fff";
}

window.onclick = function(event) {
  var modalDialog = document.getElementById('modaldialog');
  var modalDialog2 = document.getElementById('modalDelComment');
  if (event.target == modalDialog) {
    modalDialog.style.display = "none";
  }
  else if(event.target == modalDialog2) {
    modalDialog2.style.display = "none";
  }
}

function addComment(message, commentWriter, feedIndex, arg) { //arg=0 is adding comment, arg=1 is leaving timeline message.
  //alert("you pressed 'enter'" + message);
  if (message=="") {
    return;
  }
  var comnt = document.createElement("li");
  comnt.setAttribute("id", "commentList_"+feedIndex+"_"+commentIndexId[feedIndex]);
  comnt.setAttribute("class", "fdCmtItem");

  var contents = '';

  if (commentWriter == currentUser && arg == 0) {
    //contents += '<button id="delCommentBtn_'+feedIndex+'_'+commentIndexId[feedIndex]+'" class="deleteCommentBtn" onClick="deleteComment('+commentIndexId[feedIndex]+', '+feedIndex+')"></button>';
    contents += '<button id="delCommentBtn_'+feedIndex+'_'+commentIndexId[feedIndex]+'" class="fdDelCmt" title="댓글 삭제" onClick="deleteComment('+commentIndexId[feedIndex]+', '+feedIndex+')"></button>'
  }

  contents += '<a href="#" class="fdCmtItemTitle" title="'+commentWriter+'">'+commentWriter+'</a>';

  //processing of comment
  var msgArray = message.split(' ');
  var linkedContent = '';

  for(var i in msgArray) {
    i = msgArray[i];
    if(i.indexOf('#') == 0) {
      contents += '<a style="cursor: pointer; color: #003569; text-decoration: none; margin: 0; padding: 0;">'+i+' </a>'
    }
    else if(i.indexOf('@') == 0) {
      contents += '<a style="cursor: pointer; color: #003569; text-decoration: none; margin: 0; padding: 0;">'+i+' </a>'
    }
    else
      contents += i+' ';
  }
  /////////////////////////


  comnt.innerHTML = contents;
  document.getElementById('commentAppended_'+feedIndex).appendChild(comnt);
  commentIndexId[feedIndex]++;
}

function onKeyDown(message, commentWriter, feedIndex, arg) {
  if(event.ctrlKey && event.keyCode == 13) {
    document.getElementById('comments_'+feedIndex).value += "\n";
  }
  else if (event.keyCode == 13) {
    addComment(message, commentWriter, feedIndex, arg);
    setTimeout("eraseCommentArea("+feedIndex+")", 1);
  }
}

function eraseCommentArea(feedIndex) {
    document.getElementById('comments_'+feedIndex).value="";
}

function deleteComment(listid, feedIndex) {
  ModalDialogOpen('modalDelComment');
  mfeedIndex = feedIndex;
  mlistid = listid;
}

var favorites = [13, 5, 66, 74, 23, 64];

function ActionFavorite(index) {
  if(document.getElementById('btnFavorite_'+index).checked) {
    favorites[index]++;
    document.getElementById('favCnt_'+index).innerHTML = favorites[index];
  }
  else {
    favorites[index]--;
    document.getElementById('favCnt_'+index).innerHTML = favorites[index];
  }
}

function feedPopUp(feedid) {
  var mFeed = document.getElementById(feedid);
  mFeed.style="";
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

function CreateFeed() {
  var feedWrerName = ["sky0501", "sky0501", "sky0501", "sky0501", "sky0501", "?undefined"];
  var feedImageParentDir = "images";
  var feedImageFile = ["f_sampleimg1.jpg", "f_sampleimg2.jpg", "f_sampleimg3.jpg", "f_sampleimg4.jpg", "f_sampleimg5.jpg", "f_sampleimg6.jpg"];
  var feedTimelineLeave = ["I'm on the sky. :) #travel #aeroplane", "#bb @star_4423", "The Airbus A320's cockpit!", "The #flowers #wonderland.", "Cherry blossom! #awesome!", "Purple Lamborghini Huracan Performante! Thanks for @lamborghini"];
  var feedUploadedTime = [2, 7, 13, 19, 27];
  var commentWriter = "sky0501";

  var cmtWriterList = ["홍길동", "최세인", "Apple", "익명사용자", "Microsoft"];
  var cmtList = ["안녕하세요~~~", "오픈했습니다!", "Hello everyone...what a nice picture! @sky0501", "안녕하세요. 제 유튜브 채널,,,좋아요와 구독버튼 하나씩만 부탁드리겠습니다! #유튜브", "Great! bb"];

  for(var i = 0; i < feedImageFile.length; i++) {
    commentIndexId[i] = 0;

    var feedDiv = document.createElement("div");
    feedDiv.setAttribute("style", "flex-direction: column; padding-bottom: 0px; padding-top: 0px; margin-bottom: 64px;")

    var html = '<article id="feedArticle_'+i+'" class="feedArticle" style="animation: unset;" onmouseover="feedPopUp(this.id)">';
        html += '    <header class="articleHeader">';
        html += '      <div class="headerProfile">';
        html += '        <canvas class="profBorder" width="40" height="40" style="transform: translate(-5px, -5px); position: absolute; top: 0px; left: 0px; width: 40px; height: 40px"></canvas>';
        html += '        <a class="borderImg" href="" style="width: 30px; height: 30px;"></a>';
        html += '      </div>';
        html += '      <div class="headerProfileName">';
        html += '        <div class="">';
        html += '          <div class="nameLabelChild">';
        html += '            <a class="labelCore" href="">'+feedWrerName[i]+'</a>';
        html += '          </div>';
        html += '        </div>';
        html += '      </div>';
        html += '    </header>';
        html += '    <div class="articleImgParent">';
        html += '      <div class="sampleImg" style="background-image: url('+"'"+feedImageParentDir+'/'+feedImageFile[i]+"'"+');">';
        html += '      </div>';
        html += '    </div>';
        html += '    <div class="interactionParent">';
        html += '      <section class="funcBtn">';
        html += '        <input id="btnFavorite_'+i+'" class="funcBtnCore" onClick="ActionFavorite('+i+')" type="checkbox"><label for="btnFavorite_'+i+'"></label>';
        html += '        <a class="funcBtnCore" href="" style="background-image: url('+"'images/f_funcBtn_comment.png'"+');"></a>';
        html += '        <a class="funcBtnCore" href="" style="background-image: url('+"'images/f_funcBtn_save.png'"+'); margin-left: auto; margin-right: -16px;"></a>';
        html += '      </section>';
        html += '      <div style="padding: 0; margin: 0;"><h2 style="font-size: 16px; font-weight: 600; padding-bottom: 16px; margin: 0;">좋아요 <span id="favCnt_'+i+'">'+favorites[i]+'</span>개</h2></div>'
        html += '      <div class="divComments">';
        html += '        <ul id="commentAppended_'+i+'" class="fdCmtList">';
        html += '        </ul>';
        html += '      </div>';
        html += '      <div style="margin-bottom: 4px;">';
        html += '        <span style="font-size: 10px; font-family: Arial; color: #999;">'+feedUploadedTime[i]+'일 전</span>';
        html += '      </div>';
        html += '      <section class="addComment">';
        html += '        <form class="addCommentArea">';
        html += '          <textarea id="comments_'+i+'" aria-label="댓글 달기..." placeholder="댓글 달기..." class="addCommentCore" autocomplete="off" autocorrect="off" onKeyDown="onKeyDown('+"document.getElementById('comments_"+i+"', 0).value"+', '+"'"+commentWriter+"'"+', '+i+', 0);"></textarea>';
        html += '        </form>';
        html += '      </section>';
        html += '      <div class="modalPopupParent">';
        html += '        <button class="modalPopupBtn" type="button" onClick="ModalDialogOpen('+"'modaldialog'"+')"></button>';
        html += '      </div>';
        html += '    </div>';
        html += '</article>';

    feedDiv.innerHTML = html;
    document.getElementById('appendedClass').appendChild(feedDiv);

    addComment(feedTimelineLeave[i], commentWriter, i, 1);
    addComment("이제 댓글을 남기고 삭제할 수 있습니다!", commentWriter, i, 0);
  }
  addComment("다른 사용자를 @언급 하거나 #해시태그 를 남겨보세요.", commentWriter, 1, 0);
  for(var cmt = 0; cmt < cmtWriterList.length; cmt++) {
    addComment(cmtList[cmt], cmtWriterList[cmt], 0, 0);
  }
}
