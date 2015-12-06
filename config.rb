require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "dis/css"
sass_dir = "sass"
images_dir = "images"

# Require any additional compass plugins installed on your system.
require 'compass-normalize'
require 'rgbapng'
require 'toolkit'
require 'breakpoint'
require 'susy'
require 'sass-globbing'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = :nested

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

# Output source maps in development mode.
sass_options =  {:sourcemap => true}

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# Encoding
Encoding.default_external = "UTF-8"
