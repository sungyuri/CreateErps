using System;
using System.Collections;
using System.Collections.Generic;

namespace WebApi.Exceptions
{
    public class InvalidFieldArrayException : Exception
    {
        public Dictionary<string, IEnumerable> InvalidFields
        {
            get;
            set;
        }

        public InvalidFieldArrayException(Dictionary<string, IEnumerable> invalidFields)
        {
            this.InvalidFields = invalidFields;
        }
    }
}