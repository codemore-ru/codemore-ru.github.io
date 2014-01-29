"""(Extremely) low-level import machinery bits as used by importlib and imp."""


class __loader__(object):pass

def _fix_co_filename(*args,**kw):
    pass

def acquire_lock(*args,**kw):
    """acquire_lock() -> None    Acquires the interpreter's import lock for the current thread.
    This lock should be used by import hooks to ensure thread-safety
    when importing modules.
    On platforms without threads, this function does nothing."""
    pass

def extension_suffixes(*args,**kw):
    """extension_suffixes() -> list of strings    Returns the list of file suffixes used to identify extension modules."""
    return ['.pyd']

def get_frozen_object(*args,**kw):
    pass

def init_builtin(module,*args,**kw):
    return __import__(module)

def init_frozen(*args,**kw):
    pass

def is_builtin(*args,**kw):
    pass

def is_frozen(*args,**kw):
    pass

def is_frozen_package(*args,**kw):
    pass

def load_dynamic(*args,**kw):
    pass

def lock_held(*args,**kw):
    """lock_held() -> boolean    Return True if the import lock is currently held, else False.
    On platforms without threads, return False."""
    pass

def release_lock(*args,**kw):
    """release_lock() -> None    Release the interpreter's import lock.
    On platforms without threads, this function does nothing."""
    pass
