using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Exceptions
{
    [Serializable]
    public class InvalidFieldException : Exception
    {
        #region

        public string FieldName { get; private set; }

        public string FieldValue { get; private set; }

        public string ErrorType
        {
            get
            {
                return "InvalidField";
            }
        }

        public List<ValidationResult> ListValidationResult { get; set; }

        #endregion

        public InvalidFieldException(string fieldName, string fieldValue, string message)
            : base(message)
        {
            this.FieldName = fieldName;
            this.FieldValue = fieldValue;
        }

        public InvalidFieldException(List<ValidationResult> list, string message)
            : base(message)
        {
            this.ListValidationResult = list;
        }

        private string argumentName;

        public string ArgumentName
        {
            get
            {
                return argumentName;
            }
        }
    }
}