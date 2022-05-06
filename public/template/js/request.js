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
