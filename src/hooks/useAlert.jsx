// src/hooks/useAlert.jsx
import Swal from "sweetalert2";

const useAlert = () => {
    const showAlert = ({
        title = "Success!",
        text = "Operation completed successfully.",
        icon = "success",
        timer = 1500,
    }) => {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonText: "OK",
            background: "#f2f6f7",
            color: "#071c1f",
            confirmButtonColor: "#0a9a73",
            timer,
        });
    };

    return showAlert;
};

export default useAlert;
