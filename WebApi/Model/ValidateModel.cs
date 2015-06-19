using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WebApi.Model
{
    public class ValidateModel : IModel
    {
        public string ErrorMessage { get; private set; }

        private List<ValidationResult> vErrors = null;

        public List<ValidationResult> ValidateErrors
        {
            get { return this.vErrors; }
        }

        public bool IsValid(object toValid)
        {
            vErrors = new List<ValidationResult>();
            var validationContext = new ValidationContext(toValid, null, null);
            Validator.TryValidateObject(toValid, validationContext, vErrors, true);
            if (vErrors.Count != 0)
            {
                var stringBuilder = new StringBuilder();
                foreach (var validationResult in vErrors)
                {
                    stringBuilder.Append(String.Format(@"{0}:{1}" + Environment.NewLine, validationResult.MemberNames,
                                                       validationResult.ErrorMessage));
                }
                this.ErrorMessage = stringBuilder.ToString();
                return false;
            }
            return true;
        }
    }
}