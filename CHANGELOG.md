## 0.1.2
- Updated Android billing library
- Updated packages
- Stronger typing on events
- No longer exporting EventPayload (likely never used, was only necessary at the time for TS) 
- Deprecated EventContext, EventResult, and IPaymentEvent. Aliased for backwards compatibility:
  - EventContext -> Event.Context
  - EventResult -> Event.Result
  - IPaymentEvent -> Event.Type 
- All failure events now return a Failure object, but some with a null code (for iOS failures that may occur in try/catches, but these likely never occur anyway).

## 0.1.1
- Project restructuring

## 0.1.0
- Updated to RxJS 6
