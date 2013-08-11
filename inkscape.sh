#! bin/bash

path="/Users/wit/Workspace/ChromeExtension/TextFirst"

/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon.svg --export-png=$path/textfirst/icon-16x16.png -w16 -h16
/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon.svg --export-png=$path/textfirst/icon-19x19.png -w19 -h19
/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon.svg --export-png=$path/textfirst/icon-48x48.png -w48 -h48
/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon.svg --export-png=$path/textfirst/icon-64x64.png -w64 -h64
/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon.svg --export-png=$path/textfirst/icon-128x128.png -w128 -h128

/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/icon-on.svg --export-png=$path/textfirst/icon-on-19x19.png -w19 -h19

/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/bg.svg --export-png=$path/textfirst/bg.png -w16 -h16
/Applications/Inkscape.app/Contents/Resources/bin/inkscape $path/bg-loading.svg --export-png=$path/textfirst/bg-loading.png -w16 -h16
