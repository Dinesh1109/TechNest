import Instructor from "../../../assets/Images/Instructor.png";
import HighLighttext from "./HighLighttext";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

function InstructorSection() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <diV className="lg:w-[50%]">
          <img
            src={Instructor}
            alt={"Instructor"}
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </diV>
        <div className="w-[50%] flex flex-col gap-10">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighLighttext text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[90%] text-richblack-300">
            Instructors from around the world teach millions of students on
            TechNest. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CTAButton active={true} linkto="/signup">
              <div className="flex flex-row gap-2  items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
