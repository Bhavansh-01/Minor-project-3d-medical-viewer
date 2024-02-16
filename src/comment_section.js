import React,{useState,useEffect,useRef} from 'react';
import { Canvas,useFrame } from "@react-three/fiber";
import { Html, PresentationControls } from "@react-three/drei";
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { useAuth0 } from '@auth0/auth0-react';

export default function Comment() {
const {user,isAuthenticated}=useAuth0();
return(
  isAuthenticated && (
<div id="respond">

<h3 id="form_head">Leave a Comment</h3>

<form action="post_comment.php" method="post" id="commentform">

  <label for="comment_author" class="required">Your name</label>
  <input type="text" name="comment_author" id="comment_author" value="" tabindex="1" required="required"/>

  <label for="email" class="required">Your email;</label>
  <input type="email" name="email" id="email" value="" tabindex="2" required="required"/>

  <label for="comment" class="required">Your message</label>
  <textarea name="comment" id="comment" rows="10" tabindex="4"  required="required"></textarea>

 
  <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
  <input name="submit" type="submit" value="Submit comment" />

</form>

</div>
  )
);
}
