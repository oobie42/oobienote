# https://cloud.google.com/storage/docs/hosting-static-website
# TODO: how to push to a staging bucket/directory?
for file in out/play_note.js out/note.js out/chord.js out/tuning.js play_note.html
do
  echo ==== pushing $file ...
  gsutil cp $file gs://www.oobie.pw
done
