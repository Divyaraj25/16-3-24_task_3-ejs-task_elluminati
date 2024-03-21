// updated code, foreach for the buttons is removed and target is used for getting id of each element

$(document).on("click", "#edit", function (e) {
  e.preventDefault();
  console.log("taking data...");
  const id = e.target.parentNode.parentNode.id;
  console.log(id);
  console.log(`Button with value ${id} was clicked`);
  let email = $(`div[id=${id}]`).find("#Email").text().trim();
  let username = $(`div[id=${id}]`).find("#Name").text().trim();
  let contact = $(`div[id=${id}]`).find("#Contact").text().trim();
  let profileImage = $(`div[id=${id}]`).find("#userProfileImage").attr("src");
  console.log(profileImage);
  let image = profileImage
    .slice(profileImage.search("-"), profileImage.length)
    .replaceAll("-", " ");
  console.log(image);
  $("#formdata").attr("id", "formdataforedit");
  if ($("#multibuttonforadd").attr("id") == "multibuttonforadd") {
    $("#multibuttonforadd").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").val("Edit");
  } else {
    $("#multibutton").attr("id", "multibuttonforedit");
    $("#multibuttonforedit").val("Edit");
  }
  $("#id").val(id);
  $("#username").val(username);
  $("#email").val(email);
  $("#contact").val(contact);
  $("#file").attr("required", false);
  $("#userdemoname")
    .css({
      display: "block",
      margin: "auto",
    })
    .text(`selected : ${image}`);
});

$(document).on("click", "#delete", function (e) {
  e.preventDefault();
  console.log("deleting...");
  const id = e.target.parentNode.parentNode.id;
  console.log(`Button with value ${id} was clicked`);
  $.ajax({
    url: "/deleteuser",
    method: "delete",
    data: {
      id: id,
    },
    success: function () {
      $(`div[id=${id}]`).remove();
      if ($("#appendData").children().length === 0) {
        $("#appendData").html(
          '<h1 class="table border p-5 text-center">No Data Found</h1>'
        );
      }
    },
  });
});
$(document).on("click", "#multibuttonforedit", function (e) {
  e.preventDefault();
  console.log("editing...");
  try {
    console.log("editing data...");
    $.ajax({
      url: "http://localhost:3000/edituser",
      type: "PATCH",
      data: new FormData($("#formdataforedit")[0]),
      processData: false,
      contentType: false,
      success: function (data) {
        const id = $("#id").attr("value");
        $(`div[id=${id}]`).find("#Name").text(data.username);
        $(`div[id=${id}]`).find("#Email").text(data.email);
        $(`div[id=${id}]`).find("#Contact").text(data.contact);
        $(`div[id=${id}]`).find("#userProfileImage").attr("src", data.path);
        $("#multibuttonforedit").attr("id", "multibutton");
        $("#formdataforedit").attr("id", "formdata");
      },
      error: function (xhr, status, error) {
        console.log(status);
        console.log(error);
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Add event listener to each button

$(document).on("click", "#adduserbtn", function (e) {
  e.preventDefault();
  $("#userdemoname").css({
    display: "none",
  });
  if ($("#formdataforedit").attr("id") == "formdataforedit") {
    $("#formdataforedit").attr({
      id: "formdata",
    });
    $("#formdata")[0].reset();
  }
  if ($("#multibuttonforedit").attr("id") == "multibuttonforedit") {
    $("#multibuttonforedit").attr({ value: "Register", id: "multibutton" });
  } else {
    $("#multibutton").attr("value", "Register");
  }
});
$(document).on("click", "#multibutton", function (e) {
  e.preventDefault();

  console.log("adding to database...");
  try {
    $.ajax({
      url: "http://localhost:3000/adduser",
      method: "POST",
      processData: false,
      contentType: false,
      // contentType:'multipart/form-data',
      data: new FormData(document.getElementById("formdata")),
      success: function (data) {
        let appendedData = `
              <div class="row mx-5 table border w-100" id="${data.user._id}">
                          <div class="col-2" id="profileImage"><img src="${data.user.path}" id="userProfileImage" alt="Profile Image" /></div>
                          <div class="col-6" id="details">
                              <div class="row">
                                  <div class="col-4 mt-4">
                                      <h4 id="namelabel">Name : </h4>
                                      <h4 id="emaillabel">Email : </h4>
                                      <h4 id="contactlabel">Contact no : </h4>
                                  </div>
                                  <div class="col-8 mt-4">
                                      <h4 id="Name">${data.user.username}</h4>
                                      <h4 id="Email">${data.user.email}</h4>
                                 <h4 id="Contact">${data.user.contact}</h4>
      
                                  </div>
                              </div>
                          </div>
                          <div class="d-none">${data.filename}</div>
                          <div class="col-3 d-flex flex-column justify-content-center" id="buttons">

                                <button class="btn btn-danger m-3 w-100 fs-4" id="delete">Delete</button>
                                <button class="btn btn-primary m-3 w-100 fs-4" type="button" data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                                    id="edit">Edit</button>
                          </div>
                      </div>
              `;
        if ($("#appendData").find("h1").text() === "No Data Found") {
          $("#appendData").html("");
        }
        $("#id").val(data.user._id);
        $("#appendData").append(appendedData);
        $("#formdata")[0].reset();
      },
      error: function (xhr) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      },
    });
  } catch (error) {}
});

$(document).on("click", "#searchbtn", function (e) {
  e.preventDefault();

});
