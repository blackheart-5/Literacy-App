// const INITIAL_INTERVAL = 1;
// const EASY_BONUS = 1.3;
// const HARD_PENALTY = 0.5;


// export function calculateNextReviwe(difficulty, previousInterval = INITIAL_INTERVAL){
//     let multiplier;
//     switch (difficulty){
//         case'easy':
//             multiplier = EASY_BONUS;
//             break;
//         case'medium':
//             multiplier = 1;
//             break;
//         case'hard':
//             multiplier = HARD_PENALTY;
//             break;
//         default:
//             multiplier = 1;
//     }

//     return Math.round(previousInterval * multiplier);
// }

// export function shouldReviewToday(lastReviewDate, interval){
//     const today = new Date();
//     const lastReview = new Date(lastReviewDate);
//     const daySinceLastReview = Math.florr(today - lastReview)/(1000*60*60*24);
//     return daySinceLastReview >= interval;
// }


const calculateNextReviewDate = (correct, timesReviewed) => {
    const baseInterval = 1; // 1 day
    const intervalMultiplier = correct ? 2 : 0.5;
    const newInterval = baseInterval * Math.pow(2, timesReviewed) * intervalMultiplier;
    
    const now = new Date();
    const nextReviewDate = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);
    
    return nextReviewDate;
  };
  
  export { calculateNextReviewDate };