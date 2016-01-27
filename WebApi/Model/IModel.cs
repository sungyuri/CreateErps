using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.Model
{
    public interface IModel
    {   
        //验证信息
        String ErrorMessage { get; }

        //验证函数
        Boolean IsValid(object toValid);
    }
}
