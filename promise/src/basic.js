/**
 * Created by yuqian on 2018/11/24.
 */
import { get } from './utils';

get('./mock/story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.error("Failed!", error);
})