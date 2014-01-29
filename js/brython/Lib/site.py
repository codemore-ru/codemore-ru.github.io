import sys
import external_import
sys.path_hooks.insert(0,external_import.ModuleFinder)
