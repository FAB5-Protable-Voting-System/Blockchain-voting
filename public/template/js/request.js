const Login = (aadharId, voterId, otp) => {
    $.post(
        "/user/login",
        {
            aadharId,
            voterId,
            otp,
        },
        function (data, status) {
            if (status === "success") {
                if (data.success === true) {
                    localStorage.setItem("fname", data.data.fname);
                    localStorage.setItem("lname", data.data.lname);
                    window.location.replace("/Vote");
                } else {
                    showAlert("danger", "Invalid OTP");
                }
            } else {
            }
        }
    );
};
const OTP = (aadharId, voterId) => {
    $.post(
        "/user/otp",
        {
            aadharId,
            voterId,
        },
        function (data, status) {
            if (status === "success") {
                console.log(data.data);
                if (data.success === true) {
                    showAlert("success", "Enter OTP: " + data.data.otp);
                } else showAlert("danger", data.data.msg);
            } else {
                showAlert("danger", data.data.msg);
            }
        }
    );
};
const GetCandidate = (successCB) => {
    $.get("/pp/candidate", function (data, status) {
        if (status === "success") {
            successCB(data.data);
        } else {
            showAlert("danger", data.data.msg);
        }
    });
};
const GetLiveCount = (successCB) => {
    $.get("/bc/live_count", function (data, status) {
        if (status === "success") {
            successCB(data.data);
        } else {
            showAlert("danger", data.data.msg);
        }
    });
};
const GetUserName = (_id, count, cb) => {
    $.get("/user/username", { _id }, function (data, status) {
        if (status === "success") {
            cb(count, data.data.fname + " " + data.data.lname);
        } else {
            showAlert("danger", data.data.msg);
            return null;
        }
    });
};
const GetPartyName = () => {
    $.get("http://localhost:8501/pp/party", (data) => {
                data.data.forEach((item, index) => {
                    var tbl = document.getElementById("vote_table");
                    var tr = document.createElement("tr");
                    tr.className = "table__row";
                    var srno = document.createElement("th");
                    var name = document.createElement("td");
                    var party = document.createElement("td");
                    var votebtn = document.createElement("td");
                    srno.className = "row__cell";
                    name.className = "row__cell";
                    party.className = "row__cell";
                    votebtn.className = "row__cell";
                    srno.innerHTML = index + 1;
                    name.innerHTML = item.chairman;
                    party.innerHTML = item.name;
                    var btn = document.createElement("button");
                    btn.type = "button";
                    btn.className = "btn btn-primary btn-sm vote-btn";
                    btn.setAttribute("style", "width: 150px;");
                    // btn.id = "id";
                    btn.innerHTML = "VOTE";
                    votebtn.appendChild(btn);
                    tr.appendChild(srno);
                    tr.appendChild(name);
                    tr.appendChild(party);
                    tr.appendChild(votebtn);
                    tbl.appendChild(tr);
                });
            });
}