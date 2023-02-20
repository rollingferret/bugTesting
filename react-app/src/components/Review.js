import React from 'react';
import { useSelector } from 'react-redux';
import EditReviewModal from './modals/EditReviewModal'
import DeleteReviewModal from './modals/DeleteReviewModal'
import './Review.css'

function Review({ ele }) {
  let curUser = useSelector(state => state.session.user)

  return (
    <div className='outer-style-div'>
      <ul className='review'>
          {/* <h2>This is a review!:</h2> */}
          <div className='review-li'>
            <li>
              <strong>Username:</strong> {ele.username}
            </li>
            <li>
              <strong>Rating:</strong> {ele.rating}
            </li>
            <li>
              <strong>Review:</strong> {ele.body}
            </li>
          </div>
          <div className='button-container'>
            {
              ele.userId === curUser.id &&
              <>
                <EditReviewModal reviewId={ele.id} rating={ele.rating} body={ele.body} />
                <DeleteReviewModal id={ele.id} developerId={ele.developerId} />
              </>
            }
          </div>
      </ul>
    </div>
  );
}
export default Review;
