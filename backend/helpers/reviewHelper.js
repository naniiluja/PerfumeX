import User from "../models/userModel.js";
import { DontSayTheseWords } from '../configs/config.js';



export const isValidReview = (comment) => {
    var cmt = new String(comment).toLowerCase();
    for (var word of DontSayTheseWords) {
        if (cmt.indexOf(word) != -1) return false;
    }
    return true;
}

export const autoBanUserAsync = async (uId) => {
    try {
        const user = await User.findById(uId);
        if (user.warningCount < 3) {
            user.warningCount = user.warningCount + 1;
        } else {
            user.isLocked = true;
            await user.save();
        }
        await user.save();
        return user.isLocked;
    } catch (err) {
		console.log(err);
		return false;
	}
}