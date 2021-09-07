const testButtonFunction=()=>{
  alert('Thank you for clicking')
}
const uploadCode=(submission)=>{
  $.ajax({
    url: '/api/uploadings',
    contentType: 'application/json',
    data: JSON.stringify(submission),
    type: 'POST',
    success: function(result){
      alert('Code successfully uploaded')
    }
  })
}

const newUploading=()=>{
  let title = $('#title_of_project').val();
  let author = $('#author').val();
  let language = $('#language').val();
  let url = $('#repository').val();
  let submission = {title,author,language,url};
  console.log(submission);
  uploadCode(submission);
}

const requestUploading=()=>{
  $.get('/api/uploadings',(uploadings)=>{
    // if(uploadings.length>0){
      // let codes = uploadings.data;
      if(uploadings.length> 0){
        console.log(uploadings);
      listSubmissions(uploadings);
      }
  })
}

listSubmissions=(submissions)=>{
  submissions.forEach(submission =>{
    console.log(submission)
    let item='<div class="card blue-grey darken-1 col s6">'+
    '<h2 class="center">Successful validation</h2>'+
    // '<div class="card blue-grey darken-1">'+
        '<div class="card-content white-text">'+
            '<span class="card-title">'+submission.title+'</span>'+
            '<p>Author: '+submission.author+'</p>'+
            '<p>Language: '+submission.language+'</p>'+
            '<a href="'+submission.url+'">repository</a>'+
        '</div>'+
        '<div class="card-action">'+
            '<a class="btn waves-effect white grey-text darken-text-2">details</a>'+
        '</div>'+
    '</div>'+
    '<div id="listSubmissions"></div>'
    $('#listSubmissions').append(item)
  })
}
// connect to the socket

let socket = io();


socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
    $("#socketTitle").html("LND Security" + msg);
})

console.log('test')
$(document).ready(function(){
  requestUploading();
  console.log('Ready');
  // listSubmissions(submissions);
  $('select').formSelect();
  $('.modal').modal();
  // $('.carousel.carousel-slider').carousel({
  //   fullWidth: true,
  //   indicators: true
  // });
  // newUploading();

})
