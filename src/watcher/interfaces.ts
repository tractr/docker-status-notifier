export interface DockerLabels {
	[key: string]: string;
}

export interface DockerHostConfig {
	NetworkMode: string;
}

export interface DockerNetwork {
	IPAMConfig?: any;
	Links?: any;
	Aliases?: any;
	NetworkID: string;
	EndpointID: string;
	Gateway: string;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	MacAddress: string;
	DriverOpts?: any;
}

export interface DockerNetworks {
	[key: string]: DockerNetwork;
}

export interface DockerNetworkSettings {
	Networks: DockerNetworks;
}

export interface DockerMount {
	Type: string;
	Name: string;
	Source: string;
	Destination: string;
	Driver: string;
	Mode: string;
	RW: boolean;
	Propagation: string;
}

export type DockerState = 'created' | 'running' | 'exited';

export interface DockerContainer {
	Id: string;
	Names: string[];
	Image: string;
	ImageID: string;
	Command: string;
	Created: number;
	Ports: any[];
	Labels: DockerLabels;
	State: DockerState;
	Status: string;
	HostConfig: DockerHostConfig;
	NetworkSettings: DockerNetworkSettings;
	Mounts: DockerMount[];
}

export interface DockerContainerSummary {
	id: string;
	name: string;
	image: string;
	state: DockerState;
	status: string;
}
