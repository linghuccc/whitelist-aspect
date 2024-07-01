import {
	allocate,
	entryPoint,
	execute,
	IPreContractCallJP,
	PreContractCallInput,
	sys,
	uint8ArrayToHex,
} from '@artela/aspect-libs'

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPreContractCallJP {
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
	 * preContractCall is a join-point which will be invoked before a contract call.
	 *
	 * @param input input to the current join point
	 */
	preContractCall(input: PreContractCallInput): void {
		// read the throttle config from the properties and decode
		const whitelist = sys.aspect.property.get<u64>('whitelist')

		// get the contract address and from address
		const contractAddress = uint8ArrayToHex(input.call!.to)
		const from = uint8ArrayToHex(input.call!.from)

		// if call `world` function then revert, 30b67baa is method signature of `world`
		let txData = uint8ArrayToHex(input.call!.data)

		if (txData.startsWith('30b67baa')) {
			sys.revert('the function `world` not available')
		}
	}
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }
