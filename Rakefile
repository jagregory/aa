# Grunt website is down... great...
# In the meantime, a Rakefile will do the job just fine!

require 'fileutils'

task :default => :run

task :run => :build do
  sh 'node server.js'
end

task :clean do
  FileUtils.rm_rf 'builtAssets'
  FileUtils.mkdir_p 'builtAssets/device'
end

task :build => ['clean', 'build:static', 'build:css', 'build:js'] do
end

namespace :build do

  task :static do
    sh 'cp -r files/ builtAssets/'
    sh 'cp assets/device/index.html builtAssets/device/'
  end

  task :js do
    sh './node_modules/browserify/bin/cmd.js --debug assets/device/js/device.js > builtAssets/device/device.js'
  end

  task :css do
    sh './node_modules/stylus/bin/stylus -u nib --line-numbers assets/device/css/device.styl --out builtAssets/device/'
  end

end
