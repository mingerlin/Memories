import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useHistory } from "react-router-dom";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.name === post?.name ||
          user?.result?.name === post?.name) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterbuttom="true">
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterbuttom="true"
          >
            {post.message.length > 100
              ? `${post.message.substr(0, 99)}...`
              : post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          className={classes.iconColor}
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.name === post?.name ||
          user?.result?.name === post?.name) && (
          <Button
            size="small"
            className={classes.iconColor}
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
