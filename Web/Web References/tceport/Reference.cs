﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.18408
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

// 
// 此源代码是由 Microsoft.VSDesigner 4.0.30319.18408 版自动生成。
// 
#pragma warning disable 1591

namespace Web.tceport {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.18408")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="TokenServiceSoap", Namespace="http://www.tceport.com.cn/")]
    public partial class TokenService : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback GetTokenOperationCompleted;
        
        private System.Threading.SendOrPostCallback ClearTokenOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public TokenService() {
            this.Url = global::Web.Properties.Settings.Default.Web_tceport_TokenService;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event GetTokenCompletedEventHandler GetTokenCompleted;
        
        /// <remarks/>
        public event ClearTokenCompletedEventHandler ClearTokenCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://www.tceport.com.cn/GetToken", RequestNamespace="http://www.tceport.com.cn/", ResponseNamespace="http://www.tceport.com.cn/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string GetToken(string tokenValue, string SysFlag) {
            object[] results = this.Invoke("GetToken", new object[] {
                        tokenValue,
                        SysFlag});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void GetTokenAsync(string tokenValue, string SysFlag) {
            this.GetTokenAsync(tokenValue, SysFlag, null);
        }
        
        /// <remarks/>
        public void GetTokenAsync(string tokenValue, string SysFlag, object userState) {
            if ((this.GetTokenOperationCompleted == null)) {
                this.GetTokenOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetTokenOperationCompleted);
            }
            this.InvokeAsync("GetToken", new object[] {
                        tokenValue,
                        SysFlag}, this.GetTokenOperationCompleted, userState);
        }
        
        private void OnGetTokenOperationCompleted(object arg) {
            if ((this.GetTokenCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetTokenCompleted(this, new GetTokenCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://www.tceport.com.cn/ClearToken", RequestNamespace="http://www.tceport.com.cn/", ResponseNamespace="http://www.tceport.com.cn/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public void ClearToken(string tokenValue) {
            this.Invoke("ClearToken", new object[] {
                        tokenValue});
        }
        
        /// <remarks/>
        public void ClearTokenAsync(string tokenValue) {
            this.ClearTokenAsync(tokenValue, null);
        }
        
        /// <remarks/>
        public void ClearTokenAsync(string tokenValue, object userState) {
            if ((this.ClearTokenOperationCompleted == null)) {
                this.ClearTokenOperationCompleted = new System.Threading.SendOrPostCallback(this.OnClearTokenOperationCompleted);
            }
            this.InvokeAsync("ClearToken", new object[] {
                        tokenValue}, this.ClearTokenOperationCompleted, userState);
        }
        
        private void OnClearTokenOperationCompleted(object arg) {
            if ((this.ClearTokenCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.ClearTokenCompleted(this, new System.ComponentModel.AsyncCompletedEventArgs(invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.18408")]
    public delegate void GetTokenCompletedEventHandler(object sender, GetTokenCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.18408")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetTokenCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetTokenCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.18408")]
    public delegate void ClearTokenCompletedEventHandler(object sender, System.ComponentModel.AsyncCompletedEventArgs e);
}

#pragma warning restore 1591