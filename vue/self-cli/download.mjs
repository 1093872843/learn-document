import download from "download-git-repo";

download(
  "https://github.com:gaojizu/vue3-ts-ep#master",
  "resp/a",
  { clone: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("完成？");
    }
  }
);
