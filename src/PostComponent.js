import React from 'react'
import './PostComponent.css'
import Avatar from '@material-ui/core/Avatar'

function PostComponent({username, imageUrl, comment}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    src={imageUrl}
                    alt="Alexi"
                />
                <h4>{username}</h4>
            </div>
            {/* <div className="post__caption"> */}
            <img 
                className="post__image"
                src={imageUrl}
                alt=""/>
                <h4 className="post__comment"><strong>{username} </strong>{comment}</h4>
            {/* </div> */}
        </div>
    )
}

export default PostComponent
