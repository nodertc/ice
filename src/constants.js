'use strict';

const ICE_ROLE_CONTROLLING = 'controlling';
const ICE_ROLE_CONTROLLED = 'controlled';

const ICE_PROTO_UDP = 'udp';
const ICE_PROTO_TCP = 'tcp';

// A candidate obtained by binding to a specific port
// from an IP address on the host.  This includes IP addresses on
// physical interfaces and logical ones, such as ones obtained
// through VPNs.
const ICE_TYPE_HOST = 'host';

// A candidate whose IP address and port
// are a binding allocated by a NAT for an ICE agent after it sends a
// packet through the NAT to a server, such as a STUN server.
const ICE_TYPE_SERVER = 'server-reflexive';

// A candidate whose IP address and port are
// a binding allocated by a NAT for an ICE agent after it sends a
// packet through the NAT to its peer.
const ICE_TYPE_PEER = 'peer-reflexive';

// A candidate obtained from a relay server, such as a TURN server.
const ICE_TYPE_RELAYED = 'relayed';

module.exports = {
  ICE_ROLE_CONTROLLING,
  ICE_ROLE_CONTROLLED,
  ICE_PROTO_UDP,
  ICE_PROTO_TCP,
  ICE_TYPE_HOST,
  ICE_TYPE_SERVER,
  ICE_TYPE_PEER,
  ICE_TYPE_RELAYED,
};
