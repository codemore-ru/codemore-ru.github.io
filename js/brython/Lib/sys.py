# hack to return special attributes
from _sys import *

from browser import doc
__stdout__=getattr(doc,"$stdout")
__stderr__=getattr(doc,"$stderr")

stdout = getattr(doc,"$stdout")
stderr = getattr(doc,"$stderr")


has_local_storage=__BRYTHON__.has_local_storage
has_json=__BRYTHON__.has_json

argv = ['__main__']

base_exec_prefix = __BRYTHON__.brython_path

base_prefix = __BRYTHON__.brython_path

builtin_module_names=__BRYTHON__.builtin_module_names

byteorder='little'

def exc_info():
    exc = __BRYTHON__.exception_stack[-1]
    return (exc.__class__,exc,None)
    
exec_prefix = __BRYTHON__.brython_path

executable = __BRYTHON__.brython_path+'/brython.js'

def exit(i=None):
    raise SystemExit('')

class flag_class:
  def __init__(self):
      self.debug=0
      self.inspect=0
      self.interactive=0
      self.optimize=0
      self.dont_write_bytecode=0
      self.no_user_site=0
      self.no_site=0
      self.ignore_environment=0
      self.verbose=0
      self.bytes_warning=0
      self.quiet=0
      self.hash_randomization=1

flags=flag_class()

def getfilesystemencoding(*args,**kw):
    """getfilesystemencoding() -> string    
    Return the encoding used to convert Unicode filenames in
    operating system filenames."""
    return 'utf-8'
    
maxsize=9007199254740992   #largest integer..

maxint=9007199254740992   #largest integer..

maxunicode=1114111

path = __BRYTHON__.path

path_hooks = list(JSObject(__BRYTHON__.path_hooks))

platform="brython"

prefix = __BRYTHON__.brython_path

version = '.'.join(str(x) for x in __BRYTHON__.version_info)


class __version_info(object):
    def __init__(self, version_info):
        self.version_info = version_info
        self.major = version_info[0]
        self.minor = version_info[1]
        self.micro = version_info[2]
        self.releaselevel = version_info[3]
        self.serial = version_info[4]

    def __getitem__(self, index):
        return self.version_info[index]

    def __str__(self):
        return str(self.version_info)
     
version_info=__version_info(__BRYTHON__.version_info)

warnoptions=[]

