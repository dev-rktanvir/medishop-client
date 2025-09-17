import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";


const Navbar = () => {
    return (
        <>
            <div className="hidden md:block">
                <DesktopNavbar />
            </div>
            <div className="block md:hidden">
                <MobileNavbar />
            </div>
        </>
    );
};

export default Navbar;
