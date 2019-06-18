+++
title = "Data model"
tags = []
categories = []
weight = 2
summary = """
This chapter contains describes data model for managed infrastructure 
"""
+++


In our approach to ICT automation, the main focus is on representing every piece of significant information about the 
managed infrastructure in the form of **versioned** **file tree**. 

All of necessary facts about managed hosts, users, services, etc., as well as definitions of all administrative tasks, 
are represented by files in a single [git](https://git-scm.com) repository for change tracking. When used, the 
data from files is then transformed into an generalized object tree, which can be traversed and searched with the use 
of our own specialized data query language [Opath](/docs/opath).

For illustration purposes lets analyse files:

{{<code opts="linenos=">}}
```ascii-tree
. 
    hosts/
        host1/
            ssh/
                id.pub
                rssadsa
        users/
            johnny/
                ssh/
                    rsadsa
                    id.pub 
```
{{</code>}}


## Data representation

Files in the model can contain arbitrary JSON-like data (currently supported parsable formats include [JSON](https://www.json.org), 
[YAML](https://yaml.org) and [TOML](https://github.com/toml-lang/toml)). 
Other data formats are treated as binary files. 

All of the files are transformed into an object tree in memory when in use by Opereon tools. The rules of this 
transformation are configurable, as described below. 


### Manifest file

At the root of file tree representing data model for Opereon, there must be preset a manifest file. Manifest file is by 
default named `op.toml`

{{<code file="op.toml">}}
```toml
[info]
authors = ["John <johnny@example.org>", "Mark <mark@example.org>"]
description = "Server farm 1"

[defines]
users = "$.conf.users.*"
hosts = "$.conf.hosts.*"
procs = "$.(proc, probe).**[@.proc != null]"
user_defined_expr_1 = "$.**[custom_property == 'custom_value']"
```
{{</code>}}


### Settings file


