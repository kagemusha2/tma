La base de donnée est structurée ainsi :

Table	Partition Key	Sort Key
tma-{env}-projects	id (String)	-
tma-{env}-workstreams	projectId (String)	id (String)
tma-{env}-taskgroups	workstreamId (String)	id (String)
tma-{env}-tasks	taskGroupId (String)	id (String)
tma-{env}-users	id (String)	-

Où {env} = dev ou prod