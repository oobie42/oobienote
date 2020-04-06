# https://cloud.google.com/storage/docs/hosting-static-website
for file in play_note.js note.js chord.js tuning.js play_note.html
do
  echo ==== pushing $file ...
  gsutil cp $file gs://www.oobie.pw
done
