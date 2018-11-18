#include <nan.h>
#include <cmath>
#include <cstdlib> 

NAN_METHOD(IsPrime) {
    if (!info[0]->IsNumber()) {
        Nan::ThrowTypeError("argument must be a number!");
        return;
    }
    
    int number = (int) info[0]->NumberValue();
    
    if (number < 3) {
        info.GetReturnValue().Set(Nan::False());
        return;
    }

    if(number % 2 == 0 || number % 3 ==0){
        info.GetReturnValue().Set(Nan::False());
        return;
    }

    int step = 4, m = std::abs(sqrt(number) + 1);
    for(int i = 5; i < m; step = 6-step, i += step) {
        if (number % i == 0) {
            info.GetReturnValue().Set(Nan::False());
            return;
        }
    }
    
    info.GetReturnValue().Set(Nan::True());
}

NAN_MODULE_INIT(Initialize) {
    NAN_EXPORT(target, IsPrime);
}

NODE_MODULE(addon, Initialize);