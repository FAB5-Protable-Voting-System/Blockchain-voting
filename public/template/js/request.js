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
                } else showAlert("danger", data.msg);
            } else {
                showAlert("danger", data.msg);
            }
        }
    );
};
const GetCandidate = (successCB) => {
    $.get("/pp/candidate", function (data, status) {
        if (status === "success") {
            successCB(data.data);
        } else {
            showAlert("danger", data.msg);
        }
    });
};
const GetLiveCount = (successCB) => {
    $.get("/bc/live_count", function (data, status) {
        if (status === "success") {
            successCB(data.data);
        } else {
            showAlert("danger", data.msg);
        }
    });
};
const GetUserName = (_id, count, cb) => {
    $.get("/user/username", { _id }, function (data, status) {
        if (status === "success") {
            cb(count, data.data.fname + " " + data.data.lname);
        } else {
            showAlert("danger", data.msg);
            return null;
        }
    });
};

const RegisterUser = (data) => {
    $.post("/user/register", data, function (data, status) {
        if (status === "success") {
            if (data.success === true) {
                window.location.replace("/Home");
                showAlert("success", data.msg);
            } else {
                showAlert("danger", data.msg);
            }
        } else {
        }
    });
};
const RegisterParty = (data) => {
    $.post("/pp/registerParty", data, function (data, status) {
        if (status === "success") {
            if (data.success === true) {
                window.location.replace("/Home");
                showAlert("success", data.msg);
            } else {
                showAlert("danger", data.msg);
            }
        } else {
        }
    });
};
const RegisterCandidate = (data) => {
    $.post("/pp/registerCandidate", data, function (data, status) {
        if (status === "success") {
            if (data.success === true) {
                window.location.replace("/Home");
                showAlert("success", data.msg);
            } else {
                showAlert("danger", data.msg);
            }
        } else {
        }
    });
};
const GetPartyName = () => {
    $.get("/pp/party", (data) => {
        data.data.forEach((item, index) => {
            var tbl = document.getElementById("vote_table");
            var tr = document.createElement("tr");
            tr.className = "table__row";
            var srno = document.createElement("th");
            var name = document.createElement("td");
            var party = document.createElement("td");
            var votebtn = document.createElement("td");
            srno.innerHTML = index + 1;
            name.innerHTML = item.chairman;
            party.innerHTML = item.name;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-primary btn-sm vote-btn";
            btn.setAttribute("style", "width: 150px;");
            btn.onclick = () => {
                Vote(item._id);
            };
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
};

const Vote = (candidateId) => {
    console.log("Candidate:", candidateId);
    $.post(
        "/bc/vote",
        {
            candidateId,
        },
        function (data, status) {
            if (status === "success") {
                console.log(data);
                if (data.success === true) {
                    window.location.replace("/Home");
                    showAlert("success", data.msg);
                } else showAlert("danger", data.msg);
            } else {
                showAlert("danger", data.msg);
            }
        }
    );
};
