version:=$(shell cat manifest.template.json | jq -r '.version' | sed 's/ /_/g')
name:=$(shell cat manifest.template.json | jq -r '.name' | sed 's/ /_/g')
files:=background.js icon16.png icon48.png icon96.png icon128.png README.md popup.html

all: $(name)-$(version)-firefox.zip $(name)-$(version)-chrome.zip

$(name)-$(version)-firefox.zip: $(files) manifest.template.json
	cat manifest.template.json | jq '. + .__firefox | del(.__chrome, .__firefox)' > manifest.json
	zip $@ $(files) manifest.json
	rm manifest.json

$(name)-$(version)-chrome.zip: $(files) manifest.template.json
	cat manifest.template.json | jq '. + .__chrome | del(.__chrome, .__firefox)' > manifest.json
	zip $@ $(files) manifest.json
	rm manifest.json

.PHONY: clean

clean:
	rm -f *.zip
