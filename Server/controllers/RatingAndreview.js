const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    //get userid
    const userId = req.user.id;

    //fetch data from req body
    const { rating, review, courseId } = req.body;

    //check if user is enrollled or not
    const courseDetails = await Course.findOne(
      { _id: courseId },
      {
        studentsEnrolled: {
          $elemMatch: { $eq: userId },
        },
      }
    );

    if (!courseDetails) {
      res.ststud(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    //check if user already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Already reviewed by user",
      });
    }

    //create rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    //update course with the rating/ review
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    console.log(updatedCourseDetails);

    //return res
    return res.status(200).json({
      success: true,
      message: "Rating and Review created successfully ",
    });
  } catch (err) {}
};

//getAverageRating
exports.getAverageRating = async (req, res) => {
  try {
    // get courseId
    const courseId = req.body.courseId;

    //get average rating
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Schema.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    //return rating
    if (result.rating > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averagerating,
      });
    }

    //if no rating review exist
    return res.status(200).json({
      success: true,
      message: "Averate rating is 0 no one rated this course yet.",
      averageRating: 0,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

//get all ratingAndReviews
exports.getAllratings = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName ",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
    });
  } catch (err) {}
};
