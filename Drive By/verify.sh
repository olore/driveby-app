#!/bin/sh

echo "start"

if [ ! -d "$PROJECT_DIR/www" ] ; then
	cp -R /Users/Shared/Cordova/Frameworks/Cordova.framework/www "$PROJECT_DIR"
fi
# detect www folder reference in project, if missing, print warning
grep "{isa = PBXFileReference; lastKnownFileType = folder; path = www; sourceTree = \"<group>\"; };" "$PROJECT_DIR/$PROJECT_NAME.xcodeproj/project.pbxproj"
rc=$? 
if [ $rc != 0 ] ; then
echo -e "warning: Missing - Add $PROJECT_DIR/www as a folder reference in your project. Just drag and drop the folder into your project, into the Project Navigator of Xcode 4. Make sure you select the second radio-button: 'Create folder references for any added folders' (which will create a blue folder)" 1>&2
fi
echo "hi"
rm -rf "$PROJECT_DIR/www/*"
cp /Users/brian/dev/ruby/driveby.olore.net/public/app/index.html "$PROJECT_DIR/www"

cp -r /Users/brian/dev/ruby/driveby.olore.net/public/app "$PROJECT_DIR/www"