import {req} from "../actions/authentificationAction"

export function fetchReviewsPerReviewer(reviewerId){
    return {
        type:"PERSONAL_REVIEWS",
        payload:req(`/reviewers/${reviewerId}/reviews`)
    
    }
}

export function fetchReviewsPerArticle(articleId){
    return {
        type:"ARTICLE_REVIEWS",
        payload:req(`/articles/${articleId}/reviews`)
    
    }

}

export function updateReview(reviewId,payload){
    return {
        type:"UPDATE_REVIEW",
        payload:req(`/reviews/${reviewId}`,{
            method:"PUT",
            body:JSON.stringify(payload)
        })
    }
}