import {
	allocate,
	entryPoint,
	execute,
	IPostContractCallJP,
	PostContractCallInput,
	sys,
	uint8ArrayToHex,
} from '@artela/aspect-libs'

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPostContractCallJP {
	/**
	 * isOwner is the governance account implemented by the Aspect, when any of the governance operation
	 * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
	 * against the initiator's account to make sure it has the permission.
	 *
	 * @param sender address of the transaction
	 * @return true if check success, false if check fail
	 */
	isOwner(sender: Uint8Array): bool {
		return false
	}

	/**
	 * PostContractCall is a join-point which will be invoked before a contract call.
	 *
	 * @param input input to the current join point
	 */
	postContractCall(input: PostContractCallInput): void {
		// Define white list addresses, take note of below points:
		// 1. Remove '0x' in the front of the address;
		// 2. Change all characters to lower case.
		const whitelistArray = [
			'f9abeddf79565c9e0b8dfe9382ae1111b35bbeee',
			'41f669e9c3dcdbf71d2c60843bfdc47bce257081',
			'afa99d32d590c4ce6d1591cb4e384033d27343f4',
			'0af5b972f0cd498c389974c96c0e1feb5b8d0b20',
			'b72f70c0ea5462d39a26c635448ce2a0849d7f1e',
		]

		// Get msg.sender
		const from = uint8ArrayToHex(input.call!.from).toLowerCase()
		const txData = uint8ArrayToHex(input.call!.data)

		// If calling `mint` function, calling address must be in the whitelist.
		// Otherwise it will revert.
		// `1249c58b` is method signature of `mint`.
		if (txData.startsWith('1249c58b') && !whitelistArray.includes(from)) {
			sys.revert('You are not in the whitelist')
		}
	}
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }
