

rm *.cert *.key;

cat save.txt | openssl req -nodes -new -x509 -keyout server.key -out server.cert;

