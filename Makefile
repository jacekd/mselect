COMPRESSOR = ~/Packages/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar

jquery.multiselect.min.js : jquery.multiselect.js
	java -jar $(COMPRESSOR) --type js $^ -o tmpfile
	egrep '^[\/ ]\*' $^ > $@
	cat tmpfile >> $@
	rm -f tmpfile
