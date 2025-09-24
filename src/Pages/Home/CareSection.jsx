import { Link } from "react-router";

const CareSection = () => {
    return (
        <section
            className="relative bg-fixed bg-center bg-cover py-20 lg:py-40"
            style={{
                backgroundImage:
                    "url('https://demos.codezeel.com/prestashop/PRS22/PRS220545/default/modules/cz_themeimages/views/img/parallax_img.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/5"></div>

            <div className="relative container mx-auto px-6 grid md:grid-cols-2 items-center">
                {/* Left Column */}
                <div className="text-secondary space-y-5">
                    <h4 className="text-lg font-semibold tracking-widest">
                        HIGHER LEVEL OF CARE
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Genuine Commitment <br /> To Your Health
                    </h2>
                    <p className="max-w-md text-secondary">
                        We provide the best medical products to ensure your health and
                        well-being. Our commitment is genuine, and our care is unmatched.
                    </p>
                    <Link to='/shop'>
                        <button className="bg-primary hover:bg-secondary font-bold cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </Link>
                </div>

                {/* Right Column (empty for spacing / design) */}
                <div></div>
            </div>
        </section>
    );
};

export default CareSection;
